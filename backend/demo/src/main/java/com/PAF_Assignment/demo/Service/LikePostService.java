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

    public LikePost updateDetail(LikePost likePost) {

        LikePost updateLikePost = likePostRepo.findById(likePost.getId()).orElse(null);
        if (updateLikePost != null) {

            updateLikePost.setReact(likePost.getReact());
            updateLikePost.setName(likePost.getName());
            likePostRepo.save(updateLikePost);
            return updateLikePost;

        }
        return null;
    }

    public String deleteLike(int id) {

        likePostRepo.deleteById(id);
        return "Removed the react of this post" + id;

    }

}
