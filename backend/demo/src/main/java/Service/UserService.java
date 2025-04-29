package Service;

import org.springframework.stereotype.Service;

import com.PAF_Assignment.demo.Model.User;
import com.PAF_Assignment.demo.Repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;

    public User postUser(User user) {
        return userRepo.save(user);
    }
    
}
