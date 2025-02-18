package com.datta.blogging.controllers;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.datta.blogging.models.UserDTO;
import com.datta.blogging.services.UserService;

@RestController
@RequestMapping("/api/v1")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/logged-user")
	public ResponseEntity<UserDTO> getLoggedUsed(Principal principal) {
		return ResponseEntity.ok(userService.getUserByUsername(principal.getName()));
	}

	@PutMapping("/logged-user/change-password")
	public ResponseEntity<Map<String, String>> updatePassword(@RequestBody Map<String, String> password,
			Principal principal) {
		String message = userService.changePassword(password, principal.getName());
	    
	    if ("Current password is incorrect".equals(message)) {
	        return ResponseEntity.badRequest().body(Map.of("error", message));
	    }
		return ResponseEntity.ok(Map.of("message", message));
	}

}
