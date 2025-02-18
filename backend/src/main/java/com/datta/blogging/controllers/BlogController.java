package com.datta.blogging.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.datta.blogging.models.BlogPost;
import com.datta.blogging.models.BlogPostDTO;
import com.datta.blogging.services.BlogService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class BlogController {

	@Autowired
	private BlogService blogService;

	// Create a new blog post
	@PostMapping("/myblogs")
	public ResponseEntity<?> createBlog(@Valid @RequestBody BlogPostDTO blog, BindingResult result,
			Principal principal) {
		if (result.hasErrors()) {
			List<String> errors = result.getAllErrors().stream().map(error -> error.getDefaultMessage())
					.collect(Collectors.toList());

			return ResponseEntity.badRequest().body(Map.of("errors", errors));
		}
		return ResponseEntity.ok(blogService.createBlog(blog, principal.getName()));
	}

	// Get all blog posts
	@GetMapping("/blogs")
	public ResponseEntity<List<BlogPostDTO>> getAllBlogs() {
		return ResponseEntity.ok(blogService.getAllBlogs());
	}

	// Get all blog posts by the logged in user
	@GetMapping("/myblogs")
	public ResponseEntity<List<BlogPostDTO>> getMyBlogs(Principal principal) {
		return ResponseEntity.ok(blogService.getMyBlogs(principal.getName()));
	}

	// Get a single blog post by ID
	@GetMapping("/blogs/{id}")
	public ResponseEntity<BlogPostDTO> getBlogById(@PathVariable Long id) {
		return ResponseEntity.ok(blogService.getBlogById(id));
	}

	// Update a blog post
	@PutMapping("/blogs/{id}")
	public ResponseEntity<BlogPostDTO> updateBlog(@PathVariable Long id, @RequestBody BlogPost blog,
			Principal principal) {
		return ResponseEntity.ok(blogService.updateBlog(id, blog, principal.getName()));
	}

	// Delete a blog post
	@DeleteMapping("/blogs/{id}")
	public ResponseEntity<Map<String, String>> deleteBlog(@PathVariable Long id, Principal principal) {
		blogService.deleteBlog(id, principal.getName());
		Map<String, String> response = Map.of("message","Blog deleted successfully");
		return ResponseEntity.ok(response);
	}
}
