package com.codeacher.dto.response;

import com.codeacher.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String name;
    private String profileImage;
    private String selectedCharacter;
    
    public static UserResponse from(User user) {
        return UserResponse.builder()
            .id(user.getId())
            .email(user.getEmail())
            .name(user.getName())
            .profileImage(user.getProfileImageUrl())
            .selectedCharacter(user.getSelectedCharacter())
            .build();
    }
}


