package com.codeacher.dto.response;

import com.codeacher.entity.AlternativeSolution;
import com.codeacher.entity.Feedback;
import com.codeacher.entity.FeedbackDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackResponse {
    private String overallFeedback;
    private List<String> feedbacks;
    private List<String> keyPoints;
    private List<String> warnings;
    private String timeComplexity;
    private String spaceComplexity;
    private String alternativeApproach;
    private List<AlternativeSolutionInfo> alternativeSolutions;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AlternativeSolutionInfo {
        private Long id;
        private String code;
        private String comment;
        private Integer displayOrder;
    }
    
    public static FeedbackResponse from(Feedback feedback) {
        return FeedbackResponse.builder()
            .overallFeedback(feedback.getOverallFeedback())
            .feedbacks(feedback.getDetails().stream()
                .filter(d -> d.getCategory() == FeedbackDetail.FeedbackCategory.FEEDBACK)
                .map(FeedbackDetail::getContent)
                .collect(Collectors.toList()))
            .keyPoints(feedback.getDetails().stream()
                .filter(d -> d.getCategory() == FeedbackDetail.FeedbackCategory.KEY_POINT)
                .map(FeedbackDetail::getContent)
                .collect(Collectors.toList()))
            .warnings(feedback.getDetails().stream()
                .filter(d -> d.getCategory() == FeedbackDetail.FeedbackCategory.WARNING)
                .map(FeedbackDetail::getContent)
                .collect(Collectors.toList()))
            .timeComplexity(feedback.getTimeComplexity())
            .spaceComplexity(feedback.getSpaceComplexity())
            .alternativeApproach(feedback.getAlternativeApproach())
            .alternativeSolutions(feedback.getAlternativeSolutions().stream()
                .map(alt -> AlternativeSolutionInfo.builder()
                    .id(alt.getId())
                    .code(alt.getSolutionCode())
                    .comment(alt.getComment())
                    .displayOrder(alt.getDisplayOrder())
                    .build())
                .collect(Collectors.toList()))
            .build();
    }
}


