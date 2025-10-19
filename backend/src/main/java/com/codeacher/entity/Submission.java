package com.codeacher.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions", indexes = {
    @Index(name = "idx_user_submitted", columnList = "user_id, submitted_at"),
    @Index(name = "idx_problem_type", columnList = "problem_type")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "problem_site", length = 50, nullable = false)
    private String problemSite;

    @Column(name = "problem_number", length = 50, nullable = false)
    private String problemNumber;

    @Column(name = "problem_title", length = 200)
    private String problemTitle;

    @Column(name = "problem_type", length = 50)
    private String problemType;

    @Column(name = "user_code", columnDefinition = "TEXT", nullable = false)
    private String userCode;

    @Column(length = 50)
    private String language;

    @Column(name = "character_id", length = 50)
    private String characterId;

    @Column(name = "status", length = 20)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private SubmissionStatus status = SubmissionStatus.PROCESSING;

    @OneToOne(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    private Feedback feedback;

    @CreationTimestamp
    @Column(name = "submitted_at", nullable = false, updatable = false)
    private LocalDateTime submittedAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum SubmissionStatus {
        PROCESSING,
        COMPLETED,
        FAILED
    }
}


