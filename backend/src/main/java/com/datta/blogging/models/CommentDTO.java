package com.datta.blogging.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

	private Long id;
	@NotBlank(message = "Content is required")
	private String comment;
	private UserDTO user;
	private BlogPostDTO blogPost;

}
