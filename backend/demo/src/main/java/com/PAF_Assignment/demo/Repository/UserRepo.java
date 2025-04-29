package com.PAF_Assignment.demo.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.PAF_Assignment.demo.Model.User;

public interface UserRepo extends MongoRepository<User, String> {

    

}
