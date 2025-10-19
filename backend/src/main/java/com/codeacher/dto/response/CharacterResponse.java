package com.codeacher.dto.response;

import com.codeacher.entity.Character;
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
public class CharacterResponse {
    private String id;
    private String name;
    private String emoji;
    private String image;
    private String description;
    private String specialty;
    private String colorTheme;
    private String personality;
    private Map<String, List<String>> dialogues;
    
    public static CharacterResponse from(Character character, Map<String, List<String>> dialogues) {
        return CharacterResponse.builder()
            .id(character.getId())
            .name(character.getName())
            .emoji(character.getEmoji())
            .image(character.getImage())
            .description(character.getDescription())
            .specialty(character.getSpecialty())
            .colorTheme(character.getColorTheme())
            .personality(character.getPersonality())
            .dialogues(dialogues)
            .build();
    }
}


