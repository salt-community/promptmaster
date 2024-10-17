package com.saltpgp.promptmaster.controller;


import com.saltpgp.promptmaster.model.IncomingScoreDto;
import com.saltpgp.promptmaster.model.ScoreBoard;
import com.saltpgp.promptmaster.service.GameService;
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
    public ResponseEntity<List<ScoreBoard>> getAll() {
        List<ScoreBoard> scoreboard = service.getLeaderBoard();

        return ResponseEntity.ok(scoreboard);
    }

    @PostMapping("/score")
    public ResponseEntity<ScoreBoard> addScore(@RequestBody IncomingScoreDto scoreDto) {

        ScoreBoard score = service.addScore(scoreDto.name(),scoreDto.score());
        return ResponseEntity.accepted().body(score);
    }

}
