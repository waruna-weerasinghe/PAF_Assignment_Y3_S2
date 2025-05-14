package com.PAF_Assignment.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.PAF_Assignment.demo.Entity.LikePost;
import com.PAF_Assignment.demo.Service.LikePostService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class LikePostController {

    @Autowired
    private LikePostService likePostService;

    @PostMapping("/addLike")
    public LikePost postDetails(@RequestBody LikePost likePost) {

        return likePostService.saveDetails(likePost);

    }

    @PutMapping("/updateLike")

    public LikePost updateLikeDetails(@RequestBody LikePost likePost) {

        return likePostService.updateDetail(likePost);

    }

}
