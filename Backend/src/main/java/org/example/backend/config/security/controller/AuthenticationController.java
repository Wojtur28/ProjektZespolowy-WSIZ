package org.example.backend.config.security.controller;

import lombok.AllArgsConstructor;
import org.example.backend.config.security.dto.SignInResponse;
import org.example.backend.config.security.dto.SignInUser;
import org.example.backend.config.security.dto.SignUpUser;
import org.example.backend.config.security.service.AuthenticationService;
import org.example.backend.config.security.service.JwtService;
import org.example.backend.mapper.UserMapper;
import org.example.backend.user.UserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.example.model.User;


@RequestMapping("/auth")
@RestController
@AllArgsConstructor
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    private final UserMapper userMapper;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignUpUser signUpUser) {
        UserEntity registeredUser = authenticationService.signup(signUpUser);

        return ResponseEntity.ok(userMapper.toDto(registeredUser));
    }

    @PostMapping("/signin")
    public ResponseEntity<SignInResponse> signin(@RequestBody SignInUser signInUser) {
        UserEntity authenticatedUser = authenticationService.authenticate(signInUser);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        SignInResponse loginResponse = new SignInResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(Math.toIntExact(jwtService.getExpirationTime()));

        return ResponseEntity.ok(loginResponse);
    }
}