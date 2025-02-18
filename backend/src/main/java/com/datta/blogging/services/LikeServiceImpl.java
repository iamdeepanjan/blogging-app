package com.datta.blogging.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.datta.blogging.exceptions.ResourceNotFoundException;
import com.datta.blogging.models.BlogPost;
import com.datta.blogging.models.BlogPostDTO;
import com.datta.blogging.models.Like;
import com.datta.blogging.models.User;
import com.datta.blogging.repositories.BlogRepository;
import com.datta.blogging.repositories.LikeRepository;
import com.datta.blogging.repositories.UserRepository;

@Service
public class LikeServiceImpl implements LikeService {

	@Autowired
	private BlogRepository blogRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private LikeRepository likeRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public long getLikeCount(Long blogId) {
		return likeRepository.countByBlogPostId(blogId);
	}

	@Override
	public String toggleLike(Long blogId, String username) {
		BlogPost blogPost = blogRepository.findById(blogId)
				.orElseThrow(() -> new ResourceNotFoundException("Blog not found"));

		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		boolean alreadyLiked = likeRepository.existsByBlogPostIdAndUserId(blogId, user.getId());

		if (alreadyLiked) {
			likeRepository.deleteByBlogPostIdAndUserId(blogId, user.getId());
			return "Like removed";
		} else {
			Like like = new Like();
			like.setBlogPost(blogPost);
			like.setUser(user);
			likeRepository.save(like);
			return "Like added";
		}
	}

	@Override
	public List<BlogPostDTO> getMyLikedBlogs(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		List<Like> myLikes = likeRepository.findAll().stream()
				.filter(like -> like.getUser().getId().equals(user.getId())).collect(Collectors.toList());
		List<BlogPost> blogs = blogRepository.findAll().stream()
				.filter(blog -> myLikes.stream().anyMatch(like -> like.getBlogPost().getId().equals(blog.getId())))
				.collect(Collectors.toList());
		return blogs.stream().map(blog -> this.modelMapper.map(blog, BlogPostDTO.class)).collect(Collectors.toList());
	}

}
