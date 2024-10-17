package com.saltpgp.promptmaster.repository;

import com.saltpgp.promptmaster.model.ScoreBoard;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ScoreBoardRepository {
    private final ScoreBoardDbRepository repo;

    public ScoreBoardRepository(ScoreBoardDbRepository repo) {
        this.repo = repo;
    }

    public List<ScoreBoard> findall() {
        return repo.findAll();
    }
    public ScoreBoard save(ScoreBoard scoreBoard) {
        return repo.save(scoreBoard);
    }
}
