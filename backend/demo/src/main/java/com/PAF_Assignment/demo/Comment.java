package com.PAF_Assignment.demo;

import jakarta.persistence.*; // ✅ Use Jakarta Persistence (JPA 3+)
import lombok.Data;

@Entity
@Data
@Table(name = "COMMENT")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ✅ Auto-increment ID
    @Column(name = "ID")
    private int id;

    @Column(name = "MARK")
    private int mark;

    @Column(name = "NAME")
    private String name;
}
