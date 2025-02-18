package com.datta.blogging.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.datta.blogging.models.BlogPostDTO;
import com.datta.blogging.services.LikeService;

@RestController
@RequestMapping("/api/v1")
public class LikeController {

	@Autowired
	private LikeService likeService;

	// Toggle like/unlike for a blog post
	@PostMapping("/likes/{blogId}")
	public ResponseEntity<Map<String,String>> toggleLike(@PathVariable Long blogId, Principal principal) {
		String message = likeService.toggleLike(blogId, principal.getName());
		Map<String, String> response = Map.of("message", message);
		return ResponseEntity.ok(response);
	}

	// Get like count for a blog post
	@GetMapping("/likes/{blogId}/count")
	public ResponseEntity<Long> getLikeCount(@PathVariable Long blogId) {
		return ResponseEntity.ok(likeService.getLikeCount(blogId));
	}
	
	//Get my Likes
	@GetMapping("/myLikes")
	public ResponseEntity<List<BlogPostDTO>> getMyLikedBlogs(Principal principal){
		return ResponseEntity.ok(likeService.getMyLikedBlogs(principal.getName()));
	}
}
