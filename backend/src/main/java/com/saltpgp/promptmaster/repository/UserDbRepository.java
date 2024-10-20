package com.saltpgp.promptmaster.repository;

import com.saltpgp.promptmaster.model.UserForm;
import org.springframework.data.repository.ListCrudRepository;

public interface UserDbRepository extends ListCrudRepository<UserForm, Long> {
}
