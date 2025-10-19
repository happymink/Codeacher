package com.codeacher.service;

import com.codeacher.dto.response.UserResponse;
import com.codeacher.entity.User;
import com.codeacher.exception.ResourceNotFoundException;
import com.codeacher.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public User findById(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다: " + userId));
    }

    public User findByGoogleId(String googleId) {
        return userRepository.findByGoogleId(googleId)
            .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다: " + googleId));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다: " + email));
    }

    @Transactional
    public User createUser(String googleId, String email, String name, String profileImageUrl) {
        User user = User.builder()
            .googleId(googleId)
            .email(email)
            .name(name)
            .profileImageUrl(profileImageUrl)
            .selectedCharacter("cody")
            .build();
        
        return userRepository.save(user);
    }

    @Transactional
    public UserResponse selectCharacter(Long userId, String characterId) {
        User user = findById(userId);
        user.setSelectedCharacter(characterId);
        User savedUser = userRepository.save(user);
        log.info("사용자 {}의 캐릭터를 {}로 변경했습니다", userId, characterId);
        return UserResponse.from(savedUser);
    }

    public UserResponse getUserInfo(Long userId) {
        User user = findById(userId);
        return UserResponse.from(user);
    }

    public boolean existsByGoogleId(String googleId) {
        return userRepository.existsByGoogleId(googleId);
    }
}


