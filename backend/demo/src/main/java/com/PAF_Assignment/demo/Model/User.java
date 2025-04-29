package com.PAF_Assignment.demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User implements UserDetails {
    @Id
    private String id; // MongoDB uses String for ObjectIds

    private String name;
    
    private Number telephone;

    private String password;

    private String email;

    private String address;

    private Integer age;

    private String role;


    
}
