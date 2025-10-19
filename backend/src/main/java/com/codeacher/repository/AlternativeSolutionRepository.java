package com.codeacher.repository;

import com.codeacher.entity.AlternativeSolution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlternativeSolutionRepository extends JpaRepository<AlternativeSolution, Long> {
    List<AlternativeSolution> findByFeedbackIdOrderByDisplayOrder(Long feedbackId);
}

