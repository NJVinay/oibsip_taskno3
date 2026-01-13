package com.oasisinfobyte.atm.util;

import com.oasisinfobyte.atm.dto.AccountDTO;
import com.oasisinfobyte.atm.dto.TransactionDTO;
import com.oasisinfobyte.atm.dto.UserDTO;
import com.oasisinfobyte.atm.model.Account;
import com.oasisinfobyte.atm.model.Transaction;
import com.oasisinfobyte.atm.model.User;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Utility class for converting entities to DTOs
 */
public class DtoMapper {

    /**
     * Convert User entity to UserDTO
     * 
     * @param user User entity
     * @return UserDTO
     */
    public static UserDTO toUserDTO(User user) {
        return user != null ? new UserDTO(user) : null;
    }

    /**
     * Convert Account entity to AccountDTO
     * 
     * @param account Account entity
     * @return AccountDTO
     */
    public static AccountDTO toAccountDTO(Account account) {
        return account != null ? new AccountDTO(account) : null;
    }

    /**
     * Convert list of Account entities to list of AccountDTOs
     * 
     * @param accounts List of Account entities
     * @return List of AccountDTOs
     */
    public static List<AccountDTO> toAccountDTOList(List<Account> accounts) {
        return accounts.stream()
                .map(AccountDTO::new)
                .collect(Collectors.toList());
    }

    /**
     * Convert Transaction entity to TransactionDTO
     * 
     * @param transaction Transaction entity
     * @return TransactionDTO
     */
    public static TransactionDTO toTransactionDTO(Transaction transaction) {
        return transaction != null ? new TransactionDTO(transaction) : null;
    }

    /**
     * Convert list of Transaction entities to list of TransactionDTOs
     * 
     * @param transactions List of Transaction entities
     * @return List of TransactionDTOs
     */
    public static List<TransactionDTO> toTransactionDTOList(List<Transaction> transactions) {
        return transactions.stream()
                .map(TransactionDTO::new)
                .collect(Collectors.toList());
    }
}
