package com.codeacher.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionRequest {
    
    @NotBlank(message = "Problem URL is required")
    private String problemUrl;
    
    @NotBlank(message = "User code is required")
    private String userCode;
    
    @NotBlank(message = "Character ID is required")
    private String characterId;
}


