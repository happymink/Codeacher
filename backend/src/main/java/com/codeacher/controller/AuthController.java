package com.codeacher.controller;

import com.codeacher.dto.request.GoogleLoginRequest;
import com.codeacher.dto.response.ApiResponse;
import com.codeacher.dto.response.AuthResponse;
import com.codeacher.dto.response.UserResponse;
import com.codeacher.entity.User;
import com.codeacher.service.UserService;
import com.codeacher.util.JwtTokenProvider;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @PostMapping("/google")
    public ResponseEntity<ApiResponse<AuthResponse>> googleLogin(
            @Valid @RequestBody GoogleLoginRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getCredential());
            if (idToken == null) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid Google token"));
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String googleId = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");

            User user;
            if (userService.existsByGoogleId(googleId)) {
                user = userService.findByGoogleId(googleId);
            } else {
                user = userService.createUser(googleId, email, name, pictureUrl);
                log.info("새 사용자 생성: {}", email);
            }

            String accessToken = jwtTokenProvider.createToken(user.getId(), user.getEmail());
            
            AuthResponse response = AuthResponse.builder()
                .accessToken(accessToken)
                .user(UserResponse.from(user))
                .build();

            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (Exception e) {
            log.error("Google 로그인 실패", e);
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Google 로그인에 실패했습니다"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        UserResponse user = userService.getUserInfo(userId);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        return ResponseEntity.ok(ApiResponse.success("로그아웃 성공", null));
    }
}


