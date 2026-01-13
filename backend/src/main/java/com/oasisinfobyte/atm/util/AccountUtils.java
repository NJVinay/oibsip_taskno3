package com.oasisinfobyte.atm.util;

import java.util.Random;
import java.util.UUID;

/**
 * Utility class for generating account numbers, customer IDs, and random
 * balances
 */
public class AccountUtils {

    private static final Random random = new Random();
    private static final int MIN_STARTER_BALANCE = 500;
    private static final int MAX_STARTER_BALANCE = 2000;

    /**
     * Generate a unique account number
     * 
     * @return Account number in format ACC12345678
     */
    public static String generateAccountNumber() {
        return "ACC" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    /**
     * Generate a unique customer ID
     * 
     * @return Customer ID in format CUST1234567890
     */
    public static String generateCustomerId() {
        return "CUST" + System.currentTimeMillis();
    }

    /**
     * Generate random starter balance for new accounts
     * 
     * @return Random amount between 500 and 2000
     */
    public static int generateStarterBalance() {
        return MIN_STARTER_BALANCE + random.nextInt(MAX_STARTER_BALANCE - MIN_STARTER_BALANCE + 1);
    }

    /**
     * Generate random balance within specified range
     * 
     * @param min Minimum balance
     * @param max Maximum balance
     * @return Random amount between min and max
     */
    public static int generateRandomBalance(int min, int max) {
        return min + random.nextInt(max - min + 1);
    }
}
