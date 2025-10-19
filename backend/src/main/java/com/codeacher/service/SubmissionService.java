package com.codeacher.service;

import com.codeacher.dto.AIFeedbackDTO;
import com.codeacher.dto.request.SubmissionRequest;
import com.codeacher.dto.response.FeedbackResponse;
import com.codeacher.dto.response.SubmissionResponse;
import com.codeacher.dto.response.SubmissionStatusResponse;
import com.codeacher.entity.*;
import com.codeacher.exception.ResourceNotFoundException;
import com.codeacher.repository.FeedbackRepository;
import com.codeacher.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final FeedbackRepository feedbackRepository;
    private final UserService userService;
    private final CharacterService characterService;
    private final AIFeedbackService aiFeedbackService;
    
    // 진행 상태 추적용 (실제로는 Redis나 DB 사용 권장)
    private final Map<Long, Integer> progressMap = new HashMap<>();

    @Transactional
    public SubmissionResponse createSubmission(Long userId, SubmissionRequest request) {
        User user = userService.findById(userId);
        
        // request의 characterId 사용 (없으면 사용자의 선택된 캐릭터)
        String characterId = request.getCharacterId() != null 
            ? request.getCharacterId() 
            : user.getSelectedCharacter();
        
        // URL에서 문제 정보 추출
        AIFeedbackService.ProblemInfo problemInfo = aiFeedbackService.extractProblemInfo(request.getProblemUrl());
        String detectedLanguage = aiFeedbackService.detectLanguage(request.getUserCode());
        
        log.info("추출된 정보 - Site: {}, Number: {}, Language: {}", 
                problemInfo.getSite(), problemInfo.getNumber(), detectedLanguage);
        
        Submission submission = Submission.builder()
            .user(user)
            .problemSite(problemInfo.getSite())
            .problemNumber(problemInfo.getNumber())
            .problemTitle(problemInfo.getTitle())
            .userCode(request.getUserCode())
            .language(detectedLanguage)
            .characterId(characterId)
            .status(Submission.SubmissionStatus.PROCESSING)
            .build();
        
        Submission saved = submissionRepository.save(submission);
        log.info("제출 생성: ID={}, User={}, Character={}", saved.getId(), userId, characterId);
        
        // 비동기로 AI 피드백 생성
        processAIFeedbackAsync(saved.getId(), request, characterId);
        
        return SubmissionResponse.from(saved);
    }

    @Async
    public CompletableFuture<Void> processAIFeedbackAsync(Long submissionId, 
                                                           SubmissionRequest request,
                                                           String characterId) {
        return CompletableFuture.runAsync(() -> {
            try {
                progressMap.put(submissionId, 10);
                
                // AI 피드백 생성 - URL과 코드만 전달, AI가 정보 추출
                AIFeedbackDTO aiResponse = aiFeedbackService.generateFeedback(
                    request.getProblemUrl(),
                    request.getUserCode(),
                    characterId
                );
                
                progressMap.put(submissionId, 60);
                
                // 피드백 저장
                saveFeedback(submissionId, aiResponse);
                
                progressMap.put(submissionId, 100);
                
                log.info("AI 피드백 처리 완료: Submission ID={}", submissionId);
            } catch (Exception e) {
                log.error("AI 피드백 처리 실패: Submission ID={}", submissionId, e);
                markSubmissionAsFailed(submissionId);
            }
        });
    }

    @Transactional
    protected void saveFeedback(Long submissionId, AIFeedbackDTO aiResponse) {
        Submission submission = submissionRepository.findById(submissionId)
            .orElseThrow(() -> new ResourceNotFoundException("제출을 찾을 수 없습니다: " + submissionId));
        
        // 문제 유형 업데이트
        submission.setProblemType(aiResponse.getProblemType());
        
        // 피드백 엔티티 생성
        Feedback feedback = Feedback.builder()
            .submission(submission)
            .overallFeedback(aiResponse.getOverallFeedback())
            .timeComplexity(aiResponse.getTimeComplexity())
            .spaceComplexity(aiResponse.getSpaceComplexity())
            .alternativeApproach(aiResponse.getAlternativeApproach())
            .build();
        
        // 피드백 세부사항 추가
        int order = 0;
        for (String content : aiResponse.getFeedbacks()) {
            FeedbackDetail detail = FeedbackDetail.builder()
                .feedback(feedback)
                .category(FeedbackDetail.FeedbackCategory.FEEDBACK)
                .content(content)
                .orderIndex(order++)
                .build();
            feedback.getDetails().add(detail);
        }
        
        order = 0;
        for (String content : aiResponse.getKeyPoints()) {
            FeedbackDetail detail = FeedbackDetail.builder()
                .feedback(feedback)
                .category(FeedbackDetail.FeedbackCategory.KEY_POINT)
                .content(content)
                .orderIndex(order++)
                .build();
            feedback.getDetails().add(detail);
        }
        
        order = 0;
        for (String content : aiResponse.getWarnings()) {
            FeedbackDetail detail = FeedbackDetail.builder()
                .feedback(feedback)
                .category(FeedbackDetail.FeedbackCategory.WARNING)
                .content(content)
                .orderIndex(order++)
                .build();
            feedback.getDetails().add(detail);
        }
        
        // 다른 풀이 예시 추가
        if (aiResponse.getAlternativeSolutions() != null && !aiResponse.getAlternativeSolutions().isEmpty()) {
            int solutionOrder = 0;
            for (AIFeedbackDTO.AlternativeSolutionDTO altSolDto : aiResponse.getAlternativeSolutions()) {
                AlternativeSolution altSolution = AlternativeSolution.builder()
                    .feedback(feedback)
                    .solutionCode(altSolDto.getCode())
                    .comment(altSolDto.getComment())
                    .displayOrder(solutionOrder++)
                    .build();
                feedback.getAlternativeSolutions().add(altSolution);
            }
        }
        
        submission.setFeedback(feedback);
        submission.setStatus(Submission.SubmissionStatus.COMPLETED);
        submissionRepository.save(submission);
    }

    @Transactional
    protected void markSubmissionAsFailed(Long submissionId) {
        submissionRepository.findById(submissionId).ifPresent(submission -> {
            submission.setStatus(Submission.SubmissionStatus.FAILED);
            submissionRepository.save(submission);
        });
    }

    public SubmissionStatusResponse getSubmissionStatus(Long submissionId, Long userId) {
        Submission submission = submissionRepository.findByIdAndUserId(submissionId, userId)
            .orElseThrow(() -> new ResourceNotFoundException("제출을 찾을 수 없습니다: " + submissionId));
        
        Integer progress = progressMap.getOrDefault(submissionId, 0);
        if (submission.getStatus() == Submission.SubmissionStatus.COMPLETED) {
            progress = 100;
        }
        
        return SubmissionStatusResponse.builder()
            .submissionId(submissionId)
            .status(submission.getStatus().name())
            .progress(progress)
            .build();
    }

    public SubmissionResponse getSubmission(Long submissionId, Long userId) {
        Submission submission = submissionRepository.findByIdAndUserId(submissionId, userId)
            .orElseThrow(() -> new ResourceNotFoundException("제출을 찾을 수 없습니다: " + submissionId));
        
        SubmissionResponse response = SubmissionResponse.from(submission);
        
        // 캐릭터 정보 채우기
        enrichCharacterInfo(response, submission.getCharacterId());
        
        if (submission.getFeedback() != null) {
            response.setFeedback(FeedbackResponse.from(submission.getFeedback()));
        }
        
        return response;
    }

    public Page<SubmissionResponse> getUserSubmissions(Long userId, Pageable pageable) {
        Page<Submission> submissions = submissionRepository
            .findByUserIdOrderBySubmittedAtDesc(userId, pageable);
        
        return submissions.map(submission -> {
            SubmissionResponse response = SubmissionResponse.from(submission);
            enrichCharacterInfo(response, submission.getCharacterId());
            return response;
        });
    }
    
    private void enrichCharacterInfo(SubmissionResponse response, String characterId) {
        try {
            com.codeacher.entity.Character character = characterService.findById(characterId);
            response.setCharacter(SubmissionResponse.CharacterInfo.builder()
                .id(character.getId())
                .name(character.getName())
                .emoji(character.getEmoji())
                .image(character.getImage())
                .build());
        } catch (Exception e) {
            log.warn("캐릭터 정보 조회 실패: {}", characterId, e);
            // 기본값 유지
        }
    }
}


