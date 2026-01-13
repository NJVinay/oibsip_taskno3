package com.oasisinfobyte.atm.controller;

import com.oasisinfobyte.atm.dto.UserDTO;
import com.oasisinfobyte.atm.model.User;
import com.oasisinfobyte.atm.repository.UserRepository;
import com.oasisinfobyte.atm.service.AuthService;
import com.oasisinfobyte.atm.util.DtoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            if (request.get("email") == null || request.get("email").trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
            }
            if (request.get("password") == null || request.get("password").trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Password is required"));
            }
            if (request.get("pin") == null || request.get("pin").trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "PIN is required"));
            }

            String name = request.getOrDefault("name", request.get("email").split("@")[0]);
            String token = authService.register(
                    request.get("email"),
                    request.get("password"),
                    request.get("pin"),
                    name);
            logger.info("User registered successfully: {}", request.get("email"));
            return ResponseEntity.ok(Map.of("token", token, "message", "Registration successful"));
        } catch (RuntimeException e) {
            logger.warn("Registration failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            logger.error("Registration error", e);
            return ResponseEntity.status(500).body(Map.of("message", "An error occurred during registration"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            if (request.get("email") == null || request.get("email").trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
            }
            if (request.get("password") == null || request.get("password").trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Password is required"));
            }

            String token = authService.login(
                    request.get("email"),
                    request.get("password"));
            logger.info("User logged in successfully: {}", request.get("email"));
            return ResponseEntity.ok(Map.of("token", token, "message", "Login successful"));
        } catch (RuntimeException e) {
            logger.warn("Login failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            logger.error("Login error", e);
            return ResponseEntity.status(500).body(Map.of("message", "An error occurred during login"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        try {
            String email = authentication != null ? authentication.getName() : null;
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("message", "Not authenticated"));
            }

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserDTO userDTO = DtoMapper.toUserDTO(user);
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            logger.error("Error fetching current user", e);
            return ResponseEntity.status(500).body(Map.of("message", "Error fetching user information"));
        }
    }
}
