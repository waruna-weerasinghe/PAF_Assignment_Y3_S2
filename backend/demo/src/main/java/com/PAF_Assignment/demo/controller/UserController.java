package com.PAF_Assignment.demo.Controller;
import com.PAF_Assignment.demo.Model.User;
import com.PAF_Assignment.demo.Repository.UserRepo;
import com.PAF_Assignment.demo.Security.JWTUtil;
import com.PAF_Assignment.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        Optional<User> userOpt = userService.authenticate(loginUser.getEmail(), loginUser.getPassword());
        if (userOpt.isPresent()) {
            String otp = userService.generateOtp();
            userService.saveOtp(loginUser.getEmail(), otp);
            return ResponseEntity.ok("OTP sent: " + otp); // In production, send via email/SMS
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        if (userService.verifyOtp(email, otp)) {
            String token = jwtUtil.generateToken(email);
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadProfile(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        try {
            String path = "uploads/" + file.getOriginalFilename();
            Files.write(Paths.get(path), file.getBytes());
            User user = userService.updateUser(id, new User(null, null, null, null, null, null, null, path, null));
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> update(@PathVariable String id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Deleted");
    }
}