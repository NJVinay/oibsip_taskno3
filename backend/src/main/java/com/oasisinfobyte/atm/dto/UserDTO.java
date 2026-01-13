package com.oasisinfobyte.atm.dto;

import com.oasisinfobyte.atm.model.User;

public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private String customerId;

    // Constructor from User entity
    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.customerId = user.getCustomerId();
    }

    // Default constructor
    public UserDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
}
