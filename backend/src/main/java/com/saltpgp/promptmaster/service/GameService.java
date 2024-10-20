package com.saltpgp.promptmaster.service;

import com.saltpgp.promptmaster.model.ScoreBoard;
import com.saltpgp.promptmaster.model.UserForm;
import com.saltpgp.promptmaster.repository.ScoreBoardRepository;
import com.saltpgp.promptmaster.repository.UserFormRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    private final UserFormRepository userFormRepository;
    private final ScoreBoardRepository scoreBoardRepository;

    public GameService(UserFormRepository userFormRepository, ScoreBoardRepository scoreBoardRepository) {
        this.userFormRepository = userFormRepository;
        this.scoreBoardRepository = scoreBoardRepository;
    }

    public List<ScoreBoard> getLeaderBoard() {
        List<ScoreBoard> scoreBoards = scoreBoardRepository.findall();
        return scoreBoards;
    }

    public List<UserForm> getAllForm() {
        List<UserForm> userForms = userFormRepository.findAllForms();
        return userForms;
    }

    public ScoreBoard addScore(String name, long score, String phone) {
        ScoreBoard NewScore = new ScoreBoard(name,score,phone);
        return scoreBoardRepository.save(NewScore);
    }

    public UserForm addForm(String name, String company, String email, String phone) {
        UserForm newForm = new UserForm(name, company, email, phone);
        return userFormRepository.saveUserForm(newForm);
    }


}
