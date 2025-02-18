package com.datta.blogging.services;

import java.util.List;

import com.datta.blogging.models.BlogPostDTO;

public interface LikeService {
	public long getLikeCount(Long blogId);

	public String toggleLike(Long blogId, String username);
	
	public List<BlogPostDTO> getMyLikedBlogs(String username);

}
