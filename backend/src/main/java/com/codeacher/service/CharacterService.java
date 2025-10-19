package com.codeacher.service;

import com.codeacher.dto.response.CharacterResponse;
import com.codeacher.entity.Character;
import com.codeacher.entity.CharacterDialogue;
import com.codeacher.exception.ResourceNotFoundException;
import com.codeacher.repository.CharacterDialogueRepository;
import com.codeacher.repository.CharacterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final CharacterDialogueRepository dialogueRepository;

    public List<CharacterResponse> getAllCharacters() {
        List<Character> characters = characterRepository.findByIsActiveTrue();
        return characters.stream()
            .map(this::toCharacterResponse)
            .collect(Collectors.toList());
    }

    public CharacterResponse getCharacterById(String characterId) {
        Character character = findById(characterId);
        return toCharacterResponse(character);
    }
    
    public Character findById(String characterId) {
        return characterRepository.findById(characterId)
            .orElseThrow(() -> new ResourceNotFoundException("캐릭터를 찾을 수 없습니다: " + characterId));
    }

    private CharacterResponse toCharacterResponse(Character character) {
        Map<String, List<String>> dialogues = getDialoguesForCharacter(character.getId());
        return CharacterResponse.from(character, dialogues);
    }

    private Map<String, List<String>> getDialoguesForCharacter(String characterId) {
        List<CharacterDialogue> allDialogues = dialogueRepository
            .findByCharacterIdOrderByOrderIndexAsc(characterId);
        
        return Map.of(
            "loading", filterDialoguesByPhase(allDialogues, CharacterDialogue.DialoguePhase.LOADING),
            "analyzing", filterDialoguesByPhase(allDialogues, CharacterDialogue.DialoguePhase.ANALYZING),
            "complete", filterDialoguesByPhase(allDialogues, CharacterDialogue.DialoguePhase.COMPLETE)
        );
    }

    private List<String> filterDialoguesByPhase(List<CharacterDialogue> dialogues, 
                                                  CharacterDialogue.DialoguePhase phase) {
        return dialogues.stream()
            .filter(d -> d.getPhase() == phase)
            .map(CharacterDialogue::getDialogue)
            .collect(Collectors.toList());
    }
}


