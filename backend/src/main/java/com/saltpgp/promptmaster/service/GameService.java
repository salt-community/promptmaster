package com.saltpgp.promptmaster.service;

import com.saltpgp.promptmaster.model.ScoreBoard;
import com.saltpgp.promptmaster.repository.ScoreBoardRepository;
import com.saltpgp.promptmaster.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final UserRepository userRepository;
    private final ScoreBoardRepository scoreBoardRepository;

    public GameService(UserRepository userRepository, ScoreBoardRepository scoreBoardRepository) {
        this.userRepository = userRepository;
        this.scoreBoardRepository = scoreBoardRepository;
    }

    public List<ScoreBoard> getLeaderBoard() {
        List<ScoreBoard> scoreBoards = scoreBoardRepository.findall();
        return scoreBoards;
    }

    public ScoreBoard addScore(String name, long score) {
        ScoreBoard NewScore = new ScoreBoard(name,score);
        return scoreBoardRepository.save(NewScore);
    }
}
