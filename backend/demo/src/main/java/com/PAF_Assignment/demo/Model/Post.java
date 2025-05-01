package com.PAF_Assignment.demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Document(collection = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    private String id;

    private String description;

<<<<<<< Updated upstream
    private String password;

    private String email;

    private String address;
    

    // private Date birthDate;


    
=======
    // Stores filenames of uploaded images/videos
    private List<String> mediaFiles;
>>>>>>> Stashed changes
}
