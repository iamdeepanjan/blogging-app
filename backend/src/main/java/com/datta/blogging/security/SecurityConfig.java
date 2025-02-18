package com.datta.blogging.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	@Autowired
	private JwtAuthFilter authFilter;

	// SecurityFilterChain defines all security-related configurations, like authentication, authorization, CORS, and session management
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for state-less APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated() // Protect all other end points
            )
            .cors(cors -> cors
                    .configurationSource(request -> {
                        var corsConfig = new CorsConfiguration();	// Create a new CorsConfiguration object
                        corsConfig.setAllowedOrigins(List.of("http://localhost:4200"));	 // Allow requests from this origin
                        corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));  // Allow these methods
                        corsConfig.setAllowedHeaders(List.of("*"));	 	// Allow all headers
                        corsConfig.setAllowCredentials(true);	// Allow credentials
                        return corsConfig;
                    })) 
            .sessionManagement(sess -> sess
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // No sessions will be created or stored
            )
            .authenticationProvider(authenticationProvider()) // Register custom authentication provider
            .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter ensures that requests are intercepted before Spring's default username-password authentication

        return http.build();
    }

	// Encodes user passwords using BCryptPasswordEncoder.Ensures stored passwords are hashed.
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); 
	}

	// Creates a bean of UserDetailsService, which fetches user details from the database.
	@Bean
	public UserDetailsService userDetailsService() {
		return new UserDetailsServiceImpl(); // Ensure UserDetailsServiceImpl implements UserDetailsService
	}
	
	// Creates a custom AuthenticationProvider that uses UserDetailsService and PasswordEncoder
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(); // Use DaoAuthenticationProvider (the default provider for username-password authentication)
		authenticationProvider.setUserDetailsService(userDetailsService());	// Use UserDetailsService to fetch user details
		authenticationProvider.setPasswordEncoder(passwordEncoder());	// Uses BCryptPasswordEncoder to check passwords
		return authenticationProvider;
	}

	// Creates and returns an AuthenticationManager, which is required for authentication, used in login controllers to authenticate users
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
