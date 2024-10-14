package com.saltpgp.promptmaster.service;

import com.saltpgp.promptmaster.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private final UserRepository userRepository;

    public GameService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
