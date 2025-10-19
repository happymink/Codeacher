package com.codeacher.controller;

import com.codeacher.dto.response.ApiResponse;
import com.codeacher.dto.response.StatisticsResponse;
import com.codeacher.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<StatisticsResponse>> getUserStatistics(
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        StatisticsResponse statistics = statisticsService.getUserStatistics(userId);
        return ResponseEntity.ok(ApiResponse.success(statistics));
    }
}


