package com.saltpgp.promptmaster.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@CrossOrigin
public class LoginController {

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto, @Value("${api.password}") String password) {
        if (password == null || password.isEmpty()) {
            return ResponseEntity.internalServerError().body("Server password problem");
        }
        if (!password.equals(loginDto.password)) {
            return ResponseEntity.status(403).body("Nice try");
        }
        return ResponseEntity.ok(new TokenDto(TokenHandler.newToken()));
    }

    @PostMapping("/check")
    public ResponseEntity<?> check(@RequestBody TokenDto tokenDto) {
        final String currentToken = TokenHandler.getToken();
        if (currentToken == null || currentToken.isEmpty()) {
            return ResponseEntity.internalServerError().body("Server token problem");
        }
        if (currentToken.equals(tokenDto.token)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(401).build();
    }

    public record LoginDto(String password) {}
    public record TokenDto(String token) {}
}
