package com.codeacher.repository;

import com.codeacher.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, String> {
    List<Character> findByIsActiveTrue();
}



