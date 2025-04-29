package com.PAF_Assignment.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PAF_Assignment.demo.Model.Post;
import com.PAF_Assignment.demo.Repository.PostRepo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping
@CrossOrigin

public class PostController {

@Autowired
PostRepo postRepo;

    @PostMapping("/addPost")
    public void addPost(@RequestBody Post post) {
        postRepo.save(post);
        
    }
        
    
    
    

}
