package com.codeacher.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "alternative_solutions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlternativeSolution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedback_id", nullable = false)
    private Feedback feedback;

    @Column(name = "solution_code", columnDefinition = "TEXT", nullable = false)
    private String solutionCode;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    @Column(name = "display_order")
    private Integer displayOrder;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}

