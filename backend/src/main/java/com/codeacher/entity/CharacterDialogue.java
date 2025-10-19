package com.codeacher.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "character_dialogues", indexes = {
    @Index(name = "idx_character_phase", columnList = "character_id, phase")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CharacterDialogue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id", nullable = false)
    private Character character;

    @Column(length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private DialoguePhase phase;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String dialogue;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    public enum DialoguePhase {
        LOADING,
        ANALYZING,
        COMPLETE
    }
}


