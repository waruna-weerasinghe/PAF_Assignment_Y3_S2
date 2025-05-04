package com.PAF_Assignment.demo.Repository;

import com.PAF_Assignment.demo.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
public interface UserRepo extends MongoRepository<User, Integer> {

}
