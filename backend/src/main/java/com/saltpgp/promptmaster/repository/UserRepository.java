package com.saltpgp.promptmaster.repository;

import com.saltpgp.promptmaster.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    private final UserDbRepository repo;

    public UserRepository(UserDbRepository repo) {
        this.repo = repo;
    }

    public User getByUserName(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public User createUser() {
        return repo.save(new User());
    }

    public User saveUser(User user) {
        return repo.save(user);
    }

    public List<User> getAllUsers() {return repo.findAll(); }

}

