package com.datta.blogging.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
		return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(UserAlreadyExistsException.class)
	public ResponseEntity<String> handlerUserAlreadyExists(UserAlreadyExistsException ex) {
		return new ResponseEntity<String>(ex.getMessage(), HttpStatus.CONFLICT);
	}
}