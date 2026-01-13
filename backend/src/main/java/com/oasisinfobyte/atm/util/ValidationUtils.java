package com.oasisinfobyte.atm.util;

import java.util.regex.Pattern;

/**
 * Utility class for validating user input
 */
public class ValidationUtils {

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    private static final Pattern PIN_PATTERN = Pattern.compile("^\\d{4,6}$");
    private static final int MIN_PASSWORD_LENGTH = 8;

    /**
     * Validate email format
     * 
     * @param email Email to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    /**
     * Validate password strength
     * 
     * @param password Password to validate
     * @return true if valid (at least 8 characters)
     */
    public static boolean isValidPassword(String password) {
        return password != null && password.length() >= MIN_PASSWORD_LENGTH;
    }

    /**
     * Validate PIN format
     * 
     * @param pin PIN to validate
     * @return true if valid (4-6 digits)
     */
    public static boolean isValidPin(String pin) {
        return pin != null && PIN_PATTERN.matcher(pin).matches();
    }

    /**
     * Check if string is null or empty
     * 
     * @param str String to check
     * @return true if null or empty
     */
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
}
