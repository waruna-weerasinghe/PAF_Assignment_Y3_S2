package com.PAF_Assignment.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PAF_Assignment.demo.Entity.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer> {

}
