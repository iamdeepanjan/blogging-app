package com.datta.blogging.security;

import com.datta.blogging.models.User;
import com.datta.blogging.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// This class implements UserDetailsService, which Spring Security uses to fetch user details for authentication.
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	// Loads user details from the database using UserRepository
    @Autowired
    private UserRepository userRepository;

    // Returns an instance of UserDetailsImpl
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new UserDetailsImpl(user);
    }
}
