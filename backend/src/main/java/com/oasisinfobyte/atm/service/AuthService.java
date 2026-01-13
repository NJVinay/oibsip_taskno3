package com.oasisinfobyte.atm.service;

import com.oasisinfobyte.atm.model.Account;
import com.oasisinfobyte.atm.model.User;
import com.oasisinfobyte.atm.repository.AccountRepository;
import com.oasisinfobyte.atm.repository.UserRepository;
import com.oasisinfobyte.atm.security.JwtTokenProvider;
import com.oasisinfobyte.atm.util.AccountUtils;
import com.oasisinfobyte.atm.util.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.math.BigDecimal;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Transactional
    public String register(String email, String password, String pin, String name) {
        logger.info("Registration attempt for email: {}", email);

        if (ValidationUtils.isNullOrEmpty(email)) {
            logger.error("Registration failed: Email is empty");
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (!ValidationUtils.isValidPassword(password)) {
            logger.error("Registration failed: Password too short");
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }
        if (!ValidationUtils.isValidPin(pin)) {
            logger.error("Registration failed: Invalid PIN format");
            throw new IllegalArgumentException("PIN must be 4-6 digits");
        }

        if (userRepository.existsByEmail(email)) {
            logger.error("Registration failed: Email already exists - {}", email);
            throw new RuntimeException("Email already registered");
        }

        try {
            User user = new User();
            user.setEmail(email);
            user.setName(name != null && !name.trim().isEmpty() ? name : email.split("@")[0]);
            user.setPassword(passwordEncoder.encode(password));
            user.setCustomerId(AccountUtils.generateCustomerId());
            user.setPin(passwordEncoder.encode(pin));
            user = userRepository.save(user);
            logger.info("User created successfully: {}", user.getEmail());

            // Create default account with random starter balance
            int starterBalance = AccountUtils.generateStarterBalance();

            Account account = new Account();
            account.setAccountNumber(AccountUtils.generateAccountNumber());
            account.setBalance(new BigDecimal(starterBalance));
            account.setUser(user);
            accountRepository.save(account);
            logger.info("Account created successfully for user {} with starter balance: {}", user.getEmail(),
                    starterBalance);

            String token = tokenProvider.generateToken(email);
            logger.info("Registration successful for: {}", email);
            return token;
        } catch (Exception e) {
            logger.error("Registration failed with exception for email {}: {}", email, e.getMessage(), e);
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

    public String login(String email, String password) {
        logger.info("Login attempt for email: {}", email);

        if (ValidationUtils.isNullOrEmpty(email)) {
            logger.error("Login failed: Email is empty");
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (ValidationUtils.isNullOrEmpty(password)) {
            logger.error("Login failed: Password is empty");
            throw new IllegalArgumentException("Password cannot be empty");
        }

        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Invalid credentials"));

            if (!passwordEncoder.matches(password, user.getPassword())) {
                logger.error("Login failed: Invalid password for email {}", email);
                throw new RuntimeException("Invalid credentials");
            }

            String token = tokenProvider.generateToken(email);
            logger.info("Login successful for: {}", email);
            return token;
        } catch (RuntimeException e) {
            logger.error("Login failed for email {}: {}", email, e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Login failed with exception for email {}: {}", email, e.getMessage(), e);
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }
}
