package com.datta.blogging.services;

import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.datta.blogging.exceptions.ResourceNotFoundException;
import com.datta.blogging.models.User;
import com.datta.blogging.models.UserDTO;
import com.datta.blogging.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public UserDTO getUserByUsername(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		return this.modelMapper.map(user, UserDTO.class);
	}

	@Override
	public String changePassword(Map<String, String> password, String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		String currentPassword = password.get("currentPassword");
		String newPassword = password.get("newPassword");
		if(!encoder.matches(currentPassword, user.getPassword())) {
			return "Current password is incorrect";
		}
		user.setPassword(encoder.encode(newPassword));
		userRepository.save(user);
		return "Your password updated successfully";
	}

}
