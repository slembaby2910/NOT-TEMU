package com.nottemu.backend.controller;

import com.nottemu.backend.dto.LoginRequest;
import com.nottemu.backend.dto.RegisterRequest;
import com.nottemu.backend.model.User;
import com.nottemu.backend.service.UserAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserAuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public User me(@RequestParam String email) {
        return authService.getMe(email);
    }
}