package com.saltpgp.promptmaster.repository;

import com.saltpgp.promptmaster.model.UserForm;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserFormRepository {
    private final UserDbRepository repo;

    public UserFormRepository(UserDbRepository repo) {
        this.repo = repo;
    }

    public UserForm getByUserName(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public UserForm createUser() {
        return repo.save(new UserForm());
    }

    public UserForm saveUserForm(UserForm userForm) {
        return repo.save(userForm);
    }

    public List<UserForm> findAllForms() {return repo.findAll(); }

}

