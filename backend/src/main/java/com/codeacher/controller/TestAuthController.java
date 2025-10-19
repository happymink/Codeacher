package com.codeacher.controller;

import com.codeacher.dto.response.ApiResponse;
import com.codeacher.dto.response.AuthResponse;
import com.codeacher.dto.response.UserResponse;
import com.codeacher.entity.User;
import com.codeacher.service.UserService;
import com.codeacher.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 테스트용 인증 컨트롤러
 * 개발 환경에서만 활성화됩니다.
 * 실제 Google OAuth 없이 JWT 토큰을 발급받을 수 있습니다.
 */
@Slf4j
@RestController
@RequestMapping("/api/test/auth")
@RequiredArgsConstructor
@Profile({"dev", "local", "default"})  // 프로덕션에서는 비활성화
public class TestAuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 테스트용 로그인 - 이메일로 사용자 조회 또는 생성 후 JWT 발급
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> testLogin(
            @RequestBody Map<String, String> request) {
        
        String email = request.getOrDefault("email", "test@example.com");
        String name = request.getOrDefault("name", "테스트 사용자");
        
        log.info("테스트 로그인 요청: email={}", email);
        
        User user;
        try {
            // 이메일로 사용자 찾기
            user = userService.findByEmail(email);
        } catch (Exception e) {
            // 없으면 새로 생성
            String googleId = "test_" + email.hashCode();
            user = userService.createUser(
                googleId, 
                email, 
                name, 
                "https://via.placeholder.com/150"
            );
            log.info("테스트 사용자 생성: {}", email);
        }

        String accessToken = jwtTokenProvider.createToken(user.getId(), user.getEmail());
        
        AuthResponse response = AuthResponse.builder()
            .accessToken(accessToken)
            .user(UserResponse.from(user))
            .build();

        log.info("테스트 JWT 토큰 발급: userId={}, email={}", user.getId(), user.getEmail());
        
        return ResponseEntity.ok(ApiResponse.success("테스트 로그인 성공", response));
    }

    /**
     * 간단한 테스트용 로그인 - GET 요청으로 기본 사용자 토큰 발급
     */
    @GetMapping("/token")
    public ResponseEntity<ApiResponse<Map<String, String>>> getTestToken(
            @RequestParam(defaultValue = "test@example.com") String email) {
        
        User user;
        try {
            user = userService.findByEmail(email);
        } catch (Exception e) {
            String googleId = "test_" + email.hashCode();
            user = userService.createUser(
                googleId, 
                email, 
                "테스트 사용자", 
                "https://via.placeholder.com/150"
            );
        }

        String accessToken = jwtTokenProvider.createToken(user.getId(), user.getEmail());
        
        Map<String, String> response = Map.of(
            "accessToken", accessToken,
            "userId", user.getId().toString(),
            "email", user.getEmail(),
            "message", "이 토큰을 Authorization: Bearer {token} 헤더에 사용하세요"
        );

        log.info("테스트 토큰 발급: userId={}, email={}", user.getId(), user.getEmail());
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}

