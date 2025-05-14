package com.PAF_Assignment.demo.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.*; // ✅ Use Jakarta Persistence (JPA 3+)
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "COMMENT")
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ✅ Auto-increment ID
    @Column(name = "ID")
    private int id;

    @Column(name = "MARK")
    private int mark;

    @Column(name = "NAME")
    private String name;

    @Column(name = "COMMENT")
    private String comment;

}
