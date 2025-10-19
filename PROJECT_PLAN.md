# Codeacher 프로젝트 계획서

## 📋 프로젝트 개요

**Codeacher**는 AI를 활용한 코딩테스트 피드백 선생님 프로그램입니다. 사용자가 온라인 저지 사이트의 문제를 풀고 제출하면, AI가 답안을 분석하여 피드백, 중요 개념, 주의 사항을 제공하고, 학습 진척도를 추적할 수 있는 서비스입니다.

### 참고 프로젝트
- https://github.com/happymink/daliyCodingTest

---

## 🎯 핵심 기능

### 1. 답안 제출 및 AI 피드백
- 코딩테스트 문제 정보 입력 (사이트, 문제번호)
- 사용자 답안 코드 제출
- AI 기반 실시간 피드백 제공

### 2. 문제풀이 내역 관리
- 과거 제출 문제 및 답안 조회
- 카드 형식의 직관적인 UI
- 문제별 AI 피드백 열람

### 3. 학습 분석 대시보드
- 푼 문제 유형 분석
- 부족한 문제 유형 파악
- 일/월간 통계 시각화
- 오답노트 및 약점 분석

---

## 🛠 기술 스택 선정 및 이유

### Frontend

**선택: React 18 + TypeScript + Vite**

**이유:**
- **React**: 컴포넌트 기반 아키텍처로 재사용 가능한 UI 구성 (카드 목록, 통계 차트 등)
- **TypeScript**: 타입 안정성으로 백엔드 API 인터페이스와의 통신 오류 최소화
- **Vite**: 빠른 개발 서버와 HMR(Hot Module Replacement)로 개발 생산성 향상

**주요 라이브러리:**
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.0",  // SPA 라우팅
  "axios": "^1.6.0",               // HTTP 클라이언트
  "react-query": "^3.39.3",        // 서버 상태 관리
  "recharts": "^2.10.0",           // 통계 차트 시각화
  "@mui/material": "^5.15.0",      // UI 컴포넌트 라이브러리
  "react-syntax-highlighter": "^15.5.0",  // 코드 하이라이팅
  "react-google-login": "^5.2.2"   // 구글 로그인
}
```

---

### Backend

**선택: Spring Boot 3.2 + Java 17**

**이유:**
- **Spring Boot**: 엔터프라이즈급 안정성과 풍부한 생태계
- **Spring Security**: 구글 OAuth 2.0 통합이 용이
- **Spring Data JPA**: 데이터베이스 작업 추상화 및 생산성 향상
- **Java 17**: LTS 버전으로 최신 기능과 성능 개선

**주요 의존성:**
```xml
<!-- Spring Boot Starter -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Security + OAuth2 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>

<!-- JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<!-- OpenAI API Client -->
<dependency>
    <groupId>com.theokanning.openai-gpt3-java</groupId>
    <artifactId>service</artifactId>
    <version>0.18.2</version>
</dependency>
```

---

### Database

**선택: PostgreSQL 15**

**이유:**
- **JSON 지원**: AI 피드백 데이터를 유연하게 저장 (피드백1, 피드백2... 가변 길이)
- **Full-text Search**: 문제 검색 기능 구현 시 유용
- **안정성**: 오픈소스 관계형 DB 중 가장 강력한 ACID 보장
- **확장성**: 향후 대용량 데이터 처리 용이

**대안: MySQL 8.0**
- 더 간단한 설정과 널리 알려진 사용성
- JSON 타입 지원

---

### AI API

**선택: OpenAI GPT-4 API**

**이유:**
- **코드 이해 능력**: 프로그래밍 언어 분석 및 피드백에 탁월
- **구조화된 응답**: 프롬프트 엔지니어링으로 파싱 가능한 형식 출력
- **안정적인 API**: 공식 SDK 및 문서 완비

**프롬프트 전략:**
```
역할: 너는 코딩테스트 전문 튜터야.

입력:
- 문제 출처: [사이트명]
- 문제 번호: [번호]
- 사용자 답안: [코드]

