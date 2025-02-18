package com.datta.blogging.services;

import java.util.List;

import com.datta.blogging.models.BlogPost;
import com.datta.blogging.models.BlogPostDTO;

public interface BlogService {

	public BlogPostDTO createBlog(BlogPostDTO blog, String username);
	
	public List<BlogPostDTO> getAllBlogs();
	
	public List<BlogPostDTO> getMyBlogs(String username);
	
	public BlogPostDTO getBlogById(Long id);
	
	public BlogPostDTO updateBlog(Long id, BlogPost blog, String username);
	
	public void deleteBlog(Long id, String username);
}
