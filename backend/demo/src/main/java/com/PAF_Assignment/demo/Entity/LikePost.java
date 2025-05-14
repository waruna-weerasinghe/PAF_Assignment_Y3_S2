package com.PAF_Assignment.demo.Entity;

import jakarta.persistence.*; // ✅ Use Jakarta Persistence (JPA 3+)
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "LIKE_POST")
@NoArgsConstructor
@AllArgsConstructor
public class LikePost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ✅ Auto-increment ID
    @Column(name = "ID")
    private int id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Reaction_Type")
    private String react;

}