출력 형식 (JSON):
{
  "problemType": "문제 유형 (예: DFS, DP, 구현, 그리디 등)",
  "overallFeedback": "전반적인 피드백 (150자 이내)",
  "feedbacks": [
    "구체적 피드백 1",
    "구체적 피드백 2",
    "구체적 피드백 3"
  ],
  "keyPoints": [
    "중요 개념 1",
    "중요 개념 2"
  ],
  "warnings": [
    "주의 사항 1",
    "주의 사항 2"
  ],
  "timeComplexity": "시간 복잡도 분석",
  "spaceComplexity": "공간 복잡도 분석",
  "alternativeApproach": "대안적 접근법 (선택)"
}

요구사항:
1. 반드시 위 JSON 형식으로만 응답할 것
2. 긍정적이고 건설적인 톤 유지
3. 초보자도 이해할 수 있도록 설명
```

---

### 인증

**선택: Google OAuth 2.0**

**이유:**
- 별도 회원가입 절차 불필요
- 구글 계정으로 간편 로그인
- Spring Security와 통합 용이

---

## 📊 데이터베이스 스키마 설계

### ERD 구조

```
users (사용자)
├─ id (PK)
├─ google_id (UK)
├─ email
├─ name
├─ profile_image_url
├─ created_at
└─ updated_at

submissions (제출 내역)
├─ id (PK)
├─ user_id (FK -> users.id)
├─ problem_site (문제 사이트)
├─ problem_number (문제 번호)
├─ problem_title (문제 제목, nullable)
├─ problem_type (문제 유형: DFS, DP, 구현 등)
├─ user_code (사용자 답안 코드, TEXT)
├─ language (사용 언어: Java, Python 등)
├─ submitted_at
└─ updated_at

feedbacks (AI 피드백)
├─ id (PK)
├─ submission_id (FK -> submissions.id)
├─ overall_feedback (전반적 피드백)
├─ time_complexity (시간 복잡도)
├─ space_complexity (공간 복잡도)
├─ alternative_approach (대안적 접근, TEXT, nullable)
├─ created_at
└─ updated_at

feedback_details (세부 피드백)
├─ id (PK)
├─ feedback_id (FK -> feedbacks.id)
├─ category (카테고리: FEEDBACK, KEY_POINT, WARNING)
├─ content (내용, TEXT)
└─ order_index (순서)

statistics (통계 캐시)
├─ id (PK)
├─ user_id (FK -> users.id)
├─ period_type (DAILY, WEEKLY, MONTHLY)
├─ period_date (집계 기준일)
├─ total_submissions (총 제출 수)
├─ problem_type_distribution (JSON: 문제 유형별 분포)
├─ weak_areas (JSON: 약점 영역)
└─ updated_at
```

### 인덱스 전략
- `users.google_id`: 로그인 조회 성능
- `submissions.user_id, submitted_at`: 사용자별 제출 내역 조회
- `submissions.problem_type`: 유형별 통계
- `feedback_details.feedback_id, category, order_index`: 피드백 조회

---

## 🏗 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Submit Page  │  │ History Page │  │Dashboard Page│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS / REST API
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Backend (Spring Boot)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Controller Layer                         │   │
│  │  - AuthController (로그인)                            │   │
│  │  - SubmissionController (제출)                        │   │
│  │  - StatisticsController (통계)                        │   │
│  └────────────────┬─────────────────────────────────────┘   │
│  ┌────────────────▼─────────────────────────────────────┐   │
│  │              Service Layer                            │   │
│  │  - UserService                                        │   │
│  │  - SubmissionService                                  │   │
│  │  - AIFeedbackService (AI API 통신)                   │   │
│  │  - StatisticsService                                  │   │
│  └────────────────┬─────────────────────────────────────┘   │
│  ┌────────────────▼─────────────────────────────────────┐   │
│  │              Repository Layer (JPA)                   │   │
│  │  - UserRepository                                     │   │
│  │  - SubmissionRepository                               │   │
│  │  - FeedbackRepository                                 │   │
│  └────────────────┬─────────────────────────────────────┘   │
└───────────────────┼─────────────────┬─────────────────────┬─┘
                    │                 │                     │
                    │                 │                     │
         ┌──────────▼──────┐   ┌──────▼──────────┐   ┌────▼─────┐
         │   PostgreSQL    │   │  OpenAI GPT-4   │   │  Google  │
         │    Database     │   │      API        │   │  OAuth   │
         └─────────────────┘   └─────────────────┘   └──────────┘
```

