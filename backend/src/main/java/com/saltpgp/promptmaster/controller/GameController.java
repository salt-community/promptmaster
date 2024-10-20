package com.saltpgp.promptmaster.controller;


import com.saltpgp.promptmaster.model.IncomingScoreDto;
import com.saltpgp.promptmaster.model.IncomingUserFormDto;
import com.saltpgp.promptmaster.model.ScoreBoard;
import com.saltpgp.promptmaster.model.UserForm;
import com.saltpgp.promptmaster.service.GameService;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/promptmaster")
public class GameController {

    private final GameService service;

    public GameController(GameService service) {
        this.service = service;
    }

    @GetMapping("/scoreboard")
    public ResponseEntity<List<ScoreBoard>> getAllScores() {
        List<ScoreBoard> scoreboard = service.getLeaderBoard();

        return ResponseEntity.ok(scoreboard);
    }

    @GetMapping("/form")
    public ResponseEntity<List<UserForm>> getAllForms() {
        List<UserForm> userForms = service.getAllForm();

        return ResponseEntity.ok(userForms);
    }

    @PostMapping("/score")
    public ResponseEntity<ScoreBoard> addScore(@RequestBody IncomingScoreDto scoreDto) {

        ScoreBoard score = service.addScore(scoreDto.name(),scoreDto.score(), scoreDto.phone());
        return ResponseEntity.accepted().body(score);
    }

    @PostMapping("/form")
    public ResponseEntity<UserForm> addForm(@RequestBody IncomingUserFormDto formDto) {

        UserForm form = service.addForm(formDto.name(),formDto.company(),formDto.email(),formDto.phone());
        return ResponseEntity.accepted().body(form);
    }

}
