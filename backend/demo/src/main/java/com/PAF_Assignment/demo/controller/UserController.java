package com.PAF_Assignment.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PAF_Assignment.demo.Model.User;
import com.PAF_Assignment.demo.Repository.UserRepo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public User getUser(@PathVariable Integer id) {

        return userRepo.findById(id).orElse(null);
        
    }
    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {

        return userRepo.findAll();
        
    }
    @PutMapping("/UpdateUser")
    public void UpdateUser(@RequestBody User user) {
        User data = userRepo.findById(user.getId()).orElse(null);
        System.out.println(data);
        //check if null
        if(data != null) 
        {
            data.setName(user.getName());
            data.setTelephone(user.getTelephone());
            data.setPassword(user.getPassword());
            data.setEmail(user.getEmail());
            data.setAddress(user.getAddress());
            userRepo.save(data);
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public void DeleteUser(@PathVariable Integer id) {
        userRepo.deleteById(id);
        
    }

}

