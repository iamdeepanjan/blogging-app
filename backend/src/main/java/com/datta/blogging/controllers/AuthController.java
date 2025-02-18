package com.datta.blogging.controllers;

import com.datta.blogging.models.Role;
import com.datta.blogging.models.User;
import com.datta.blogging.repositories.UserRepository;
import com.datta.blogging.security.JwtUtil;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepository;
	private final JwtUtil jwtUtil;
	private final PasswordEncoder passwordEncoder;

	@Autowired
	public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, JwtUtil jwtUtil,
			PasswordEncoder passwordEncoder) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.jwtUtil = jwtUtil;
		this.passwordEncoder = passwordEncoder;
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody User user, BindingResult result) {
		if (result.hasErrors()) {
			List<String> errors = result.getAllErrors().stream().map(error -> error.getDefaultMessage())
					.collect(Collectors.toList());

			return ResponseEntity.badRequest().body(Map.of("errors", errors));
	    }
		if (userRepository.existsByUsername(user.getUsername())) {
			return ResponseEntity.badRequest().body(Map.of("errors","Username is already taken"));
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		// Set role from request or default to USER
		if (user.getRole() == null) {
			user.setRole(Role.USER);
		}
		userRepository.save(user);
		return ResponseEntity.ok(Map.of("message","User registered successfully"));
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password")));

			String token = jwtUtil.generateToken(credentials.get("username"));
			return ResponseEntity.ok(Map.of("token", token));
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
		}
	}
}
