package com.oasisinfobyte.atm.repository;

import com.oasisinfobyte.atm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByCustomerId(String customerId);
    boolean existsByEmail(String email);
}
