package com.codeacher.repository;

import com.codeacher.entity.Submission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    
    Page<Submission> findByUserIdOrderBySubmittedAtDesc(Long userId, Pageable pageable);
    
    List<Submission> findByUserIdAndStatusOrderBySubmittedAtDesc(
        Long userId, 
        Submission.SubmissionStatus status
    );
    
    Optional<Submission> findByIdAndUserId(Long id, Long userId);
    
    @Query("SELECT COUNT(s) FROM Submission s WHERE s.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT s.problemType, COUNT(s) FROM Submission s " +
           "WHERE s.user.id = :userId AND s.status = 'COMPLETED' " +
           "GROUP BY s.problemType")
    List<Object[]> countByProblemTypeForUser(@Param("userId") Long userId);
    
    @Query("SELECT s.problemSite, COUNT(s) FROM Submission s " +
           "WHERE s.user.id = :userId AND s.status = 'COMPLETED' " +
           "GROUP BY s.problemSite")
    List<Object[]> countByProblemSiteForUser(@Param("userId") Long userId);
    
    @Query("SELECT s FROM Submission s WHERE s.user.id = :userId " +
           "AND s.submittedAt BETWEEN :startDate AND :endDate " +
           "ORDER BY s.submittedAt DESC")
    List<Submission> findByUserIdAndDateRange(
        @Param("userId") Long userId,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
}


