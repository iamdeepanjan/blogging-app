package com.datta.blogging.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datta.blogging.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	public boolean existsByUsername(String username);
    public Optional<User> findByUsername(String username);
}