package com.PAF_Assignment.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.PAF_Assignment.demo.Model.Post;

public interface PostRepo extends MongoRepository<Post, String> {

}
