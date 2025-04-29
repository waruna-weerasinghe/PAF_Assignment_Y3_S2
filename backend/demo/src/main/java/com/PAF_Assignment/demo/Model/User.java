package com.PAF_Assignment.demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private Integer id; // MongoDB uses String for ObjectId

    private String name;
    
    private Integer telephone;

    private String password;

     private String email;

    private String address;
    

    


    
}
