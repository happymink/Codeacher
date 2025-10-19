package com.codeacher.service;

import com.codeacher.dto.response.StatisticsResponse;
import com.codeacher.entity.Submission;
import com.codeacher.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatisticsService {

    private final SubmissionRepository submissionRepository;
    
    // 문제 유형별 색상 매핑
    private static final Map<String, String> PROBLEM_TYPE_COLORS = Map.of(
        "DFS", "hsl(207, 71%, 59%)",
        "BFS", "hsl(25, 40%, 40%)",
        "DP", "hsl(0, 79%, 70%)",
        "정렬", "hsl(28, 100%, 50%)",
        "그리디", "hsl(350, 100%, 88%)",
        "구현", "hsl(283, 39%, 53%)",
        "이분탐색", "hsl(120, 60%, 50%)",
        "기타", "hsl(0, 0%, 60%)"
    );
    
    // 사이트별 색상 매핑
    private static final Map<String, String> PROBLEM_SITE_COLORS = Map.of(
        "BAEKJOON", "hsl(25, 95%, 53%)",
        "PROGRAMMERS", "hsl(140, 60%, 50%)",
        "LEETCODE", "hsl(220, 90%, 56%)",
        "CODEFORCES", "hsl(270, 50%, 50%)",
        "ETC", "hsl(0, 70%, 60%)"
    );
    
    // 사이트명 한글 매핑
    private static final Map<String, String> SITE_NAMES = Map.of(
        "BAEKJOON", "백준",
        "PROGRAMMERS", "프로그래머스",
        "LEETCODE", "리트코드",
        "CODEFORCES", "코드포스",
        "ETC", "기타"
    );

    public StatisticsResponse getUserStatistics(Long userId) {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minus(7, ChronoUnit.DAYS);
        LocalDateTime threeMonthsAgo = LocalDateTime.now().minus(90, ChronoUnit.DAYS);
        LocalDateTime now = LocalDateTime.now();
        
        List<Submission> recentSubmissions = submissionRepository
            .findByUserIdAndDateRange(userId, oneWeekAgo, now);
        
        List<Submission> threeMonthSubmissions = submissionRepository
            .findByUserIdAndDateRange(userId, threeMonthsAgo, now);
        
        Long totalCount = submissionRepository.countByUserId(userId);
        
        List<Object[]> problemTypeData = submissionRepository.countByProblemTypeForUser(userId);
        List<Object[]> problemSiteData = submissionRepository.countByProblemSiteForUser(userId);
        
        return StatisticsResponse.builder()
            .totalSubmissions(totalCount.intValue())
            .problemTypeDistribution(buildProblemTypeDistribution(problemTypeData))
            .problemSiteDistribution(buildProblemSiteDistribution(problemSiteData))
            .weeklyProgress(buildWeeklyProgress(recentSubmissions))
            .dailySubmissions(buildDailySubmissions(threeMonthSubmissions))
            .weakAreas(identifyWeakAreas(problemTypeData))
            .characterUsage(calculateCharacterUsage(recentSubmissions))
            .build();
    }

    private List<StatisticsResponse.ProblemTypeDistribution> buildProblemTypeDistribution(
            List<Object[]> data) {
        if (data.isEmpty()) {
            return Collections.emptyList();
        }
        
        return data.stream()
            .map(row -> {
                String type = (String) row[0];
                long count = ((Number) row[1]).longValue();
                
                return StatisticsResponse.ProblemTypeDistribution.builder()
                    .name(type)
                    .value((int) count) // 실제 개수로 변경
                    .color(PROBLEM_TYPE_COLORS.getOrDefault(type, "hsl(0, 0%, 60%)"))
                    .build();
            })
            .collect(Collectors.toList());
    }

    private List<StatisticsResponse.ProblemSiteDistribution> buildProblemSiteDistribution(
            List<Object[]> data) {
        if (data.isEmpty()) {
            return Collections.emptyList();
        }
        
        return data.stream()
            .map(row -> {
                String site = (String) row[0];
                long count = ((Number) row[1]).longValue();
                String displayName = SITE_NAMES.getOrDefault(site, site);
                
                return StatisticsResponse.ProblemSiteDistribution.builder()
                    .name(displayName)
                    .value((int) count)
                    .color(PROBLEM_SITE_COLORS.getOrDefault(site, "hsl(0, 0%, 60%)"))
                    .build();
            })
            .collect(Collectors.toList());
    }
    
    private List<StatisticsResponse.WeeklyProgress> buildWeeklyProgress(
            List<Submission> submissions) {
        LocalDate today = LocalDate.now();
        List<StatisticsResponse.WeeklyProgress> progress = new ArrayList<>();
        
        Map<LocalDate, Long> countByDate = submissions.stream()
            .collect(Collectors.groupingBy(
                s -> s.getSubmittedAt().toLocalDate(),
                Collectors.counting()
            ));
        
        for (int i = 6; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            int count = countByDate.getOrDefault(date, 0L).intValue();
            
            progress.add(StatisticsResponse.WeeklyProgress.builder()
                .date(date.toString())
                .count(count)
                .build());
        }
        
        return progress;
    }
    
    private List<StatisticsResponse.DailySubmission> buildDailySubmissions(
            List<Submission> submissions) {
        LocalDate today = LocalDate.now();
        LocalDate threeMonthsAgo = today.minusDays(90);
        
        Map<LocalDate, Long> countByDate = submissions.stream()
            .collect(Collectors.groupingBy(
                s -> s.getSubmittedAt().toLocalDate(),
                Collectors.counting()
            ));
        
        List<StatisticsResponse.DailySubmission> dailyData = new ArrayList<>();
        
        // 3개월간의 모든 날짜 생성
        LocalDate currentDate = threeMonthsAgo;
        while (!currentDate.isAfter(today)) {
            int count = countByDate.getOrDefault(currentDate, 0L).intValue();
            
            dailyData.add(StatisticsResponse.DailySubmission.builder()
                .date(currentDate.toString())
                .count(count)
                .build());
            
            currentDate = currentDate.plusDays(1);
        }
        
        return dailyData;
    }

    private List<String> identifyWeakAreas(List<Object[]> problemTypeData) {
        if (problemTypeData.isEmpty()) {
            return Collections.emptyList();
        }
        
        // 제출 횟수가 적은 상위 2개 유형을 약점으로 판단
        return problemTypeData.stream()
            .sorted(Comparator.comparing(row -> ((Number) row[1]).longValue()))
            .limit(2)
            .map(row -> (String) row[0])
            .collect(Collectors.toList());
    }

    private Map<String, Integer> calculateCharacterUsage(List<Submission> submissions) {
        return submissions.stream()
            .collect(Collectors.groupingBy(
                s -> s.getCharacterId() != null ? s.getCharacterId() : "unknown",
                Collectors.collectingAndThen(Collectors.counting(), Long::intValue)
            ));
    }
}


