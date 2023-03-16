package com.codegym.service;

import com.codegym.entity.User;
import com.codegym.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {
        // MultipartFile file, String username, String email, String password
        User newUser = new User();
        userRepository.save(user);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }
}
