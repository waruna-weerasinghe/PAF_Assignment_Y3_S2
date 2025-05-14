package com.PAF_Assignment.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF_Assignment.demo.Entity.LikePost;
import com.PAF_Assignment.demo.Repository.LikePostRepo;

@Service
public class LikePostService {

    @Autowired
    private LikePostRepo likePostRepo;

    public LikePost saveDetails(LikePost likePost) {

        return likePostRepo.save(likePost);

    }

}
