package com.codeacher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CodeacherApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeacherApplication.class, args);
    }
}



