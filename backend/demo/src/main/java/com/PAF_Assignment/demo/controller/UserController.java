package com.PAF_Assignment.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PAF_Assignment.demo.Model.User;
import com.PAF_Assignment.demo.Repository.UserRepo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;



@RestController
@RequestMapping
@CrossOrigin

public class UserController {

@Autowired
UserRepo userRepo;

    @PostMapping("/addUser")
    public void addUser(@RequestBody User user) {
        userRepo.save(user);
        
    }
    @GetMapping("/getUser/{id}")
    public User getUser(@PathVariable String id) {

        return userRepo.findById(id).orElse(null);
        
    }   
}

