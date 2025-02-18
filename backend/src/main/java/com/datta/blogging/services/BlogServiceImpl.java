package com.datta.blogging.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.datta.blogging.exceptions.ResourceNotFoundException;
import com.datta.blogging.models.BlogPost;
import com.datta.blogging.models.BlogPostDTO;
import com.datta.blogging.models.User;
import com.datta.blogging.repositories.BlogRepository;
import com.datta.blogging.repositories.UserRepository;

@Service
public class BlogServiceImpl implements BlogService {

	@Autowired
	private BlogRepository blogRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public BlogPostDTO createBlog(BlogPostDTO blogdto, String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		BlogPost blog = this.modelMapper.map(blogdto, BlogPost.class);
		blog.setUser(user);
		BlogPost newBlog = blogRepository.save(blog);
		return this.modelMapper.map(newBlog, BlogPostDTO.class);
	}

	@Override
	public List<BlogPostDTO> getAllBlogs() {
		List<BlogPost> blogs = blogRepository.findAll();
		return blogs.stream().map(blog -> this.modelMapper.map(blog, BlogPostDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<BlogPostDTO> getMyBlogs(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		List<BlogPost> blogs = blogRepository.findAll().stream().filter(blog -> blog.getUser().getId().equals(user.getId()))
				.collect(Collectors.toList());
		return blogs.stream().map(blog -> this.modelMapper.map(blog, BlogPostDTO.class)).collect(Collectors.toList());
	}

	@Override
	public BlogPostDTO getBlogById(Long id) {
		BlogPost blogPost = blogRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Blog not found for id: " + id));
		return this.modelMapper.map(blogPost, BlogPostDTO.class);
	}

	@Override
	public BlogPostDTO updateBlog(Long id, BlogPost blog, String username) {
		BlogPost existingBlog = blogRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Blog not found for id: " + id));
		if (!existingBlog.getUser().getUsername().equals(username)) {
			throw new AccessDeniedException("You are not authorized to update this blog");
		}
		existingBlog.setTitle(blog.getTitle());
		existingBlog.setContent(blog.getContent());
		BlogPost blogPost = blogRepository.save(existingBlog);
		return this.modelMapper.map(blogPost, BlogPostDTO.class);
	}

	@Override
	public void deleteBlog(Long id, String username) {
		BlogPost blog = blogRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Blog not found for id: " + id));
		 if (!blog.getUser().getUsername().equals(username)) {
		        throw new AccessDeniedException("You are not authorized to update this blog");
		    }
		blogRepository.delete(blog);

	}

}