---

## 🔄 API 설계

### 1. 인증 API

#### `POST /api/auth/google`
구글 OAuth 로그인
```json
Request:
{
  "credential": "google_oauth_token"
}

Response:
{
  "accessToken": "jwt_token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "홍길동",
    "profileImage": "https://..."
  }
}
```

---

### 2. 제출 API

#### `POST /api/submissions`
답안 제출 및 AI 피드백 요청
```json
Request:
{
  "problemSite": "백준",
  "problemNumber": "1234",
  "problemTitle": "DFS와 BFS", // optional
  "language": "Java",
  "userCode": "public class Main { ... }"
}

Response:
{
  "submissionId": 123,
  "feedback": {
    "overallFeedback": "전반적으로 잘 작성된 코드입니다...",
    "problemType": "DFS",
    "feedbacks": [
      "visited 배열을 활용한 점이 좋습니다",
      "재귀 종료 조건을 명확히 했습니다"
    ],
    "keyPoints": [
      "깊이 우선 탐색의 기본 원리",
      "스택/재귀를 통한 구현"
    ],
    "warnings": [
      "스택 오버플로우 주의",
      "방문 체크 누락 방지"
    ],
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)"
  }
}
```

#### `GET /api/submissions`
제출 내역 조회 (페이징)
```json
Query Parameters:
- page: 0 (default)
- size: 20 (default)
- sort: submittedAt,desc (default)

Response:
{
  "content": [
    {
      "id": 123,
      "problemSite": "백준",
      "problemNumber": "1234",
      "problemType": "DFS",
      "submittedAt": "2025-10-15T10:30:00",
      "feedbackSummary": "전반적으로 잘 작성된..."
    }
  ],
  "totalElements": 50,
  "totalPages": 3,
  "currentPage": 0
}
```

#### `GET /api/submissions/{id}`
특정 제출 상세 조회
```json
Response:
{
  "id": 123,
  "problemSite": "백준",
  "problemNumber": "1234",
  "problemTitle": "DFS와 BFS",
  "problemType": "DFS",
  "language": "Java",
  "userCode": "public class Main { ... }",
  "submittedAt": "2025-10-15T10:30:00",
  "feedback": {
    "overallFeedback": "...",
    "feedbacks": [...],
    "keyPoints": [...],
    "warnings": [...],
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)"
  }
}
```

---

### 3. 통계 API

#### `GET /api/statistics/summary`
전체 통계 요약
```json
Response:
{
  "totalSubmissions": 50,
  "problemTypeDistribution": {
    "DFS": 10,
    "BFS": 8,
    "DP": 15,
    "구현": 12,
    "그리디": 5
  },
  "weeklyProgress": [
    { "date": "2025-10-08", "count": 3 },
    { "date": "2025-10-09", "count": 5 },
    { "date": "2025-10-10", "count": 2 }
  ],
  "weakAreas": ["DP", "그리디"]
}
```

#### `GET /api/statistics/monthly`
월간 통계
```json
Query Parameters:
- year: 2025
- month: 10

Response:
{
  "year": 2025,
  "month": 10,
  "totalSubmissions": 25,
  "dailySubmissions": [
    { "day": 1, "count": 2 },
    { "day": 2, "count": 1 },
    ...
  ],
  "problemTypeDistribution": { ... }
}
```

