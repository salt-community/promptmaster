package com.saltpgp.promptmaster.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "leaderboard")
public class ScoreBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private long score;

    public ScoreBoard() {

    }
    public ScoreBoard(String name, long score) {
        this.name = name;
        this.score = score;
    }
}
