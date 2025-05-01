package com.PAF_Assignment.demo.Controller;

<<<<<<< Updated upstream
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

=======
>>>>>>> Stashed changes
import com.PAF_Assignment.demo.Model.Post;
import com.PAF_Assignment.demo.Repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

<<<<<<< Updated upstream
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


=======
import java.io.File;
import java.io.IOException;
import java.util.*;
>>>>>>> Stashed changes

@RestController
@RequestMapping
@CrossOrigin
public class PostController {

    @Autowired
    private PostRepo postRepo;

<<<<<<< Updated upstream
=======
    private final String uploadDir = "uploads/";

    // Create post
>>>>>>> Stashed changes
    @PostMapping("/addPost")
    public Post addPost(@RequestParam("description") String description,
                        @RequestParam("mediaFiles") List<MultipartFile> mediaFiles) throws IOException {

        if (mediaFiles.size() > 3) {
            throw new RuntimeException("Maximum 3 media files allowed.");
        }

        List<String> fileNames = saveFiles(mediaFiles);

        Post post = new Post();
        post.setDescription(description);
        post.setMediaFiles(fileNames);

        return postRepo.save(post);
    }
<<<<<<< Updated upstream
        
    
    
    

=======

    // Get a single post
    @GetMapping("/getPost/{id}")
    public Post getPost(@PathVariable String id) {
        return postRepo.findById(id).orElse(null);
    }

    // Get all posts
    @GetMapping("/fetchPosts")
    public List<Post> fetchPosts() {
        return postRepo.findAll();
    }

    // Update a post
    @PutMapping("/updatePost/{id}")
    public Post updatePost(@PathVariable String id,
                           @RequestParam("description") String description,
                           @RequestParam(value = "mediaFiles", required = false) List<MultipartFile> mediaFiles) throws IOException {

        Post existing = postRepo.findById(id).orElse(null);
        if (existing == null) {
            throw new RuntimeException("Post not found.");
        }

        existing.setDescription(description);

        if (mediaFiles != null && !mediaFiles.isEmpty()) {
            if (mediaFiles.size() > 3) {
                throw new RuntimeException("Maximum 3 media files allowed.");
            }
            List<String> newFiles = saveFiles(mediaFiles);
            existing.setMediaFiles(newFiles);
        }

        return postRepo.save(existing);
    }

    // Delete post
    @DeleteMapping("/deletePost/{id}")
    public void deletePost(@PathVariable String id) {
        postRepo.deleteById(id);
    }

    // Save uploaded files to disk
    private List<String> saveFiles(List<MultipartFile> mediaFiles) throws IOException {
        List<String> fileNames = new ArrayList<>();

        for (MultipartFile file : mediaFiles) {
            String original = file.getOriginalFilename();
            String filename = System.currentTimeMillis() + "_" + Objects.requireNonNull(original);
            File dest = new File(uploadDir + filename);
            dest.getParentFile().mkdirs();
            file.transferTo(dest);
            fileNames.add(filename);
        }

        return fileNames;
    }
>>>>>>> Stashed changes
}