#### `GET /api/statistics/weak-areas`
약점 분석
```json
Response:
{
  "weakAreas": [
    {
      "problemType": "DP",
      "totalAttempts": 5,
      "averageFeedbackScore": 65.5,
      "commonIssues": [
        "메모이제이션 미활용",
        "점화식 도출 어려움"
      ],
      "recommendedProblems": [
        { "site": "백준", "number": "2579" },
        { "site": "백준", "number": "1463" }
      ]
    }
  ]
}
```

---

## 📱 프론트엔드 페이지 구조

### 1. 로그인 페이지 (`/login`)
```
┌────────────────────────────────────┐
│         Codeacher Logo             │
│    AI 코딩테스트 피드백 선생님      │
│                                    │
│   [ Google로 로그인하기 ]  🔐      │
└────────────────────────────────────┘
```

### 2. 답안 제출 페이지 (`/submit`)
```
┌────────────────────────────────────┐
│  어떤 문제를 풀고 계세요?           │
│  [사이트 선택 ▼] [문제 번호 ____]  │
│  [언어 선택: Java ▼]               │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  // 코드를 입력하세요         │ │
│  │  public class Main {         │ │
│  │                              │ │
│  │  }                           │ │
│  └──────────────────────────────┘ │
│                                    │
│         [ 제출하고 피드백 받기 ]   │
└────────────────────────────────────┘
```

### 3. 문제풀이 내역 페이지 (`/history`)
```
┌────────────────────────────────────────────┐
│  나의 문제풀이 내역                         │
│  ┌────────┬────────┬────────┬────────┐    │
│  │ [Card] │ [Card] │ [Card] │ [Card] │    │
│  │  DFS   │   DP   │  구현  │  BFS   │    │
│  │ #1234  │ #5678  │ #9012  │ #3456  │    │
│  │ 백준   │ 백준   │프로그래│ 백준   │    │
│  │10/15   │10/14   │ 머스   │10/13   │    │
│  └────────┴────────┴────────┴────────┘    │
│                                            │
│  [ 더보기... ]                             │
└────────────────────────────────────────────┘
```

### 4. 통계 대시보드 (`/dashboard`)
```
┌─────────────────────────────────────────────┐
│  나의 학습 대시보드                          │
│  ┌─────────────────┐  ┌────────────────┐   │
│  │  이번 주 제출   │  │  이번 달 제출  │   │
│  │      7개        │  │     25개       │   │
│  └─────────────────┘  └────────────────┘   │
│                                             │
│  문제 유형별 분포                            │
│  ┌─────────────────────────────────────┐   │
│  │     [파이 차트]                     │   │
│  │   DFS: 20%  DP: 30%  구현: 25%     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  약점 영역                                  │
│  ┌─────────────────────────────────────┐   │
│  │ 📌 DP (동적계획법)                  │   │
│  │    - 메모이제이션 활용 부족          │   │
│  │    - 추천 문제: 백준 #2579          │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### 5. 피드백 상세 페이지 (`/feedback/{id}`)
```
┌──────────────────────────────────────────┐
│  문제: 백준 #1234 - DFS와 BFS            │
│  제출일: 2025-10-15  언어: Java          │
│                                          │
│  나의 답안 코드                           │
│  ┌────────────────────────────────────┐ │
│  │  [코드 하이라이트]                 │ │
│  └────────────────────────────────────┘ │
│                                          │
│  AI 피드백                               │
│  ┌────────────────────────────────────┐ │
│  │ 📝 전반적인 피드백                  │ │
│  │    잘 작성된 코드입니다...          │ │
│  │                                    │ │
│  │ ✅ 잘한 점                          │ │
│  │    • visited 배열 활용             │ │
│  │    • 재귀 종료 조건 명확            │ │
│  │                                    │ │
│  │ 💡 중요 개념                        │ │
│  │    • 깊이 우선 탐색 원리            │ │
│  │                                    │ │
│  │ ⚠️ 주의 사항                        │ │
│  │    • 스택 오버플로우 주의           │ │
│  │                                    │ │
│  │ 📊 복잡도                           │ │
│  │    시간: O(V+E)  공간: O(V)        │ │
│  └────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

