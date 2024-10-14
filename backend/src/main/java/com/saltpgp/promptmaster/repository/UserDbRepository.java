package com.saltpgp.promptmaster.repository;

import com.saltpgp.promptmaster.model.User;
import org.springframework.data.repository.ListCrudRepository;

public interface UserDbRepository extends ListCrudRepository<User, Long> {
}
