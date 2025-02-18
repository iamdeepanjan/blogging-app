package com.datta.blogging.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datta.blogging.models.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findByBlogPostId(Long blogId);
}