---

## 🚀 작업 프로세스 (개발 순서)

### Phase 1: 프로젝트 초기 설정 (1일)

#### 1.1 프로젝트 구조 생성
```
Codeacher/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/codeacher/
│   │   │   │   ├── config/         # 설정 파일
│   │   │   │   ├── controller/     # REST API
│   │   │   │   ├── service/        # 비즈니스 로직
│   │   │   │   ├── repository/     # DB 접근
│   │   │   │   ├── entity/         # JPA 엔티티
│   │   │   │   ├── dto/            # DTO
│   │   │   │   └── security/       # 인증/보안
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── schema.sql
│   │   └── test/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/      # 재사용 컴포넌트
│   │   ├── pages/           # 페이지 컴포넌트
│   │   ├── services/        # API 호출
│   │   ├── hooks/           # 커스텀 훅
│   │   ├── utils/           # 유틸리티
│   │   ├── types/           # TypeScript 타입
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

#### 1.2 백엔드 설정
- `pom.xml` 의존성 추가
- `application.yml` 데이터베이스 설정
- Google OAuth 설정

#### 1.3 프론트엔드 설정
- Vite + React + TypeScript 프로젝트 생성
- 라우팅 설정
- Material-UI 테마 설정

---

### Phase 2: 인증 시스템 구축 (2일)

#### 2.1 백엔드 인증
- [ ] Google OAuth 2.0 설정 (`SecurityConfig.java`)
- [ ] JWT 토큰 생성/검증 (`JwtTokenProvider.java`)
- [ ] User 엔티티 및 Repository 생성
- [ ] AuthController 구현
- [ ] 인증 필터 구현 (`JwtAuthenticationFilter.java`)

#### 2.2 프론트엔드 인증
- [ ] Google 로그인 버튼 컴포넌트
- [ ] 로그인 페이지 (`LoginPage.tsx`)
- [ ] axios 인터셉터 설정 (JWT 토큰 자동 첨부)
- [ ] 인증 Context 구현 (`AuthContext.tsx`)
- [ ] Private Route 구현

**테스트:**
- Google 로그인 후 JWT 토큰 발급 확인
- 인증된 사용자만 API 접근 가능 확인

---

### Phase 3: 답안 제출 및 AI 피드백 (3일)

#### 3.1 데이터베이스 스키마
- [ ] Submission, Feedback, FeedbackDetail 엔티티 생성
- [ ] Repository 인터페이스 작성
- [ ] 연관관계 매핑 (OneToMany, ManyToOne)

#### 3.2 AI API 연동
- [ ] OpenAI API 클라이언트 설정
- [ ] AIFeedbackService 구현
  - 프롬프트 템플릿 작성
  - JSON 응답 파싱 로직
  - 에러 핸들링 (API 실패 시 재시도 로직)

**개선된 프롬프트 템플릿:**
```java
String prompt = String.format("""
    당신은 코딩테스트 전문 튜터입니다.
    
    문제 출처: %s
    문제 번호: %s
    사용 언어: %s
    
    사용자가 제출한 코드:
    ```%s
    %s
    ```
    
    아래 JSON 형식으로만 응답해주세요:
    {
      "problemType": "문제 유형 (DFS, BFS, DP, 구현, 그리디, 이분탐색, 정렬, 문자열 등 중 하나)",
      "overallFeedback": "전반적인 피드백 (100-200자)",
      "feedbacks": [
        "구체적인 피드백 1 (코드의 장점이나 개선점)",
        "구체적인 피드백 2",
        "구체적인 피드백 3"
      ],
      "keyPoints": [
        "이 문제의 핵심 개념 1",
        "이 문제의 핵심 개념 2"
      ],
      "warnings": [
        "주의해야 할 사항 1 (예: 시간초과, 메모리, 엣지케이스)",
        "주의해야 할 사항 2"
      ],
      "timeComplexity": "시간 복잡도 (예: O(N^2))",
      "spaceComplexity": "공간 복잡도 (예: O(N))",
      "alternativeApproach": "더 효율적인 대안이 있다면 설명 (없으면 null)"
    }
    
    주의사항:
    1. 반드시 유효한 JSON 형식으로만 응답
    2. 긍정적이고 건설적인 톤 유지
    3. 초보자도 이해할 수 있는 용어 사용
    """,
    problemSite, problemNumber, language, language.toLowerCase(), userCode
);
```

#### 3.3 백엔드 API
- [ ] SubmissionController 구현
  - `POST /api/submissions` (제출)
  - `GET /api/submissions` (목록)
  - `GET /api/submissions/{id}` (상세)
- [ ] SubmissionService 구현
  - AI 피드백 요청 및 저장
  - 트랜잭션 관리

#### 3.4 프론트엔드 UI
- [ ] 제출 페이지 (`SubmitPage.tsx`)
  - 사이트 선택 드롭다운
  - 문제 번호 입력
  - 코드 에디터 (react-codemirror 또는 ace-editor)
  - 제출 버튼 및 로딩 상태
- [ ] 피드백 표시 컴포넌트 (`FeedbackDisplay.tsx`)
- [ ] API 서비스 (`submissionService.ts`)

**테스트:**
- 답안 제출 후 AI 피드백 실시간 수신
- 피드백이 DB에 올바르게 저장되는지 확인

---

### Phase 4: 문제풀이 내역 및 상세 페이지 (2일)

#### 4.1 백엔드
- [ ] 페이징 및 정렬 기능 추가
- [ ] 검색 필터 (문제 유형, 날짜 범위)

#### 4.2 프론트엔드
- [ ] 내역 페이지 (`HistoryPage.tsx`)
  - 카드 리스트 컴포넌트 (`SubmissionCard.tsx`)
  - 무한 스크롤 or 페이지네이션
- [ ] 상세 페이지 (`FeedbackDetailPage.tsx`)
  - 코드 하이라이팅 (react-syntax-highlighter)
  - 피드백 섹션별 표시
  - 복잡도 시각화

**테스트:**
- 과거 제출 내역 조회
- 카드 클릭 시 상세 페이지 이동

---

### Phase 5: 통계 및 대시보드 (3일)

#### 5.1 백엔드 통계 로직
- [ ] StatisticsService 구현
  - 문제 유형별 집계
  - 일/주/월별 제출 수 계산
  - 약점 영역 분석 알고리즘
- [ ] StatisticsController 구현
- [ ] 통계 캐싱 (Spring Cache 또는 Redis)

**약점 분석 알고리즘:**
```java
// 1. 각 문제 유형별 평균 피드백 스코어 계산
// 2. 평균보다 낮은 유형을 약점으로 분류
// 3. 해당 유형의 공통 issues 추출 (feedbacks에서 자주 언급된 키워드)
```

#### 5.2 프론트엔드 대시보드
- [ ] 대시보드 페이지 (`DashboardPage.tsx`)
- [ ] 통계 카드 컴포넌트 (`StatCard.tsx`)
- [ ] 차트 컴포넌트 (recharts)
  - 파이 차트 (문제 유형 분포)
  - 라인 차트 (일별 제출 추이)
  - 바 차트 (유형별 비교)
- [ ] 약점 영역 표시 (`WeakAreaCard.tsx`)

**테스트:**
- 통계 데이터 정확성 검증
- 차트 렌더링 확인

---

### Phase 6: 오답노트 및 추가 기능 (2일)

#### 6.1 오답노트 기능
- [ ] 문제 북마크/즐겨찾기 기능
- [ ] 약점 유형별 문제 추천 로직
- [ ] 재도전 기능 (같은 문제 다시 제출)

#### 6.2 추가 UI 개선
- [ ] 다크모드 지원
- [ ] 반응형 디자인 (모바일 대응)
- [ ] 알림 시스템 (제출 완료, 오류 발생 시)
- [ ] 로딩 스켈레톤 UI

---

### Phase 7: 테스트 및 최적화 (2일)

#### 7.1 백엔드 테스트
- [ ] 단위 테스트 (JUnit 5)
- [ ] 통합 테스트 (MockMvc)
- [ ] API 문서 생성 (Swagger/OpenAPI)

#### 7.2 프론트엔드 테스트
- [ ] 컴포넌트 테스트 (React Testing Library)
- [ ] E2E 테스트 (Playwright 또는 Cypress)

#### 7.3 성능 최적화
- [ ] 데이터베이스 쿼리 최적화 (N+1 문제 해결)
- [ ] API 응답 캐싱
- [ ] 프론트엔드 코드 스플리팅
- [ ] 이미지 최적화

---

### Phase 8: 배포 (1일)

#### 8.1 백엔드 배포
- Docker 컨테이너화
- AWS EC2 또는 Heroku 배포
- 환경변수 설정 (DB, API Key)

#### 8.2 프론트엔드 배포
- Vercel 또는 Netlify 배포
- 환경별 설정 (dev, prod)

#### 8.3 모니터링
- 로그 수집 (Logback)
- 에러 트래킹 (Sentry)
- 성능 모니터링 (Google Analytics)

---

## 📈 예상 일정

| Phase | 작업 내용 | 소요 기간 |
|-------|----------|----------|
| 1 | 프로젝트 초기 설정 | 1일 |
| 2 | 인증 시스템 구축 | 2일 |
| 3 | 답안 제출 및 AI 피드백 | 3일 |
| 4 | 문제풀이 내역 | 2일 |
| 5 | 통계 및 대시보드 | 3일 |
| 6 | 오답노트 및 추가 기능 | 2일 |
| 7 | 테스트 및 최적화 | 2일 |
| 8 | 배포 | 1일 |
| **총계** | | **16일** |

---

## 🔒 보안 고려사항

1. **API Key 보호**
   - OpenAI API Key는 환경변수로 관리
   - `.gitignore`에 `.env` 파일 추가

2. **SQL Injection 방지**
   - JPA를 통한 Prepared Statement 자동 처리
   - 사용자 입력 검증 (Validation)

3. **XSS 방지**
   - React의 기본 escaping 활용
   - 코드 표시 시 sanitization

4. **CORS 설정**
   - 프론트엔드 도메인만 허용

5. **Rate Limiting**
   - AI API 호출 제한 (사용자당 일 10회)
   - Spring Security의 Rate Limiter 활용

---

## 🎨 디자인 원칙

### 색상 테마
```css
:root {
  --primary: #4A90E2;      /* 신뢰감 있는 파란색 */
  --secondary: #50C878;    /* 성공/성장을 의미하는 초록색 */
  --warning: #FFB347;      /* 주의사항 표시 */
  --error: #FF6B6B;        /* 에러 상태 */
  --background: #F8F9FA;   /* 부드러운 회색 배경 */
  --text-primary: #2C3E50; /* 주요 텍스트 */
  --text-secondary: #7F8C8D; /* 보조 텍스트 */
}
```

### 타이포그래피
- 제목: Pretendard Bold
- 본문: Pretendard Regular
- 코드: Fira Code (리가처 지원)

### UI 원칙
1. **명확성**: 한눈에 정보 파악 가능
2. **일관성**: 모든 페이지에서 동일한 패턴
3. **접근성**: WCAG 2.1 AA 수준 준수
4. **반응성**: 모바일 우선 디자인

---

## 🧪 테스트 전략

### 백엔드 테스트 커버리지 목표: 80%
- Controller: MockMvc 테스트
- Service: 비즈니스 로직 단위 테스트
- Repository: @DataJpaTest로 DB 작업 테스트

### 프론트엔드 테스트
- 컴포넌트: 렌더링 및 상호작용 테스트
- 통합: 페이지 단위 시나리오 테스트
- E2E: 주요 사용자 플로우 테스트

---

## 🚧 향후 확장 계획

### v2.0 (장기)
1. **소셜 기능**
   - 사용자 간 코드 공유
   - 문제 추천 커뮤니티

2. **AI 고도화**
   - 사용자 학습 패턴 분석
   - 개인화된 학습 경로 제안

3. **멀티 플랫폼**
   - iOS/Android 앱 개발
   - VS Code Extension

4. **프리미엄 기능**
   - 무제한 AI 피드백
   - 고급 통계 분석
   - 1:1 멘토링 매칭

---

## 📚 참고 자료

### 백엔드
- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Spring Security OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
- [OpenAI API 문서](https://platform.openai.com/docs)

### 프론트엔드
- [React 공식 문서](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Recharts](https://recharts.org/)

### 데이터베이스
- [PostgreSQL JSON 함수](https://www.postgresql.org/docs/current/functions-json.html)
- [JPA 최적화](https://vladmihalcea.com/tutorials/hibernate/)

---

## 💡 개발 Tips

### 백엔드
1. **DTO vs Entity 분리**: 외부 노출용 DTO와 내부 Entity를 명확히 구분
2. **예외 처리**: `@ControllerAdvice`로 전역 예외 처리
3. **로깅**: 중요 지점에 로그 남기기 (AI API 호출, 에러 발생)

### 프론트엔드
1. **상태 관리**: React Query로 서버 상태, Context로 클라이언트 상태 관리
2. **코드 재사용**: 공통 컴포넌트는 `components/common/`에 배치
3. **에러 바운더리**: 예상치 못한 에러 대응

### AI 프롬프트
1. **명확한 지시**: JSON 형식 강제
2. **예시 제공**: Few-shot learning 활용
3. **토큰 최적화**: 불필요한 설명 제거

---

## ✅ 체크리스트

### 개발 시작 전
- [ ] Google Cloud Console에서 OAuth 클라이언트 ID 발급
- [ ] OpenAI API Key 발급
- [ ] PostgreSQL 설치 및 데이터베이스 생성
- [ ] Git 저장소 생성

### 개발 중
- [ ] 각 Phase 완료 시 Git 커밋
- [ ] 코드 리뷰 (가능하면 동료와)
- [ ] 테스트 작성 습관화

### 배포 전
- [ ] 환경변수 설정 확인
- [ ] 프로덕션 DB 마이그레이션
- [ ] SSL 인증서 설정
- [ ] 모니터링 도구 연동

---

## 🎯 성공 지표

1. **기능적 목표**
   - ✅ 사용자가 답안 제출 후 30초 이내 AI 피드백 수신
   - ✅ 모든 제출 내역이 DB에 안전하게 저장
   - ✅ 통계 페이지에서 실시간 데이터 조회

2. **기술적 목표**
   - ✅ API 응답 시간 평균 1초 이하
   - ✅ 프론트엔드 Lighthouse 점수 90점 이상
   - ✅ 테스트 커버리지 80% 이상

3. **사용자 경험**
   - ✅ 직관적인 UI로 별도 설명 없이 사용 가능
   - ✅ 모바일에서도 원활한 사용
   - ✅ 에러 발생 시 친절한 안내 메시지

---

## 📞 문의 및 지원

프로젝트 개발 중 질문이나 이슈가 있다면:
1. GitHub Issues에 등록
2. 개발 문서 참고
3. 커뮤니티 포럼 활용

---

**작성일**: 2025-10-15  
**최종 수정일**: 2025-10-15  
**버전**: 1.0.0

---

## 🚀 시작하기

```bash
# 1. 저장소 클론
git clone <repository-url>
cd Codeacher

# 2. 백엔드 실행
cd backend
./mvnw spring-boot:run

# 3. 프론트엔드 실행 (새 터미널)
cd frontend
npm install
npm run dev
```

이제 Codeacher 개발을 시작할 준비가 되었습니다! 🎉


