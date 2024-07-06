package org.example.backend.config.security.service;

import lombok.AllArgsConstructor;
import org.example.backend.config.security.dto.SignInUser;
import org.example.backend.config.security.dto.SignUpUser;
import org.example.backend.user.UserEntity;
import org.example.backend.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public UserEntity signup(SignUpUser input) {

        userRepository.findByEmail(input.getEmail())
                .ifPresent(user -> {
                    throw new RuntimeException("User with this email already exists");
                });

        UserEntity user = new UserEntity();
        user.setEmail(input.getEmail());
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);
    }

    public UserEntity authenticate(SignInUser input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }
}
