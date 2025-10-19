package com.codeacher.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "feedback_details", indexes = {
    @Index(name = "idx_feedback_category_order", columnList = "feedback_id, category, order_index")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedback_id", nullable = false)
    private Feedback feedback;

    @Column(length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private FeedbackCategory category;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    public enum FeedbackCategory {
        FEEDBACK,
        KEY_POINT,
        WARNING
    }
}


