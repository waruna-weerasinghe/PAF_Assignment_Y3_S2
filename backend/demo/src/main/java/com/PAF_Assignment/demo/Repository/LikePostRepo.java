package com.PAF_Assignment.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PAF_Assignment.demo.Entity.LikePost;

public interface LikePostRepo extends JpaRepository<LikePost, Integer> {

}
