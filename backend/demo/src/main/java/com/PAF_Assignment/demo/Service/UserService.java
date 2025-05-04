package com.PAF_Assignment.demo.Service;

import com.PAF_Assignment.demo.Model.User; // Ensure this path is correct and the User class exists in this package
import com.PAF_Assignment.demo.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        return userRepo.save(user);
    }

    public Optional<User> authenticate(String email, String password) {
        Optional<User> userOpt = userRepo.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            return userOpt;
        }
        return Optional.empty();
    }

    public void saveOtp(String email, String otp) {
        userRepo.findByEmail(email).ifPresent(user -> {
            user.setOtp(otp);
            userRepo.save(user);
        });
    }

    public boolean verifyOtp(String email, String otp) {
        return userRepo.findByEmail(email)
                .map(user -> otp.equals(user.getOtp()))
                .orElse(false);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }

    public User updateUser(String id, User userUpdate) {
        return userRepo.findById(id).map(user -> {
            user.setName(userUpdate.getName());
            user.setAddress(userUpdate.getAddress());
            user.setPhone(userUpdate.getPhone());
            user.setDateOfBirth(userUpdate.getDateOfBirth());
            user.setProfileImagePath(userUpdate.getProfileImagePath());
            return userRepo.save(user);
        }).orElse(null);
    }

    public String generateOtp() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }
}
