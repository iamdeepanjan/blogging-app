package com.datta.blogging.services;

import java.util.Map;

import com.datta.blogging.models.UserDTO;

public interface UserService {
	
	public UserDTO getUserByUsername(String username);
	
	public String changePassword(Map<String, String> password, String username);

}
