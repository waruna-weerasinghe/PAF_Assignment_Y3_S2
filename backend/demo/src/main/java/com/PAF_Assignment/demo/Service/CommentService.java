package com.PAF_Assignment.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF_Assignment.demo.Entity.Comment;
import com.PAF_Assignment.demo.Repository.CommentRepo;

@Service

public class CommentService {

    @Autowired
    private CommentRepo commentRepo;

    public Comment saveDetails(Comment comment) {

        return commentRepo.save(comment);

    }

}
