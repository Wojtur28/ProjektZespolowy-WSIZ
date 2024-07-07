package org.example.backend.security.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInUser {
    private String email;
    private String password;
}
