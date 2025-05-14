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

    public Comment updateDetail(Comment comment) {

        Comment updateComment = commentRepo.findById(comment.getId()).orElse(null);
        if (updateComment != null) {

            updateComment.setMark(comment.getMark());
            updateComment.setName(comment.getName());
            commentRepo.save(updateComment);
            return updateComment;
        }
        return null;

    }

    public String deleteComment(int id) {

        if (commentRepo.existsById(id)) {
            commentRepo.deleteById(id);
            return "Comment is successfully deleted" + id;

        } else {

            return "This id is not found to delete ";
        }

    }
}
