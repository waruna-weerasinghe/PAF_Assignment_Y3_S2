package com.PAF_Assignment.demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

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
    
    private String telephone; // Changed to String for better flexibility

    private String password;

    private String email;

    private String address;

    private String age; // Changed to String for better flexibility

    private String role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role)); // Modify to return actual authorities if needed
    }

    @Override
    public String getUsername() {
        return this.email; // Assuming email is used as the username
    }

    @Override
    public boolean isEnabled() {
        return true; // Modify as per your application's logic
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Modify as per your application's logic
    }

   

    @Override
    public boolean isAccountNonExpired() {
        return true; // Modify as per your application's logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Modify as per your application's logic
    }

    @Override
    public String getPassword() {
        return this.password;
    }
}
