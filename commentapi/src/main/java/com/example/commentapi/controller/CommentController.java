package com.example.commentapi.controller;

import com.example.commentapi.model.Comment;
import com.example.commentapi.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments") // Adjusted to reflect postId
@CrossOrigin(origins = "*") // Allow frontend access
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public Comment createComment(@PathVariable Long postId, @RequestBody Comment comment) {
        // Optionally, associate the postId with the comment if necessary
        comment.setPostId(postId); // Assuming you have a postId field in Comment
        return commentService.saveComment(comment);
    }

    @GetMapping
    public List<Comment> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long postId, @PathVariable Long id) {
        commentService.deleteComment(id);
    }
}
