package com.codeacher.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatisticsResponse {
    private Integer totalSubmissions;
    private List<ProblemTypeDistribution> problemTypeDistribution;
    private List<ProblemSiteDistribution> problemSiteDistribution;
    private List<WeeklyProgress> weeklyProgress;
    private List<DailySubmission> dailySubmissions;
    private List<String> weakAreas;
    private Map<String, Integer> characterUsage;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProblemTypeDistribution {
        private String name;
        private Integer value;
        private String color;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProblemSiteDistribution {
        private String name;
        private Integer value;
        private String color;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WeeklyProgress {
        private String date;
        private Integer count;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DailySubmission {
        private String date;
        private Integer count;
    }
}


