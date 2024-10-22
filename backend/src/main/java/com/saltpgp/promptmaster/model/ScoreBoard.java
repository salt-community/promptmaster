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

    @Column
    private String phone;

    @Column
    private String prompt;

    @Column
    private String imageurl;

    @Column(columnDefinition = "TEXT")
    private String base64;


    public ScoreBoard() {

    }

    public ScoreBoard(String name, long score, String phone, String prompt, String imageurl, String base64) {
        this.name = name;
        this.score = score;
        this.phone = phone;
        this.prompt = prompt;
        this.imageurl = imageurl;
        this.base64 = base64;
    }
}
