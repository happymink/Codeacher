package com.codeacher.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * AI API로부터 받을 피드백 데이터 구조
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AIFeedbackDTO {
    
    @JsonProperty("problemType")
    private String problemType;
    
    @JsonProperty("overallFeedback")
    private String overallFeedback;
    
    @JsonProperty("feedbacks")
    private List<String> feedbacks;
    
    @JsonProperty("keyPoints")
    private List<String> keyPoints;
    
    @JsonProperty("warnings")
    private List<String> warnings;
    
    @JsonProperty("timeComplexity")
    private String timeComplexity;
    
    @JsonProperty("spaceComplexity")
    private String spaceComplexity;
    
    @JsonProperty("alternativeApproach")
    private String alternativeApproach;
    
    @JsonProperty("alternativeSolutions")
    private List<AlternativeSolutionDTO> alternativeSolutions;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AlternativeSolutionDTO {
        @JsonProperty("code")
        private String code;
        
        @JsonProperty("comment")
        private String comment;
    }
}


