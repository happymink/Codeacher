package com.codeacher.controller;

import com.codeacher.dto.response.ApiResponse;
import com.codeacher.dto.response.CharacterResponse;
import com.codeacher.dto.response.UserResponse;
import com.codeacher.service.CharacterService;
import com.codeacher.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/characters")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CharacterResponse>>> getAllCharacters() {
        List<CharacterResponse> characters = characterService.getAllCharacters();
        return ResponseEntity.ok(ApiResponse.success(characters));
    }

    @GetMapping("/{characterId}")
    public ResponseEntity<ApiResponse<CharacterResponse>> getCharacter(
            @PathVariable String characterId) {
        CharacterResponse character = characterService.getCharacterById(characterId);
        return ResponseEntity.ok(ApiResponse.success(character));
    }

    @GetMapping("/current")
    public ResponseEntity<ApiResponse<CharacterResponse>> getCurrentCharacter(
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        UserResponse user = userService.getUserInfo(userId);
        CharacterResponse character = characterService.getCharacterById(user.getSelectedCharacter());
        return ResponseEntity.ok(ApiResponse.success(character));
    }

    @PutMapping("/select/{characterId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> selectCharacter(
            Authentication authentication,
            @PathVariable String characterId) {
        Long userId = (Long) authentication.getPrincipal();
        UserResponse user = userService.selectCharacter(userId, characterId);
        CharacterResponse character = characterService.getCharacterById(characterId);
        
        Map<String, Object> response = Map.of(
            "message", "캐릭터가 변경되었습니다",
            "selectedCharacter", Map.of(
                "id", character.getId(),
                "name", character.getName(),
                "emoji", character.getEmoji()
            )
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}


