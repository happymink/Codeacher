package com.codeacher.dto.response;

import com.codeacher.entity.Submission;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmissionResponse {
    private Long id;
    private String problemSite;
    private String problemNumber;
    private String problemTitle;
    private String problemType;
    private String language;
    private String userCode;
    private String characterId;
    private CharacterInfo character;
    private String status;
    private FeedbackResponse feedback;
    private LocalDateTime submittedAt;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CharacterInfo {
        private String id;
        private String name;
        private String emoji;
        private String image;
    }
    
    public static SubmissionResponse from(Submission submission) {
        return SubmissionResponse.builder()
            .id(submission.getId())
            .problemSite(submission.getProblemSite())
            .problemNumber(submission.getProblemNumber())
            .problemTitle(submission.getProblemTitle())
            .problemType(submission.getProblemType())
            .language(submission.getLanguage())
            .userCode(submission.getUserCode())
            .characterId(submission.getCharacterId())
            .character(CharacterInfo.builder()
                .id(submission.getCharacterId())
                .name(submission.getCharacterId()) // Will be populated from service
                .emoji("") // Will be populated from service
                .image("/characters/" + submission.getCharacterId() + "_portrait.jpg")
                .build())
            .status(submission.getStatus().name())
            .submittedAt(submission.getSubmittedAt())
            .build();
    }
}


