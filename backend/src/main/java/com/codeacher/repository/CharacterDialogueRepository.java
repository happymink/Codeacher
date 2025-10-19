package com.codeacher.repository;

import com.codeacher.entity.Character;
import com.codeacher.entity.CharacterDialogue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterDialogueRepository extends JpaRepository<CharacterDialogue, Long> {
    List<CharacterDialogue> findByCharacterIdOrderByOrderIndexAsc(String characterId);
    List<CharacterDialogue> findByCharacterIdAndPhaseOrderByOrderIndexAsc(
        String characterId, 
        CharacterDialogue.DialoguePhase phase
    );
}


