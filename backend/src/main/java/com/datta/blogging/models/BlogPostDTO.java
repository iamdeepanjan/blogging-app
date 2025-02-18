package com.datta.blogging.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostDTO {
	private Long id;
	@NotBlank(message = "Title is required")
	private String title;
	@NotBlank(message = "Content is required")
	@Size(min = 10, message = "Content should be at least 10 characters long")
	private String content;
	private UserDTO user;

}
