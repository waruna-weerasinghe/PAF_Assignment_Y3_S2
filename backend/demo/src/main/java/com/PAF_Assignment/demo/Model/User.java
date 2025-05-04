package com.PAF_Assignment.demo.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String address;
    private String phone;
    private String password;
    private String dateOfBirth;
    private String role; // USER or ADMIN
    private String profileImagePath;
    private String otp;
    private boolean otpVerified;
    private String otherField;

    public User(String id, String name, String email, String password, String role, String phone, String address, String profilePath, String otherField) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phone = phone;
        this.address = address;
        this.profileImagePath = profilePath;
        this.otherField = otherField;
    }
}

