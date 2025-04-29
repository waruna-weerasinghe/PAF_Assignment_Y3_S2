package com.PAF_Assignment.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PAF_Assignment.demo.Model.User;
import com.PAF_Assignment.demo.Repository.UserRepo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



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
        
    
    
    

}
