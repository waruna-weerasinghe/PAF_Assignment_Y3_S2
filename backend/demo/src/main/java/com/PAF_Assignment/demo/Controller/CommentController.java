package com.PAF_Assignment.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.PAF_Assignment.demo.Entity.Comment;
import com.PAF_Assignment.demo.Repository.CommentRepo;
import com.PAF_Assignment.demo.Service.CommentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController

public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/addComment")
    public Comment postDetails(@RequestBody Comment comment) {

        return commentService.saveDetails(comment);

    }

    @PutMapping("/updateComment")

    public Comment updateCommentDetails(@RequestBody Comment comment) {

        return commentService.updateDetail(comment);

    }

}
