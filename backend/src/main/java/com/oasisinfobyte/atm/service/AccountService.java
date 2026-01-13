package com.oasisinfobyte.atm.service;

import com.oasisinfobyte.atm.model.Account;
import com.oasisinfobyte.atm.model.Transaction;
import com.oasisinfobyte.atm.model.User;
import com.oasisinfobyte.atm.repository.AccountRepository;
import com.oasisinfobyte.atm.repository.TransactionRepository;
import com.oasisinfobyte.atm.repository.UserRepository;
import com.oasisinfobyte.atm.util.AccountUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {

    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    private Transaction createTransaction(Account account, String type, BigDecimal amount,
            BigDecimal balanceBefore, BigDecimal balanceAfter,
            String description, String recipientAccountNumber) {
        logger.info("Creating transaction: type={}, amount={}, account={}", type, amount, account.getAccountNumber());
        Transaction transaction = new Transaction();
        transaction.setTransactionId("TXN" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        transaction.setAccount(account);
        transaction.setType(type);
        transaction.setAmount(amount);
        transaction.setBalanceBefore(balanceBefore);
        transaction.setBalanceAfter(balanceAfter);
        transaction.setDescription(description);
        transaction.setRecipientAccountNumber(recipientAccountNumber);
        Transaction saved = transactionRepository.save(transaction);
        logger.info("Transaction saved with ID: {}", saved.getTransactionId());
        return saved;
    }

    public List<Account> getAccountsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return accountRepository.findByUserId(user.getId());
    }

    @Transactional
    public Account createAccount(String email, String accountType, boolean withStarterBalance) {
        logger.info("Creating new account for email: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = new Account();
        account.setAccountNumber(AccountUtils.generateAccountNumber());
        account.setAccountType(accountType != null ? accountType : "SAVINGS");
        account.setUser(user);

        // Add random starter balance between 100 and 5000 if requested
        if (withStarterBalance) {
            int randomAmount = AccountUtils.generateRandomBalance(100, 5000);
            account.setBalance(new BigDecimal(randomAmount));
            logger.info("Account created with starter balance: {}", randomAmount);
        } else {
            account.setBalance(BigDecimal.ZERO);
        }

        Account savedAccount = accountRepository.save(account);
        logger.info("Account created successfully: {}", savedAccount.getAccountNumber());
        return savedAccount;
    }

    public Account getAccountByNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    @Transactional
    public void deleteAccount(String email, String accountNumber) {
        logger.info("Attempting to delete account {} for email: {}", accountNumber, email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        // Verify the account belongs to the user
        if (!account.getUser().getId().equals(user.getId())) {
            logger.error("Delete failed: Account {} does not belong to user {}", accountNumber, email);
            throw new RuntimeException("You can only delete your own accounts");
        }

        // Prevent deletion of the last account
        List<Account> userAccounts = accountRepository.findByUserId(user.getId());
        if (userAccounts.size() <= 1) {
            logger.error("Delete failed: Cannot delete the last account for user {}", email);
            throw new RuntimeException("Cannot delete your last account");
        }

        accountRepository.delete(account);
        logger.info("Account {} deleted successfully", accountNumber);
    }

    @Transactional
    public Account addBalance(String accountNumber, BigDecimal amount) {
        logger.info("Adding balance {} to account {}", amount, accountNumber);

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        Account account = getAccountByNumber(accountNumber);
        BigDecimal balanceBefore = account.getBalance();
        account.setBalance(account.getBalance().add(amount));
        Account savedAccount = accountRepository.save(account);

        createTransaction(account, "DEPOSIT", amount, balanceBefore,
                savedAccount.getBalance(), "Balance added (testing)", null);

        logger.info("Balance added successfully. New balance: {}", savedAccount.getBalance());
        return savedAccount;
    }

    @Transactional
    public Account deposit(String accountNumber, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        Account account = getAccountByNumber(accountNumber);
        BigDecimal balanceBefore = account.getBalance();
        account.setBalance(account.getBalance().add(amount));
        Account savedAccount = accountRepository.save(account);

        createTransaction(account, "DEPOSIT", amount, balanceBefore,
                savedAccount.getBalance(), "Deposit to account", null);

        return savedAccount;
    }

    @Transactional
    public Account withdraw(String accountNumber, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        Account account = getAccountByNumber(accountNumber);

        if (account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        BigDecimal balanceBefore = account.getBalance();
        account.setBalance(account.getBalance().subtract(amount));
        Account savedAccount = accountRepository.save(account);

        createTransaction(account, "WITHDRAWAL", amount, balanceBefore,
                savedAccount.getBalance(), "Withdrawal from account", null);

        return savedAccount;
    }

    @Transactional
    public void transfer(String fromAccountNumber, String toAccountNumber, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        Account fromAccount = getAccountByNumber(fromAccountNumber);
        Account toAccount = getAccountByNumber(toAccountNumber);

        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        BigDecimal fromBalanceBefore = fromAccount.getBalance();
        BigDecimal toBalanceBefore = toAccount.getBalance();

        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));

        Account savedFromAccount = accountRepository.save(fromAccount);
        Account savedToAccount = accountRepository.save(toAccount);

        createTransaction(fromAccount, "TRANSFER_OUT", amount, fromBalanceBefore,
                savedFromAccount.getBalance(), "Transfer to " + toAccountNumber, toAccountNumber);
        createTransaction(toAccount, "TRANSFER_IN", amount, toBalanceBefore,
                savedToAccount.getBalance(), "Transfer from " + fromAccountNumber, fromAccountNumber);
    }

    public List<Transaction> getTransactionsByAccountNumber(String accountNumber) {
        Account account = getAccountByNumber(accountNumber);
        return transactionRepository.findByAccountIdOrderByCreatedAtDesc(account.getId());
    }
}
