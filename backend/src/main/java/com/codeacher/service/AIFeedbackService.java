package com.codeacher.service;

import com.codeacher.dto.AIFeedbackDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.service.OpenAiService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIFeedbackService {

    @Value("${openai.api-key}")
    private String apiKey;

    @Value("${openai.model:gpt-4}")
    private String model;

    @Value("${openai.max-tokens:2000}")
    private Integer maxTokens;

    @Value("${openai.temperature:0.7}")
    private Double temperature;
    
    @Value("${openai.use-mock:false}")
    private Boolean useMock;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public AIFeedbackDTO generateFeedback(String problemUrl, String userCode, String characterId) {
        // URL에서 문제 정보 추출
        ProblemInfo problemInfo = extractProblemInfo(problemUrl);
        String detectedLanguage = detectLanguage(userCode);
        
        log.info("추출된 문제 정보: site={}, number={}, title={}, language={}", 
                problemInfo.getSite(), problemInfo.getNumber(), problemInfo.getTitle(), detectedLanguage);
        // Mock 모드 체크
        if (useMock || "dummy-openai-key".equals(apiKey)) {
            log.info("Mock 피드백 생성 모드");
            return createMockFeedback(problemInfo.getSite(), problemInfo.getNumber(), userCode, characterId);
        }
        
        try {
            OpenAiService service = new OpenAiService(apiKey, Duration.ofSeconds(60));
            
            String systemPrompt = buildSystemPrompt(characterId, detectedLanguage);
            String userPrompt = buildUserPrompt(problemUrl, problemInfo, userCode);
            
            List<ChatMessage> messages = new ArrayList<>();
            messages.add(new ChatMessage(ChatMessageRole.SYSTEM.value(), systemPrompt));
            messages.add(new ChatMessage(ChatMessageRole.USER.value(), userPrompt));
            
            ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model(model)
                .messages(messages)
                .maxTokens(maxTokens)
                .temperature(temperature)
                .build();
            
            String response = service.createChatCompletion(request)
                .getChoices().get(0).getMessage().getContent();
            
            log.info("AI 피드백 생성 완료: {}", response.substring(0, Math.min(100, response.length())));
            
            // JSON 파싱
            return objectMapper.readValue(response, AIFeedbackDTO.class);
            
        } catch (Exception e) {
            log.error("AI 피드백 생성 실패", e);
            return createFallbackFeedback();
        }
    }

    private String buildSystemPrompt(String characterId, String detectedLanguage) {
        String characterPersonality = getCharacterPersonality(characterId);
        
        return String.format("""
            너는 코딩테스트 전문 튜터입니다. %s
            
            역할: 사용자의 코드를 분석하고 건설적인 피드백을 제공합니다.
            사용자가 %s 언어로 코드를 작성했습니다.
            
            응답 형식: 반드시 아래 JSON 형식으로만 응답해주세요.
            {
              "problemType": "문제 유형 (예: DFS, DP, 구현, 그리디, BFS, 정렬, 이분탐색 등)",
              "overallFeedback": "전반적인 피드백 (150자 이내, 긍정적이고 격려하는 톤)",
              "feedbacks": [
                "구체적 피드백 1 (코드의 좋은 점)",
                "구체적 피드백 2 (개선 가능한 점)",
                "구체적 피드백 3 (추가 고려사항)"
              ],
              "keyPoints": [
                "핵심 개념 1",
                "핵심 개념 2",
                "핵심 개념 3"
              ],
              "warnings": [
                "주의 사항 1 (엣지케이스, 성능 등)",
                "주의 사항 2"
              ],
              "timeComplexity": "시간 복잡도 분석 (예: O(N), O(N log N))",
              "spaceComplexity": "공간 복잡도 분석 (예: O(N), O(1))",
              "alternativeApproach": "대안적 접근법 (선택사항, 더 나은 방법이 있다면)",
              "alternativeSolutions": [
                {
                  "code": "다른 풀이 코드 1 (사용자의 코드와 다른 접근법)",
                  "comment": "이 풀이의 특징과 사용자 코드와의 차이점, 장점을 1-2줄로 설명"
                },
                {
                  "code": "다른 풀이 코드 2 (선택사항)",
                  "comment": "이 풀이의 특징과 장점을 1-2줄로 설명"
                }
              ]
            }
            
            요구사항:
            1. 반드시 위 JSON 형식으로만 응답할 것
            2. 긍정적이고 건설적인 톤 유지
            3. 초보자도 이해할 수 있도록 설명
            4. 한국어로 응답
            5. alternativeSolutions는 1~2개의 다른 풀이를 제공 (최대 3개 미만)
            6. 각 다른 풀이의 comment는 핵심적인 차이점과 장점만 간단히 1-2줄로 작성
            """, characterPersonality, detectedLanguage);
    }

    private String getCharacterPersonality(String characterId) {
        return switch (characterId) {
            case "cody" -> "당신은 논리적이고 체계적인 분석가 '코디봇'입니다. 알고리즘 효율성과 복잡도 분석에 강합니다.";
            case "owl" -> "당신은 지혜롭고 차분한 '알고 선생님'입니다. 개념 설명과 이론에 탁월합니다.";
            case "debuggy" -> "당신은 꼼꼼하고 디테일한 '디버기'입니다. 버그와 엣지케이스 찾기의 달인입니다.";
            case "speedy" -> "당신은 에너제틱한 '스피디'입니다. 성능 최적화와 속도 개선에 집중합니다.";
            case "coco" -> "당신은 친근하고 격려를 잘하는 '코코'입니다. 초보자에게 친절하게 설명합니다.";
            case "cube" -> "당신은 전문가 스타일의 '프로페서 큐브'입니다. 심층 분석과 전문적 피드백을 제공합니다.";
            default -> "당신은 친절한 코딩 튜터입니다.";
        };
    }

    private String buildUserPrompt(String problemUrl, ProblemInfo problemInfo, String userCode) {
        return String.format("""
            문제 URL: %s
            문제 출처: %s
            문제 번호: %s
            
            위 URL을 참고하여 문제의 제목이나 내용을 파악하고, 사용자 코드를 분석해주세요.
            
            사용자 답안 코드:
            ```
            %s
            ```
            
            위 코드를 분석하여 JSON 형식으로 피드백을 제공해주세요.
            """, problemUrl, problemInfo.getSite(), problemInfo.getNumber(), userCode);
    }

    private AIFeedbackDTO createMockFeedback(String problemSite, String problemNumber, 
                                              String userCode, String characterId) {
        log.info("Mock 피드백 생성: {}-{}, 캐릭터: {}", problemSite, problemNumber, characterId);
        
        AIFeedbackDTO feedback = new AIFeedbackDTO();
        feedback.setProblemType("구현");
        feedback.setOverallFeedback(
            "코드는 잘 작성되었고, 주어진 두 수를 더하는 기본적인 기능을 수행하고 있습니다. 계속 열심히 하세요!"
        );
        
        feedback.setFeedbacks(List.of(
            "Scanner를 이용해 입력을 받고, 두 수를 더해 출력하는 부분이 잘 구현되어 있습니다.",
            "클래스와 메소드를 활용한 객체지향적인 프로그래밍 스타일을 더 연습해보세요.",
            "입력 값이 주어지는 범위나 조건에 대한 예외 처리를 추가하는 것이 좋을 것 같습니다."
        ));
        
        feedback.setKeyPoints(List.of(
            "입출력 처리 방법",
            "기본적인 산술 연산",
            "자바의 기본 문법 활용"
        ));
        
        feedback.setWarnings(List.of(
            "입력 값이 주어지는 범위 및 조건에 대한 예외 처리가 필요합니다."
        ));
        
        feedback.setTimeComplexity("시간 복잡도: O(1)");
        feedback.setSpaceComplexity("공간 복잡도: O(1)");
        feedback.setAlternativeApproach(null);
        
        // 다른 풀이 예시 추가
        List<AIFeedbackDTO.AlternativeSolutionDTO> alternativeSolutions = new ArrayList<>();
        
        AIFeedbackDTO.AlternativeSolutionDTO solution1 = new AIFeedbackDTO.AlternativeSolutionDTO();
        solution1.setCode("import java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String[] input = br.readLine().split(\" \");\n        int a = Integer.parseInt(input[0]);\n        int b = Integer.parseInt(input[1]);\n        System.out.println(a + b);\n    }\n}");
        solution1.setComment("BufferedReader를 사용하여 더 빠른 입력 처리가 가능합니다. Scanner보다 성능이 우수합니다.");
        alternativeSolutions.add(solution1);
        
        AIFeedbackDTO.AlternativeSolutionDTO solution2 = new AIFeedbackDTO.AlternativeSolutionDTO();
        solution2.setCode("import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(sc.nextInt() + sc.nextInt());\n        sc.close();\n    }\n}");
        solution2.setComment("더 간결한 코드로 작성할 수 있습니다. Scanner를 사용 후 close() 메서드로 자원을 반환하는 것이 좋습니다.");
        alternativeSolutions.add(solution2);
        
        feedback.setAlternativeSolutions(alternativeSolutions);
        
        return feedback;
    }
    
    private String getCharacterName(String characterId) {
        return switch (characterId) {
            case "cody" -> "코디봇";
            case "owl" -> "알고 선생님";
            case "debuggy" -> "디버기";
            case "speedy" -> "스피디";
            case "coco" -> "코코";
            case "cube" -> "프로페서 큐브";
            default -> "코딩 튜터";
        };
    }
    
    private AIFeedbackDTO createFallbackFeedback() {
        AIFeedbackDTO feedback = new AIFeedbackDTO();
        feedback.setProblemType("기타");
        feedback.setOverallFeedback("코드를 제출해주셔서 감사합니다. 현재 AI 분석이 일시적으로 불가능합니다. 나중에 다시 시도해주세요.");
        feedback.setFeedbacks(List.of("코드가 제출되었습니다."));
        feedback.setKeyPoints(List.of("문제를 해결하려는 노력이 훌륭합니다."));
        feedback.setWarnings(List.of());
        feedback.setTimeComplexity("분석 불가");
        feedback.setSpaceComplexity("분석 불가");
        feedback.setAlternativeApproach(null);
        return feedback;
    }
    
    // ProblemInfo 내부 클래스
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProblemInfo {
        private String site;
        private String number;
        private String title;
    }
    
    // URL에서 문제 정보 추출 (public으로 변경하여 다른 서비스에서 사용)
    public ProblemInfo extractProblemInfo(String problemUrl) {
        try {
            // 백준 (acmicpc.net)
            if (problemUrl.contains("acmicpc.net")) {
                Pattern pattern = Pattern.compile("/problem/(\\d+)");
                Matcher matcher = pattern.matcher(problemUrl);
                if (matcher.find()) {
                    return new ProblemInfo("BAEKJOON", matcher.group(1), "");
                }
            }
            
            // 프로그래머스
            if (problemUrl.contains("programmers.co.kr")) {
                Pattern pattern = Pattern.compile("/learn/courses/\\d+/lessons/(\\d+)");
                Matcher matcher = pattern.matcher(problemUrl);
                if (matcher.find()) {
                    return new ProblemInfo("PROGRAMMERS", matcher.group(1), "");
                }
            }
            
            // 리트코드
            if (problemUrl.contains("leetcode.com")) {
                Pattern pattern = Pattern.compile("/problems/([^/]+)");
                Matcher matcher = pattern.matcher(problemUrl);
                if (matcher.find()) {
                    String slug = matcher.group(1);
                    return new ProblemInfo("LEETCODE", slug.replace("-", " "), "");
                }
            }
            
            // 코드포스
            if (problemUrl.contains("codeforces.com")) {
                Pattern pattern = Pattern.compile("/problemset/problem/(\\d+)/([A-Z])");
                Matcher matcher = pattern.matcher(problemUrl);
                if (matcher.find()) {
                    return new ProblemInfo("CODEFORCES", matcher.group(1) + matcher.group(2), "");
                }
            }
            
            // 기본값
            return new ProblemInfo("ETC", "UNKNOWN", "");
            
        } catch (Exception e) {
            log.error("URL 파싱 실패: {}", problemUrl, e);
            return new ProblemInfo("ETC", "UNKNOWN", "");
        }
    }
    
    // 코드에서 프로그래밍 언어 감지 (public으로 변경하여 다른 서비스에서 사용)
    public String detectLanguage(String userCode) {
        if (userCode == null || userCode.trim().isEmpty()) {
            return "UNKNOWN";
        }
        
        String code = userCode.toLowerCase().trim();
        
        // Java 감지
        if (code.contains("public class") || code.contains("import java.") || 
            code.contains("system.out.println")) {
            return "JAVA";
        }
        
        // Python 감지
        if (code.contains("def ") || code.contains("import ") && 
            (code.contains("numpy") || code.contains("sys") || code.contains("input()"))) {
            return "PYTHON";
        }
        
        // JavaScript 감지
        if (code.contains("function") || code.contains("const ") || 
            code.contains("let ") || code.contains("var ") || code.contains("console.log")) {
            return "JAVASCRIPT";
        }
        
        // C++ 감지
        if (code.contains("#include") || code.contains("using namespace") || 
            code.contains("std::") || code.contains("cout") || code.contains("cin")) {
            return "CPP";
        }
        
        // C 감지
        if (code.contains("#include") && code.contains("stdio.h") && 
            !code.contains("using namespace")) {
            return "C";
        }
        
        // Kotlin 감지
        if (code.contains("fun ") || code.contains("package ") && 
            code.contains("println")) {
            return "KOTLIN";
        }
        
        // Swift 감지
        if (code.contains("import Swift") || code.contains("func ") && 
            code.contains("print(")) {
            return "SWIFT";
        }
        
        // Go 감지
        if (code.contains("package main") || code.contains("func main()") || 
            code.contains("import \"fmt\"")) {
            return "GO";
        }
        
        return "UNKNOWN";
    }
}


