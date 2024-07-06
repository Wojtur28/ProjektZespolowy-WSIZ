package org.example.backend.config.security.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInResponse {
    private String token;
    private Integer expiresIn;
}
