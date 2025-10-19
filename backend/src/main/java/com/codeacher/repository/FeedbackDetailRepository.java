package com.codeacher.repository;

import com.codeacher.entity.FeedbackDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackDetailRepository extends JpaRepository<FeedbackDetail, Long> {
    List<FeedbackDetail> findByFeedbackIdOrderByOrderIndexAsc(Long feedbackId);
    List<FeedbackDetail> findByFeedbackIdAndCategoryOrderByOrderIndexAsc(
        Long feedbackId, 
        FeedbackDetail.FeedbackCategory category
    );
}


