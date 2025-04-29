package com.PAF_Assignment.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PAF_Assignment.demo.Model.Post;
import com.PAF_Assignment.demo.Repository.PostRepo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.util.List;



@RestController
@RequestMapping
@CrossOrigin

public class PostController {

@Autowired
PostRepo postRepo;

// adding post
    @PostMapping("/addPost")
    public void addPost(@RequestBody Post post) {
        postRepo.save(post);
        
    }

    //finding post
    @GetMapping("/getPost/{id}")
    public Post getPost(@PathVariable String id) {
        
        return postRepo.findById(id).orElse(null);
        
    }

    //finding all posts
    @GetMapping("/fetchPosts")
    public List<Post> fetchPosts() {
            return postRepo.findAll();
        
    }

    //updating post
    @PutMapping("/updatePost")
    public void updatePost(@RequestBody Post post) {
        postRepo.save(post);

            Post data=postRepo.findById(post.getId()).orElse(null);
            if(data!=null){
                data.setName(post.getName());
                data.setTelephone(post.getTelephone());
                data.setPassword(post.getPassword());
                data.setEmail(post.getEmail());
                data.setAddress(post.getAddress());
                postRepo.save(data);
            }
        
    }

    //deleting post
    @DeleteMapping("/deletePost/{id}")
    public void deletePost(@PathVariable String id) {
        postRepo.deleteById(id);
        
    }
     
    
    @PostMapping("/addPostList")
    public void addPostList(@RequestBody List<Post> post) {
        postRepo.saveAll(post);
        
    }
    
    

}