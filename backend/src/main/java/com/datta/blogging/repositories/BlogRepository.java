package com.datta.blogging.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datta.blogging.models.BlogPost;

@Repository
public interface BlogRepository extends JpaRepository<BlogPost, Long> {}