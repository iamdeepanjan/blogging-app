package com.datta.blogging.security;

import com.datta.blogging.models.Role;
import com.datta.blogging.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

//This class is an implementation of UserDetails, which Spring Security requires to handle authentication and authorization.
public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;

	private String username;
	private String password;
	private Role role;

	// Converts your User entity into a format Spring Security understands
	public UserDetailsImpl(User user) {
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.role = user.getRole();
	}

	// Converts Role into a GrantedAuthority, which Spring uses for role-based
	// access control
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
	}

	// Return user credentials
	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	// Define account status (all returning true, meaning accounts are always
	// active)
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
