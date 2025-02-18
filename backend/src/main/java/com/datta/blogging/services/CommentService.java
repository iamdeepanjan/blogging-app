package com.datta.blogging.services;

import java.util.List;

import com.datta.blogging.models.CommentDTO;

public interface CommentService {
	
	 public CommentDTO addComment(Long blogId, String username, String content);
	 
	 public List<CommentDTO> getCommentsByBlog(Long blogId);
	 
	 public void deleteComment(Long commentId, String username);

}
