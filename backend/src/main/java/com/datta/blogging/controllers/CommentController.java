package com.datta.blogging.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.datta.blogging.models.CommentDTO;
import com.datta.blogging.services.CommentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class CommentController {

	@Autowired
	private CommentService commentService;

	// Add a comment to a blog post
	@PostMapping("/comments/{blogId}")
	public ResponseEntity<?> addComment(@Valid @PathVariable Long blogId, @RequestBody CommentDTO comment,
			BindingResult result, Principal principal) {
		if (result.hasErrors()) {
			List<String> errors = result.getAllErrors().stream().map(error -> error.getDefaultMessage())
					.collect(Collectors.toList());

			return ResponseEntity.badRequest().body(Map.of("errors", errors));
		}
		return ResponseEntity.ok(commentService.addComment(blogId, principal.getName(), comment.getComment()));
	}

	// Get all comments for a blog post
	@GetMapping("/comments/{blogId}")
	public ResponseEntity<List<CommentDTO>> getComments(@PathVariable Long blogId) {
		return ResponseEntity.ok(commentService.getCommentsByBlog(blogId));
	}

	// Delete a comment
	@DeleteMapping("/comments/{blogId}/{commentId}")
	public ResponseEntity<Map<String, String>> deleteComment(@PathVariable Long blogId, @PathVariable Long commentId,
			Principal principal) {
		commentService.deleteComment(commentId, principal.getName());
		Map<String, String> response = Map.of("message", "Comment deleted successfully");
		return ResponseEntity.ok(response);
	}
}
