package com.saltpgp.promptmaster.repository;

import com.saltpgp.promptmaster.model.ScoreBoard;
import com.saltpgp.promptmaster.model.User;
import org.springframework.data.repository.ListCrudRepository;

public interface ScoreBoardDbRepository extends ListCrudRepository<ScoreBoard, Long> {
}
