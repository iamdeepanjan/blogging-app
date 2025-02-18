package com.datta.blogging.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.datta.blogging.models.Like;

import jakarta.transaction.Transactional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
	long countByBlogPostId(Long blogId);

	boolean existsByBlogPostIdAndUserId(Long blogId, Long userId);
	
    @Transactional
    @Modifying
    @Query("DELETE FROM Like l WHERE l.blogPost.id = :blogId AND l.user.id = :userId")
    void deleteByBlogPostIdAndUserId(@Param("blogId") Long blogId, @Param("userId") Long userId);

}