package com.datta.blogging.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.datta.blogging.exceptions.ResourceNotFoundException;
import com.datta.blogging.models.BlogPost;
import com.datta.blogging.models.Comment;
import com.datta.blogging.models.CommentDTO;
import com.datta.blogging.models.User;
import com.datta.blogging.repositories.BlogRepository;
import com.datta.blogging.repositories.CommentRepository;
import com.datta.blogging.repositories.UserRepository;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private BlogRepository blogRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CommentDTO addComment(Long blogId, String username, String content) {
		BlogPost blogPost = blogRepository.findById(blogId)
				.orElseThrow(() -> new ResourceNotFoundException("Blog not found"));

		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		Comment comment = new Comment();
		comment.setBlogPost(blogPost);
		comment.setUser(user);
		comment.setComment(content);
		Comment newComment = commentRepository.save(comment);

		return this.modelMapper.map(newComment, CommentDTO.class);
	}

	@Override
	public List<CommentDTO> getCommentsByBlog(Long blogId) {
		List<Comment> comments = commentRepository.findByBlogPostId(blogId);
		return comments.stream().map(comment -> this.modelMapper.map(comment, CommentDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public void deleteComment(Long commentId, String username) {
		Comment comment = commentRepository.findById(commentId)
				.orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
		if (!comment.getBlogPost().getUser().getUsername().equals(username)) {
	        throw new AccessDeniedException("You are not authorized to delete this comment");
	    }
		commentRepository.delete(comment);
	}

}
