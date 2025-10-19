package com.codeacher.controller;

import com.codeacher.dto.request.SubmissionRequest;
import com.codeacher.dto.response.ApiResponse;
import com.codeacher.dto.response.SubmissionResponse;
import com.codeacher.dto.response.SubmissionStatusResponse;
import com.codeacher.service.SubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping
    public ResponseEntity<ApiResponse<SubmissionResponse>> submitCode(
            Authentication authentication,
            @Valid @RequestBody SubmissionRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        log.info("코드 제출: userId={}, problemUrl={}, characterId={}", 
            userId, request.getProblemUrl(), request.getCharacterId());
        
        SubmissionResponse response = submissionService.createSubmission(userId, request);
        return ResponseEntity.ok(ApiResponse.success("제출이 완료되었습니다", response));
    }

    @GetMapping("/{submissionId}")
    public ResponseEntity<ApiResponse<SubmissionResponse>> getSubmission(
            Authentication authentication,
            @PathVariable Long submissionId) {
        Long userId = (Long) authentication.getPrincipal();
        SubmissionResponse response = submissionService.getSubmission(submissionId, userId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{submissionId}/status")
    public ResponseEntity<ApiResponse<SubmissionStatusResponse>> getSubmissionStatus(
            Authentication authentication,
            @PathVariable Long submissionId) {
        Long userId = (Long) authentication.getPrincipal();
        SubmissionStatusResponse status = submissionService.getSubmissionStatus(submissionId, userId);
        return ResponseEntity.ok(ApiResponse.success(status));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSubmissions(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "submittedAt,desc") String sort) {
        
        Long userId = (Long) authentication.getPrincipal();
        String[] sortParams = sort.split(",");
        Sort.Direction direction = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc") 
            ? Sort.Direction.DESC : Sort.Direction.ASC;
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
        Page<SubmissionResponse> submissions = submissionService.getUserSubmissions(userId, pageable);
        
        Map<String, Object> response = Map.of(
            "content", submissions.getContent(),
            "totalElements", submissions.getTotalElements(),
            "totalPages", submissions.getTotalPages(),
            "currentPage", submissions.getNumber()
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}