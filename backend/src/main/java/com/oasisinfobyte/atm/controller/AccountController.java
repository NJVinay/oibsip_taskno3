package com.oasisinfobyte.atm.controller;

import com.oasisinfobyte.atm.dto.AccountDTO;
import com.oasisinfobyte.atm.dto.TransactionDTO;
import com.oasisinfobyte.atm.model.Account;
import com.oasisinfobyte.atm.model.Transaction;
import com.oasisinfobyte.atm.service.AccountService;
import com.oasisinfobyte.atm.util.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/my-accounts")
    public ResponseEntity<?> getMyAccounts(Authentication authentication) {
        try {
            String email = authentication != null ? authentication.getName() : null;
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
            }

            List<Account> accounts = accountService.getAccountsByEmail(email);
            List<AccountDTO> accountDTOs = DtoMapper.toAccountDTOList(accounts);
            return ResponseEntity.ok(accountDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{accountNumber}/balance")
    public ResponseEntity<?> getBalance(@PathVariable String accountNumber) {
        try {
            Account account = accountService.getAccountByNumber(accountNumber);
            AccountDTO accountDTO = DtoMapper.toAccountDTO(account);
            return ResponseEntity.ok(accountDTO);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestBody Map<String, Object> request) {
        try {
            String accountNumber = (String) request.get("accountNumber");
            BigDecimal amount = new BigDecimal(request.get("amount").toString());

            Account account = accountService.deposit(accountNumber, amount);
            return ResponseEntity.ok(Map.of("message", "Deposit successful", "balance", account.getBalance()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestBody Map<String, Object> request) {
        try {
            String accountNumber = (String) request.get("accountNumber");
            BigDecimal amount = new BigDecimal(request.get("amount").toString());

            Account account = accountService.withdraw(accountNumber, amount);
            return ResponseEntity.ok(Map.of("message", "Withdrawal successful", "balance", account.getBalance()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody Map<String, Object> request) {
        try {
            String fromAccountNumber = (String) request.get("fromAccountNumber");
            String toAccountNumber = (String) request.get("toAccountNumber");
            BigDecimal amount = new BigDecimal(request.get("amount").toString());

            accountService.transfer(fromAccountNumber, toAccountNumber, amount);
            return ResponseEntity.ok(Map.of("message", "Transfer successful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(
            @RequestBody Map<String, Object> request,
            Authentication authentication) {
        try {
            String email = authentication != null ? authentication.getName() : null;
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
            }

            String accountType = (String) request.getOrDefault("accountType", "SAVINGS");
            boolean withStarterBalance = Boolean.parseBoolean(
                    request.getOrDefault("withStarterBalance", "false").toString());

            Account account = accountService.createAccount(email, accountType, withStarterBalance);
            AccountDTO accountDTO = DtoMapper.toAccountDTO(account);
            return ResponseEntity.ok(Map.of(
                    "message", "Account created successfully",
                    "account", accountDTO));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{accountNumber}")
    public ResponseEntity<?> deleteAccount(
            @PathVariable String accountNumber,
            Authentication authentication) {
        try {
            String email = authentication != null ? authentication.getName() : null;
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
            }

            accountService.deleteAccount(email, accountNumber);
            return ResponseEntity.ok(Map.of("message", "Account deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/add-balance")
    public ResponseEntity<?> addBalance(@RequestBody Map<String, Object> request) {
        try {
            String accountNumber = (String) request.get("accountNumber");
            BigDecimal amount = new BigDecimal(request.get("amount").toString());

            Account account = accountService.addBalance(accountNumber, amount);
            return ResponseEntity.ok(Map.of(
                    "message", "Balance added successfully",
                    "balance", account.getBalance()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{accountNumber}/transactions")
    public ResponseEntity<?> getTransactions(@PathVariable String accountNumber) {
        try {
            List<Transaction> transactions = accountService.getTransactionsByAccountNumber(accountNumber);
            List<TransactionDTO> transactionDTOs = DtoMapper.toTransactionDTOList(transactions);
            return ResponseEntity.ok(transactionDTOs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
