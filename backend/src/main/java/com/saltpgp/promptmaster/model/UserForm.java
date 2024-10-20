package com.saltpgp.promptmaster.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "owner")
public class UserForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String company;

    @Column
    private String email;

    @Column
    private String phone;


    public UserForm() {
    }

    public UserForm(String name, String company, String email, String phone) {
        this.name = name;
        this.company = company;
        this.email = email;
        this.phone = phone;
    }
}
