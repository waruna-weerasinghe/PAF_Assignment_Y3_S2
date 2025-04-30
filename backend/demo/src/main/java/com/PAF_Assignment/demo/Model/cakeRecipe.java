package com.PAF_Assignment.demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "cakeRecipe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class cakeRecipe {
    @Id
    private String id; // MongoDB uses String for ObjectId

    private String name;
    
    private String Category;

    private String Ingrediant;
 
}