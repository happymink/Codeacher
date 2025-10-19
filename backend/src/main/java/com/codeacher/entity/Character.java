package com.codeacher.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "characters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Character {

    @Id
    @Column(length = 50)
    private String id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 10)
    private String emoji;

    @Column(length = 500)
    private String image;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 200)
    private String specialty;

    @Column(name = "color_theme", length = 20)
    private String colorTheme;

    @Column(length = 50)
    private String personality;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CharacterDialogue> dialogues = new ArrayList<>();
}


