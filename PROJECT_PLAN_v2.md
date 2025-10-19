# Codeacher 프로젝트 계획서 v2.0

## 📋 프로젝트 개요

**Codeacher**는 AI를 활용한 코딩테스트 피드백 선생님 프로그램입니다. 사용자가 온라인 저지 사이트의 문제를 풀고 제출하면, **선택한 캐릭터 선생님**이 AI를 통해 답안을 분석하여 피드백, 중요 개념, 주의 사항을 제공하고, 학습 진척도를 추적할 수 있는 서비스입니다.

### 참고 프로젝트
- https://github.com/happymink/daliyCodingTest

### 🆕 v2.0 주요 추가 기능
- **캐릭터 선생님 시스템**: 사용자가 선호하는 캐릭터 선택
- **인터랙티브 로딩 경험**: 대기 시간을 즐겁게 만드는 애니메이션과 대사
- **개성 있는 피드백**: 캐릭터별 고유한 말투와 스타일

---

## 🎯 핵심 기능

### 1. 답안 제출 및 AI 피드백
- 코딩테스트 문제 정보 입력 (사이트, 문제번호)
- 사용자 답안 코드 제출
- 선택한 캐릭터 선생님을 통한 AI 기반 실시간 피드백 제공

### 2. 캐릭터 선생님 시스템 🆕
- 6종의 개성 있는 캐릭터 선생님 제공
- 캐릭터별 고유한 말투와 피드백 스타일
- 대기 시간 동안 캐릭터 애니메이션과 대사로 몰입감 제공
- 언제든 캐릭터 변경 가능

### 3. 문제풀이 내역 관리
- 과거 제출 문제 및 답안 조회
- 카드 형식의 직관적인 UI
- 문제별 AI 피드백 열람

### 4. 학습 분석 대시보드
- 푼 문제 유형 분석
- 부족한 문제 유형 파악
- 일/월간 통계 시각화
- 오답노트 및 약점 분석

---

## 🎭 캐릭터 선생님 시스템

### 캐릭터 라인업

#### 1. 🤖 코디봇 (Cody Bot)
```yaml
이름: 코디봇
이모지: 🤖
성격: 논리적이고 체계적, 약간 진지하지만 따뜻함
말투: "분석 결과, 당신의 코드는..." "논리적으로 접근하면..."
특기: 시간복잡도, 공간복잡도 분석에 강함
컬러: #4A90E2 (파란색)
추천 대상: 알고리즘 효율성을 중시하는 학습자
```

#### 2. 🦉 알고 선생님 (Professor Owl)
```yaml
이름: 알고 선생님
이모지: 🦉
성격: 지혜롭고 차분한 교수님 스타일
말투: "음... 흥미롭군요." "이 문제의 핵심은 말이죠..."
특기: 알고리즘 이론과 개념 설명에 탁월
컬러: #8B4513 (브라운)
추천 대상: 개념을 깊이 이해하고 싶은 학습자
```

#### 3. 🐛 디버기 (Debuggy)
```yaml
이름: 디버기
이모지: 🐛
성격: 꼼꼼하고 디테일 지향적, 약간 수다스러움
말투: "어? 여기 좀 봐봐요!" "이 부분은 조심해야 해요~"
특기: 버그와 엣지케이스 찾기의 달인
컬러: #FF6B6B (레드)
추천 대상: 실수를 줄이고 싶은 학습자
```

#### 4. 🚀 스피디 (Speedy)
```yaml
이름: 스피디
이모지: 🚀
성격: 에너제틱하고 효율성 중시
말투: "빠르게 가볼까요!" "더 최적화할 수 있어요!"
특기: 성능 최적화와 시간복잡도 개선에 집중
컬러: #FF8C00 (오렌지)
추천 대상: 코드 최적화를 중시하는 학습자
```

#### 5. 🐱 코코 (Coco)
```yaml
이름: 코코
이모지: 🐱
성격: 친근하고 격려를 잘해줌, 초보자 친화적
말투: "잘하고 있어요!" "이렇게 하면 어때요?"
특기: 초보자에게 친절한 설명, 긍정적 피드백
컬러: #FFB6C1 (핑크)
추천 대상: 코딩테스트 입문자
```

#### 6. 🧊 프로페서 큐브 (Professor Cube)
```yaml
이름: 프로페서 큐브
이모지: 🧊
성격: 전문가 스타일, 직설적이고 명확함
말투: "결론부터 말하자면..." "핵심만 간단히..."
특기: 간결하고 핵심적인 피드백, 고급 개발자용
컬러: #9B59B6 (보라색)
추천 대상: 빠르고 정확한 피드백을 원하는 숙련자
```

### 캐릭터 선택 UI

```
┌──────────────────────────────────────────────────┐
│                                                  │
│      나만의 코딩 선생님을 선택하세요! 🎓         │
│                                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │   🤖    │  │   🦉    │  │   🐛    │         │
│  │코디봇   │  │ 알고    │  │ 디버기  │         │
│  │         │  │선생님   │  │         │         │
│  │논리적   │  │지혜로운 │  │꼼꼼한   │         │
│  │분석가   │  │교수님   │  │탐정     │         │
│  └─────────┘  └─────────┘  └─────────┘         │
│                                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │   🚀    │  │   🐱    │  │   🧊    │         │
│  │스피디   │  │ 코코    │  │프로페서 │         │
│  │         │  │         │  │큐브     │         │
│  │최적화   │  │친근한   │  │전문가   │         │
│  │전문가   │  │친구     │  │스타일   │         │
│  └─────────┘  └─────────┘  └─────────┘         │
│                                                  │
│  💡 선택한 선생님이 피드백을 해줘요!            │
│     나중에 언제든 변경할 수 있어요               │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🎬 로딩 UX 개선 (대기 시간 경험)

### 제출 프로세스

```
1단계: 제출 완료 팝업
┌────────────────────────────────┐
│   제출이 완료되었어요! 🎉      │
│                                │
│   [피드백 보러 가기]           │
└────────────────────────────────┘

↓

2단계: 캐릭터 애니메이션 로딩 화면
┌─────────────────────────────────────┐
│   🤖 코디봇이 열심히 분석 중!       │
│                                     │
│           🤖                        │
│        ╱ ◉ ◉ ╲   💭📄💡            │
│       │  ▽   │                     │
│        ╲___╱                       │
│         ╱│╲                        │
│        ╱ │ ╲                       │
│                                     │
│   [=========>        ] 56%          │
│                                     │
│   💬 "흠... 이 알고리즘은..."       │
│                                     │
│   ⏱ 약 15초 남았어요                │
└─────────────────────────────────────┘

↓

3단계: 완료 애니메이션
┌─────────────────────────────────────┐
│           🤖                        │
│        ╱ ^ω^ ╲   ✨🎉✨            │
│       │  ▽   │                     │
│        ╲___╱                       │
│         ╱│╲                        │
│        ╱ │ ╲                       │
│                                     │
│   ✨ 분석이 완료되었습니다! ✨       │
│                                     │
│   💬 "피드백 준비 완료!"            │
│                                     │
│   [피드백 확인하기] (펄스 효과)     │
└─────────────────────────────────────┘
```

### 캐릭터별 대사 예시

#### 🤖 코디봇
- **로딩**: "코드 분석을 시작합니다...", "알고리즘 패턴을 파악하는 중..."
- **분석 중**: "흠... 이 로직은...", "오! 여기가 핵심이네요!"
- **완료**: "분석 완료! 피드백을 확인해보세요"

#### 🦉 알고 선생님
- **로딩**: "차분히 살펴보겠습니다...", "음... 어떤 접근법을 쓰셨는지..."
- **분석 중**: "아하, 이런 방식으로 풀으셨군요", "흥미로운 접근법이에요"
- **완료**: "자, 피드백을 정리했습니다"

#### 🐛 디버기
- **로딩**: "세심하게 체크하는 중~", "혹시 놓친 부분이 있을까?"
- **분석 중**: "어? 여기 좀 봐봐요!", "오오! 이 부분은 주의해야 해요"
- **완료**: "자잘한 것들까지 체크했어요!"

#### 🚀 스피디
- **로딩**: "빠르게 분석 시작!", "성능 체크 중..."
- **분석 중**: "오! 이 부분은 개선 여지가!", "시간복잡도가 괜찮네요!"
- **완료**: "완료! 최적화 팁 준비됐어요"

#### 🐱 코코
- **로딩**: "같이 천천히 봐볼까요?", "어떤 코드를 쓰셨을까~"
- **분석 중**: "오~ 이렇게 풀으셨구나!", "잘하고 있어요!"
- **완료**: "완료! 정말 수고하셨어요"

#### 🧊 프로페서 큐브
- **로딩**: "분석 시작.", "핵심 로직 파악 중..."
- **분석 중**: "간결하게 작성하셨군요", "이 부분이 핵심입니다"
- **완료**: "분석 완료. 확인하십시오"

---

## 🛠 기술 스택 선정 및 이유

### Frontend

**선택: React 18 + TypeScript + Vite**

**이유:**
- **React**: 컴포넌트 기반 아키텍처로 재사용 가능한 UI 구성 (카드 목록, 통계 차트, 캐릭터 애니메이션 등)
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
  "react-google-login": "^5.2.2",  // 구글 로그인
  "framer-motion": "^10.16.0"      // 🆕 캐릭터 애니메이션
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
├─ selected_character VARCHAR(50) DEFAULT 'cody_bot' 🆕
├─ created_at
└─ updated_at

characters (캐릭터 정보) 🆕
├─ id VARCHAR(50) (PK)
├─ name VARCHAR(100) NOT NULL
├─ emoji VARCHAR(10)
├─ description TEXT
├─ specialty VARCHAR(200)
├─ color_theme VARCHAR(7)
├─ personality VARCHAR(50)
└─ is_active BOOLEAN DEFAULT true

character_dialogues (캐릭터 대사) 🆕
├─ id (PK)
├─ character_id VARCHAR(50) (FK -> characters.id)
├─ phase VARCHAR(20) (loading, analyzing, complete)
├─ dialogue TEXT
└─ order_index INT

submissions (제출 내역)
├─ id (PK)
├─ user_id (FK -> users.id)
├─ problem_site (문제 사이트)
├─ problem_number (문제 번호)
├─ problem_title (문제 제목, nullable)
├─ problem_type (문제 유형: DFS, DP, 구현 등)
├─ user_code (사용자 답안 코드, TEXT)
├─ language (사용 언어: Java, Python 등)
├─ character_id VARCHAR(50) (FK -> characters.id) 🆕
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
- `users.selected_character`: 캐릭터 정보 조인 🆕
- `submissions.user_id, submitted_at`: 사용자별 제출 내역 조회
- `submissions.problem_type`: 유형별 통계
- `feedback_details.feedback_id, category, order_index`: 피드백 조회
- `character_dialogues.character_id, phase`: 대사 조회 🆕

---

## 🏗 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Submit Page  │  │ History Page │  │Dashboard Page│      │
│  │  + Character │  │              │  │              │      │
│  │  Animation   │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────────────────────────────────────────┐      │
│  │     Character Selection Page 🆕                  │      │
│  └──────────────────────────────────────────────────┘      │
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
│  │  - CharacterController (캐릭터) 🆕                    │   │
│  └────────────────┬─────────────────────────────────────┘   │
│  ┌────────────────▼─────────────────────────────────────┐   │
│  │              Service Layer                            │   │
│  │  - UserService                                        │   │
│  │  - SubmissionService                                  │   │
│  │  - AIFeedbackService (AI API 통신)                   │   │
│  │  - StatisticsService                                  │   │
│  │  - CharacterService 🆕                                │   │
│  └────────────────┬─────────────────────────────────────┘   │
│  ┌────────────────▼─────────────────────────────────────┐   │
│  │              Repository Layer (JPA)                   │   │
│  │  - UserRepository                                     │   │
│  │  - SubmissionRepository                               │   │
│  │  - FeedbackRepository                                 │   │
│  │  - CharacterRepository 🆕                             │   │
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
    "profileImage": "https://...",
    "selectedCharacter": "cody_bot"
  }
}
```

---

### 2. 캐릭터 API 🆕

#### `GET /api/characters`
전체 캐릭터 목록 조회
```json
Response:
[
  {
    "id": "cody_bot",
    "name": "코디봇",
    "emoji": "🤖",
    "description": "논리적이고 체계적인 분석가",
    "specialty": "복잡도 분석",
    "colorTheme": "#4A90E2",
    "personality": "logical"
  },
  {
    "id": "prof_owl",
    "name": "알고 선생님",
    "emoji": "🦉",
    "description": "지혜로운 교수님 스타일",
    "specialty": "이론 설명",
    "colorTheme": "#8B4513",
    "personality": "wise"
  },
  ...
]
```

#### `PUT /api/characters/select/{characterId}`
캐릭터 선택
```json
Response:
{
  "message": "캐릭터가 변경되었습니다",
  "selectedCharacter": {
    "id": "cody_bot",
    "name": "코디봇",
    "emoji": "🤖"
  }
}
```

#### `GET /api/characters/current`
현재 선택된 캐릭터 조회
```json
Response:
{
  "id": "cody_bot",
  "name": "코디봇",
  "emoji": "🤖",
  "colorTheme": "#4A90E2",
  "dialogues": {
    "loading": [
      "코드 분석을 시작합니다...",
      "알고리즘 패턴을 파악하는 중..."
    ],
    "analyzing": [
      "흠... 이 로직은...",
      "오! 여기가 핵심이네요!"
    ],
    "complete": [
      "분석 완료! 피드백을 확인해보세요"
    ]
  }
}
```

#### `GET /api/characters/{characterId}/preview`
캐릭터 미리보기 (선택 전)
```json
Response:
{
  "id": "cody_bot",
  "name": "코디봇",
  "emoji": "🤖",
  "description": "논리적이고 체계적인 분석가",
  "specialty": "복잡도 분석",
  "colorTheme": "#4A90E2",
  "sampleDialogue": "안녕하세요! 저는 코디봇이에요. 논리적이고 체계적인 분석으로 도와드릴게요!",
  "strengths": [
    "시간/공간 복잡도 분석",
    "알고리즘 구조 파악",
    "로직 최적화 제안"
  ]
}
```

---

### 3. 제출 API

#### `POST /api/submissions`
답안 제출 및 AI 피드백 요청 (비동기)
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
  "status": "PROCESSING",
  "character": {
    "id": "cody_bot",
    "name": "코디봇",
    "emoji": "🤖",
    "colorTheme": "#4A90E2"
  },
  "estimatedTime": 25 // 예상 대기 시간(초)
}
```

#### `GET /api/submissions/{id}/status`
제출 상태 조회 (폴링용)
```json
Response:
{
  "submissionId": 123,
  "status": "PROCESSING" | "COMPLETED" | "FAILED",
  "progress": 67 // 0-100
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
      "feedbackSummary": "전반적으로 잘 작성된...",
      "characterEmoji": "🤖"
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
  "character": {
    "id": "cody_bot",
    "name": "코디봇",
    "emoji": "🤖"
  },
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

### 4. 통계 API

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
  "weakAreas": ["DP", "그리디"],
  "characterUsage": {
    "cody_bot": 25,
    "prof_owl": 15,
    "coco": 10
  }
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

### 2. 캐릭터 선택 페이지 (`/character-selection`) 🆕
```
┌──────────────────────────────────────────────────┐
│                                                  │
│      나만의 코딩 선생님을 선택하세요! 🎓         │
│                                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │   🤖    │  │   🦉    │  │   🐛    │         │
│  │코디봇   │  │ 알고    │  │ 디버기  │         │
│  │         │  │선생님   │  │         │         │
│  │논리적   │  │지혜로운 │  │꼼꼼한   │         │
│  │분석가   │  │교수님   │  │탐정     │         │
│  │[선택]   │  │[선택]   │  │[선택]   │         │
│  └─────────┘  └─────────┘  └─────────┘         │
│                                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │   🚀    │  │   🐱    │  │   🧊    │         │
│  │스피디   │  │ 코코    │  │프로페서 │         │
│  │         │  │         │  │큐브     │         │
│  │최적화   │  │친근한   │  │전문가   │         │
│  │전문가   │  │친구     │  │스타일   │         │
│  │[선택]   │  │[선택]   │  │[선택]   │         │
│  └─────────┘  └─────────┘  └─────────┘         │
│                                                  │
│  💡 선택한 선생님이 피드백을 해줘요!            │
│     나중에 설정에서 언제든 변경할 수 있어요      │
│                                                  │
└──────────────────────────────────────────────────┘
```

### 3. 답안 제출 페이지 (`/submit`)
```
┌────────────────────────────────────┐
│  현재 선생님: 🤖 코디봇            │
│  ───────────────────────────────   │
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

### 4. 로딩 화면 (제출 후) 🆕
```
┌─────────────────────────────────────┐
│   🤖 코디봇이 열심히 분석 중!       │
│                                     │
│           🤖                        │
│        ╱ ◉ ◉ ╲   💭📄              │
│       │  ▽   │                     │
│        ╲___╱                       │
│         ╱│╲                        │
│        ╱ │ ╲                       │
│                                     │
│   [=================>    ] 78%      │
│                                     │
│   💬 "오! 여기가 핵심이네요!"       │
│                                     │
│   ⏱ 약 10초 남았어요                │
└─────────────────────────────────────┘
```

### 5. 문제풀이 내역 페이지 (`/history`)
```
┌────────────────────────────────────────────┐
│  나의 문제풀이 내역                         │
│  ┌────────┬────────┬────────┬────────┐    │
│  │ [Card] │ [Card] │ [Card] │ [Card] │    │
│  │ 🤖 DFS │ 🦉 DP  │ 🐱구현 │ 🚀BFS  │    │
│  │ #1234  │ #5678  │ #9012  │ #3456  │    │
│  │ 백준   │ 백준   │프로그래│ 백준   │    │
│  │10/15   │10/14   │ 머스   │10/13   │    │
│  └────────┴────────┴────────┴────────┘    │
│                                            │
│  [ 더보기... ]                             │
└────────────────────────────────────────────┘
```

### 6. 통계 대시보드 (`/dashboard`)
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
│  선생님별 통계 🆕                            │
│  🤖 코디봇: 15개  🦉 알고: 7개  🐱 코코: 3개│
│                                             │
│  약점 영역                                  │
│  ┌─────────────────────────────────────┐   │
│  │ 📌 DP (동적계획법)                  │   │
│  │    - 메모이제이션 활용 부족          │   │
│  │    - 추천 문제: 백준 #2579          │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### 7. 피드백 상세 페이지 (`/feedback/{id}`)
```
┌──────────────────────────────────────────┐
│  문제: 백준 #1234 - DFS와 BFS            │
│  제출일: 2025-10-15  언어: Java          │
│  선생님: 🤖 코디봇                       │
│                                          │
│  나의 답안 코드                           │
│  ┌────────────────────────────────────┐ │
│  │  [코드 하이라이트]                 │ │
│  └────────────────────────────────────┘ │
│                                          │
│  🤖 코디봇의 피드백                      │
│  ┌────────────────────────────────────┐ │
│  │ 📝 전반적인 피드백                  │ │
│  │    잘 작성된 코드입니다...          │ │
│  │                                    │ │
│  │ ✅ 잘한 점                          │ │
│  │    • visited 배열을 활용한 점이    │ │
│  │      좋습니다                       │ │
│  │    • 재귀 종료 조건을 명확히 했습니다│ │
│  │                                    │ │
│  │ 💡 중요 개념                        │ │
│  │    • 깊이 우선 탐색의 기본 원리     │ │
│  │    • 스택/재귀를 통한 구현          │ │
│  │                                    │ │
│  │ ⚠️ 주의 사항                        │ │
│  │    • 스택 오버플로우 주의           │ │
│  │    • 방문 체크 누락 방지            │ │
│  │                                    │ │
│  │ 📊 복잡도 분석                      │ │
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
│   │   │       ├── schema.sql
│   │   │       └── data.sql        # 🆕 캐릭터 초기 데이터
│   │   └── test/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/      # 재사용 컴포넌트
│   │   │   ├── characters/  # 🆕 캐릭터 관련 컴포넌트
│   │   │   └── common/
│   │   ├── pages/           # 페이지 컴포넌트
│   │   ├── services/        # API 호출
│   │   ├── hooks/           # 커스텀 훅
│   │   ├── contexts/        # Context API
│   │   │   └── CharacterContext.tsx  # 🆕
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
- 🆕 캐릭터 초기 데이터 스크립트 작성

#### 1.3 프론트엔드 설정
- Vite + React + TypeScript 프로젝트 생성
- 라우팅 설정
- Material-UI 테마 설정
- 🆕 Framer Motion 설치

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

### Phase 3: 캐릭터 시스템 구축 (2일) 🆕

#### 3.1 데이터베이스 및 백엔드
- [ ] Character, CharacterDialogue 엔티티 생성
- [ ] CharacterRepository 작성
- [ ] CharacterService 구현
  - 캐릭터 목록 조회
  - 캐릭터 선택/변경
  - 대사 랜덤 조회
- [ ] CharacterController 구현
- [ ] 초기 캐릭터 데이터 삽입 (data.sql)

#### 3.2 프론트엔드
- [ ] CharacterContext 구현
- [ ] 캐릭터 선택 페이지 (`CharacterSelectionPage.tsx`)
- [ ] 캐릭터 카드 컴포넌트 (`CharacterCard.tsx`)
- [ ] 캐릭터 미리보기 모달 (`CharacterPreviewModal.tsx`)
- [ ] 캐릭터 API 서비스 (`characterService.ts`)

**테스트:**
- 캐릭터 선택 후 DB에 저장 확인
- 선택된 캐릭터 정보 조회 확인

---

### Phase 4: 답안 제출 및 AI 피드백 (3일)

#### 4.1 데이터베이스 스키마
- [ ] Submission, Feedback, FeedbackDetail 엔티티 생성
- [ ] Repository 인터페이스 작성
- [ ] 연관관계 매핑 (OneToMany, ManyToOne)
- [ ] 🆕 Submission에 character_id 필드 추가

#### 4.2 AI API 연동
- [ ] OpenAI API 클라이언트 설정
- [ ] AIFeedbackService 구현
  - 프롬프트 템플릿 작성
  - JSON 응답 파싱 로직
  - 에러 핸들링 (API 실패 시 재시도 로직)
  - 🆕 비동기 처리 (CompletableFuture)

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

#### 4.3 백엔드 API
- [ ] SubmissionController 구현
  - `POST /api/submissions` (제출 - 비동기)
  - `GET /api/submissions/{id}/status` (상태 조회)
  - `GET /api/submissions` (목록)
  - `GET /api/submissions/{id}` (상세)
- [ ] SubmissionService 구현
  - AI 피드백 비동기 요청 및 저장
  - 트랜잭션 관리
  - 진행률 추적

#### 4.4 프론트엔드 UI
- [ ] 제출 페이지 (`SubmitPage.tsx`)
  - 사이트 선택 드롭다운
  - 문제 번호 입력
  - 코드 에디터 (react-codemirror 또는 ace-editor)
  - 제출 버튼 및 로딩 상태
- [ ] 🆕 로딩 애니메이션 컴포넌트 (`LoadingWithCharacter.tsx`)
  - Framer Motion 애니메이션
  - 캐릭터별 대사 표시
  - 진행률 바
  - 상태 폴링
- [ ] 피드백 표시 컴포넌트 (`FeedbackDisplay.tsx`)
- [ ] API 서비스 (`submissionService.ts`)

**테스트:**
- 답안 제출 후 즉시 응답 확인
- 로딩 화면에서 캐릭터 애니메이션 확인
- 대사가 주기적으로 변경되는지 확인
- AI 피드백 완료 후 자동 전환 확인

---

### Phase 5: 문제풀이 내역 및 상세 페이지 (2일)

#### 5.1 백엔드
- [ ] 페이징 및 정렬 기능 추가
- [ ] 검색 필터 (문제 유형, 날짜 범위)
- [ ] 🆕 캐릭터 필터 추가

#### 5.2 프론트엔드
- [ ] 내역 페이지 (`HistoryPage.tsx`)
  - 카드 리스트 컴포넌트 (`SubmissionCard.tsx`)
  - 🆕 캐릭터 이모지 표시
  - 무한 스크롤 or 페이지네이션
- [ ] 상세 페이지 (`FeedbackDetailPage.tsx`)
  - 코드 하이라이팅 (react-syntax-highlighter)
  - 🆕 캐릭터 정보 표시
  - 피드백 섹션별 표시
  - 복잡도 시각화

**테스트:**
- 과거 제출 내역 조회
- 카드 클릭 시 상세 페이지 이동
- 어떤 캐릭터가 피드백했는지 확인 가능

---

### Phase 6: 통계 및 대시보드 (3일)

#### 6.1 백엔드 통계 로직
- [ ] StatisticsService 구현
  - 문제 유형별 집계
  - 일/주/월별 제출 수 계산
  - 약점 영역 분석 알고리즘
  - 🆕 캐릭터별 사용 통계
- [ ] StatisticsController 구현
- [ ] 통계 캐싱 (Spring Cache 또는 Redis)

**약점 분석 알고리즘:**
```java
// 1. 각 문제 유형별 평균 피드백 스코어 계산
// 2. 평균보다 낮은 유형을 약점으로 분류
// 3. 해당 유형의 공통 issues 추출 (feedbacks에서 자주 언급된 키워드)
```

#### 6.2 프론트엔드 대시보드
- [ ] 대시보드 페이지 (`DashboardPage.tsx`)
- [ ] 통계 카드 컴포넌트 (`StatCard.tsx`)
- [ ] 차트 컴포넌트 (recharts)
  - 파이 차트 (문제 유형 분포)
  - 라인 차트 (일별 제출 추이)
  - 바 차트 (유형별 비교)
  - 🆕 캐릭터 사용 통계 차트
- [ ] 약점 영역 표시 (`WeakAreaCard.tsx`)

**테스트:**
- 통계 데이터 정확성 검증
- 차트 렌더링 확인
- 캐릭터별 통계 표시 확인

---

### Phase 7: 오답노트 및 추가 기능 (2일)

#### 7.1 오답노트 기능
- [ ] 문제 북마크/즐겨찾기 기능
- [ ] 약점 유형별 문제 추천 로직
- [ ] 재도전 기능 (같은 문제 다시 제출)

#### 7.2 추가 UI 개선
- [ ] 다크모드 지원
- [ ] 반응형 디자인 (모바일 대응)
- [ ] 알림 시스템 (제출 완료, 오류 발생 시)
- [ ] 로딩 스켈레톤 UI
- [ ] 🆕 설정 페이지에서 캐릭터 변경 기능

---

### Phase 8: 테스트 및 최적화 (2일)

#### 8.1 백엔드 테스트
- [ ] 단위 테스트 (JUnit 5)
- [ ] 통합 테스트 (MockMvc)
- [ ] API 문서 생성 (Swagger/OpenAPI)
- [ ] 🆕 캐릭터 시스템 테스트

#### 8.2 프론트엔드 테스트
- [ ] 컴포넌트 테스트 (React Testing Library)
- [ ] E2E 테스트 (Playwright 또는 Cypress)
- [ ] 🆕 애니메이션 성능 테스트

#### 8.3 성능 최적화
- [ ] 데이터베이스 쿼리 최적화 (N+1 문제 해결)
- [ ] API 응답 캐싱
- [ ] 프론트엔드 코드 스플리팅
- [ ] 이미지 최적화
- [ ] 🆕 애니메이션 최적화 (GPU 가속)

---

### Phase 9: 배포 (1일)

#### 9.1 백엔드 배포
- Docker 컨테이너화
- AWS EC2 또는 Heroku 배포
- 환경변수 설정 (DB, API Key)

#### 9.2 프론트엔드 배포
- Vercel 또는 Netlify 배포
- 환경별 설정 (dev, prod)

#### 9.3 모니터링
- 로그 수집 (Logback)
- 에러 트래킹 (Sentry)
- 성능 모니터링 (Google Analytics)

---

## 📈 예상 일정

| Phase | 작업 내용 | 소요 기간 |
|-------|----------|----------|
| 1 | 프로젝트 초기 설정 | 1일 |
| 2 | 인증 시스템 구축 | 2일 |
| 3 | 🆕 캐릭터 시스템 구축 | 2일 |
| 4 | 답안 제출 및 AI 피드백 (비동기) | 3일 |
| 5 | 문제풀이 내역 | 2일 |
| 6 | 통계 및 대시보드 | 3일 |
| 7 | 오답노트 및 추가 기능 | 2일 |
| 8 | 테스트 및 최적화 | 2일 |
| 9 | 배포 | 1일 |
| **총계** | | **18일** |

---

## 💻 핵심 구현 코드 예시

### 백엔드: CharacterService

```java
@Service
@RequiredArgsConstructor
public class CharacterService {
    
    private final CharacterRepository characterRepository;
    private final CharacterDialogueRepository dialogueRepository;
    private final UserRepository userRepository;
    
    public List<CharacterProfile> getAllCharacters() {
        return characterRepository.findByIsActiveTrue()
            .stream()
            .map(this::toProfile)
            .collect(Collectors.toList());
    }
    
    public CharacterProfile getCharacterWithDialogues(String characterId) {
        Character character = characterRepository.findById(characterId)
            .orElseThrow(() -> new EntityNotFoundException("캐릭터를 찾을 수 없습니다"));
        
        List<CharacterDialogue> dialogues = dialogueRepository
            .findByCharacterIdOrderByOrderIndex(characterId);
        
        Map<String, List<String>> dialoguesByPhase = dialogues.stream()
            .collect(Collectors.groupingBy(
                CharacterDialogue::getPhase,
                Collectors.mapping(CharacterDialogue::getDialogue, Collectors.toList())
            ));
        
        return CharacterProfile.builder()
            .id(character.getId())
            .name(character.getName())
            .emoji(character.getEmoji())
            .colorTheme(character.getColorTheme())
            .dialogues(dialoguesByPhase)
            .build();
    }
    
    @Transactional
    public void selectCharacter(String userId, String characterId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다"));
        
        Character character = characterRepository.findById(characterId)
            .orElseThrow(() -> new EntityNotFoundException("캐릭터를 찾을 수 없습니다"));
        
        user.setSelectedCharacter(characterId);
        userRepository.save(user);
    }
    
    public String getRandomDialogue(String characterId, String phase) {
        List<CharacterDialogue> dialogues = dialogueRepository
            .findByCharacterIdAndPhase(characterId, phase);
        
        if (dialogues.isEmpty()) {
            return "분석 중입니다...";
        }
        
        Random random = new Random();
        return dialogues.get(random.nextInt(dialogues.size())).getDialogue();
    }
}
```

### 백엔드: 비동기 제출 처리

```java
@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class SubmissionController {
    
    private final SubmissionService submissionService;
    private final CharacterService characterService;
    
    @PostMapping
    public ResponseEntity<SubmissionResponse> submitCode(
        @RequestBody SubmissionRequest request,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        User user = userService.findByEmail(userDetails.getUsername());
        
        // 1. Submission 즉시 생성
        Submission submission = submissionService.createSubmission(
            user, request, user.getSelectedCharacter()
        );
        
        // 2. 비동기로 AI 피드백 생성
        CompletableFuture.runAsync(() -> {
            try {
                aiFeedbackService.generateAndSaveFeedback(submission.getId());
            } catch (Exception e) {
                log.error("AI 피드백 생성 실패: {}", e.getMessage());
                submissionService.updateStatus(submission.getId(), "FAILED");
            }
        });
        
        // 3. 즉시 응답
        CharacterProfile character = characterService.getCharacter(user.getSelectedCharacter());
        
        return ResponseEntity.ok(SubmissionResponse.builder()
            .submissionId(submission.getId())
            .status("PROCESSING")
            .character(CharacterSummary.from(character))
            .estimatedTime(25)
            .build());
    }
    
    @GetMapping("/{id}/status")
    public ResponseEntity<SubmissionStatusResponse> getStatus(@PathVariable Long id) {
        Submission submission = submissionService.findById(id);
        
        return ResponseEntity.ok(SubmissionStatusResponse.builder()
            .submissionId(id)
            .status(submission.getStatus())
            .progress(calculateProgress(submission))
            .build());
    }
}
```

### 프론트엔드: CharacterContext

```typescript
// contexts/CharacterContext.tsx
interface CharacterProfile {
  id: string;
  name: string;
  emoji: string;
  colorTheme: string;
  dialogues: {
    loading: string[];
    analyzing: string[];
    complete: string[];
  };
}

interface CharacterContextType {
  currentCharacter: CharacterProfile | null;
  selectCharacter: (characterId: string) => Promise<void>;
  getRandomDialogue: (phase: 'loading' | 'analyzing' | 'complete') => string;
}

export const CharacterContext = createContext<CharacterContextType>({} as CharacterContextType);

export const CharacterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCharacter, setCurrentCharacter] = useState<CharacterProfile | null>(null);

  useEffect(() => {
    // 현재 선택된 캐릭터 로드
    api.getCurrentCharacter().then(setCurrentCharacter);
  }, []);

  const selectCharacter = async (characterId: string) => {
    await api.selectCharacter(characterId);
    const profile = await api.getCharacterWithDialogues(characterId);
    setCurrentCharacter(profile);
  };

  const getRandomDialogue = (phase: 'loading' | 'analyzing' | 'complete') => {
    if (!currentCharacter || !currentCharacter.dialogues[phase]) return '';
    const dialogues = currentCharacter.dialogues[phase];
    return dialogues[Math.floor(Math.random() * dialogues.length)];
  };

  return (
    <CharacterContext.Provider value={{ currentCharacter, selectCharacter, getRandomDialogue }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
```

### 프론트엔드: LoadingWithCharacter

```typescript
// components/LoadingWithCharacter.tsx
import { motion } from 'framer-motion';
import { useCharacter } from '../contexts/CharacterContext';

interface LoadingWithCharacterProps {
  submissionId: number;
  onComplete: () => void;
}

export const LoadingWithCharacter: React.FC<LoadingWithCharacterProps> = ({ 
  submissionId, 
  onComplete 
}) => {
  const { currentCharacter, getRandomDialogue } = useCharacter();
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'loading' | 'analyzing' | 'complete'>('loading');
  const [dialogue, setDialogue] = useState('');

  useEffect(() => {
    // 진행률 시뮬레이션
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 800);

    // 대사 변경
    const dialogueInterval = setInterval(() => {
      if (progress < 40) {
        setCurrentPhase('loading');
      } else if (progress < 80) {
        setCurrentPhase('analyzing');
      } else {
        setCurrentPhase('complete');
      }
      setDialogue(getRandomDialogue(currentPhase));
    }, 3000);

    // 실제 상태 폴링
    const statusInterval = setInterval(async () => {
      const status = await api.getSubmissionStatus(submissionId);
      if (status.status === 'COMPLETED') {
        clearInterval(progressInterval);
        clearInterval(dialogueInterval);
        clearInterval(statusInterval);
        setProgress(100);
        setCurrentPhase('complete');
        setDialogue(getRandomDialogue('complete'));
        setTimeout(onComplete, 2000);
      }
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dialogueInterval);
      clearInterval(statusInterval);
    };
  }, [submissionId, currentPhase]);

  if (!currentCharacter) return <div>Loading...</div>;

  return (
    <div 
      className="loading-container"
      style={{ 
        backgroundColor: `${currentCharacter.colorTheme}15`,
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        borderRadius: '20px'
      }}
    >
      {/* 캐릭터 애니메이션 */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: currentPhase === 'analyzing' ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div style={{ fontSize: '5rem' }}>
          {currentCharacter.emoji}
        </div>
        
        {/* 생각 표현 효과 */}
        {currentPhase === 'analyzing' && (
          <motion.div
            style={{ 
              position: 'absolute',
              top: '-20px',
              right: '-30px',
              fontSize: '1.5rem'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            💭📄💡
          </motion.div>
        )}

        {/* 완료 효과 */}
        {currentPhase === 'complete' && progress === 100 && (
          <motion.div
            style={{ 
              position: 'absolute',
              fontSize: '3rem'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.5 }}
          >
            ✨🎉✨
          </motion.div>
        )}
      </motion.div>

      {/* 진행률 바 */}
      <div style={{ 
        width: '100%',
        maxWidth: '400px',
        height: '12px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        margin: '20px 0'
      }}>
        <motion.div
          style={{ 
            height: '100%',
            backgroundColor: currentCharacter.colorTheme,
            borderRadius: '10px',
            boxShadow: `0 0 10px ${currentCharacter.colorTheme}`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#666', margin: '10px 0' }}>
        {Math.round(progress)}%
      </div>

      {/* 대사 말풍선 */}
      <motion.div
        key={dialogue}
        style={{
          marginTop: '20px',
          padding: '20px 30px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          textAlign: 'center'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ fontSize: '1.1rem', color: '#333', lineHeight: 1.6 }}>
          💬 "{dialogue}"
        </div>
      </motion.div>

      {/* 완료 시 버튼 */}
      {progress === 100 && (
        <motion.button
          onClick={onComplete}
          style={{
            marginTop: '30px',
            padding: '15px 40px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: currentCharacter.colorTheme,
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: `0 0 20px ${currentCharacter.colorTheme}80`
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.05, 1],
          }}
          transition={{
            scale: {
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          피드백 확인하기 ✨
        </motion.button>
      )}
    </div>
  );
};
```

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
  
  /* 🆕 캐릭터 테마 */
  --character-cody: #4A90E2;
  --character-owl: #8B4513;
  --character-debuggy: #FF6B6B;
  --character-speedy: #FF8C00;
  --character-coco: #FFB6C1;
  --character-cube: #9B59B6;
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
5. **🆕 재미**: 캐릭터를 통한 즐거운 학습 경험

---

## 🧪 테스트 전략

### 백엔드 테스트 커버리지 목표: 80%
- Controller: MockMvc 테스트
- Service: 비즈니스 로직 단위 테스트
- Repository: @DataJpaTest로 DB 작업 테스트
- 🆕 CharacterService: 캐릭터 선택 및 대사 조회 테스트

### 프론트엔드 테스트
- 컴포넌트: 렌더링 및 상호작용 테스트
- 통합: 페이지 단위 시나리오 테스트
- E2E: 주요 사용자 플로우 테스트
- 🆕 애니메이션: 성능 및 정상 작동 테스트

---

## 🚧 향후 확장 계획

### v2.5 (중기)
1. **캐릭터 레벨업 시스템**
   - 특정 캐릭터와 문제를 많이 풀면 친밀도 상승
   - 레벨업 시 특별 대사나 뱃지 해금

2. **캐릭터 추가**
   - 시즌별 한정 캐릭터
   - 사용자 투표로 신규 캐릭터 선정

3. **효과음 추가**
   - 제출 시 소리
   - 완료 시 축하 사운드

### v3.0 (장기)
1. **소셜 기능**
   - 사용자 간 코드 공유
   - 문제 추천 커뮤니티
   - 같은 캐릭터를 사용하는 사용자 커뮤니티

2. **AI 고도화**
   - 사용자 학습 패턴 분석
   - 개인화된 학습 경로 제안
   - 캐릭터별 특화 피드백 스타일

3. **멀티 플랫폼**
   - iOS/Android 앱 개발
   - VS Code Extension
   - Discord Bot

4. **프리미엄 기능**
   - 무제한 AI 피드백
   - 고급 통계 분석
   - 1:1 멘토링 매칭
   - 전용 캐릭터 해금

---

## 📚 참고 자료

### 백엔드
- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Spring Security OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
- [OpenAI API 문서](https://platform.openai.com/docs)
- [CompletableFuture 가이드](https://www.baeldung.com/java-completablefuture)

### 프론트엔드
- [React 공식 문서](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Recharts](https://recharts.org/)
- [Framer Motion 공식 문서](https://www.framer.com/motion/)
- [React Query](https://tanstack.com/query/latest)

### 데이터베이스
- [PostgreSQL JSON 함수](https://www.postgresql.org/docs/current/functions-json.html)
- [JPA 최적화](https://vladmihalcea.com/tutorials/hibernate/)

### 디자인
- [애니메이션 성능 최적화](https://web.dev/animations/)
- [Material Design 가이드라인](https://material.io/design)

---

## 💡 개발 Tips

### 백엔드
1. **DTO vs Entity 분리**: 외부 노출용 DTO와 내부 Entity를 명확히 구분
2. **예외 처리**: `@ControllerAdvice`로 전역 예외 처리
3. **로깅**: 중요 지점에 로그 남기기 (AI API 호출, 에러 발생)
4. **🆕 비동기 처리**: `@Async`와 CompletableFuture 활용
5. **🆕 캐싱**: 캐릭터 정보는 캐싱하여 성능 향상

### 프론트엔드
1. **상태 관리**: React Query로 서버 상태, Context로 클라이언트 상태 관리
2. **코드 재사용**: 공통 컴포넌트는 `components/common/`에 배치
3. **에러 바운더리**: 예상치 못한 에러 대응
4. **🆕 애니메이션 최적화**: `will-change`, `transform`, `opacity`만 사용
5. **🆕 폴링 최적화**: 적절한 인터벌 설정으로 서버 부하 최소화

### AI 프롬프트
1. **명확한 지시**: JSON 형식 강제
2. **예시 제공**: Few-shot learning 활용
3. **토큰 최적화**: 불필요한 설명 제거

### 캐릭터 시스템 🆕
1. **대사 다양성**: 각 캐릭터당 최소 10개 이상의 대사 준비
2. **일관성**: 캐릭터 성격에 맞는 말투 유지
3. **로컬라이제이션 준비**: 다국어 지원을 위한 구조

---

## ✅ 체크리스트

### 개발 시작 전
- [ ] Google Cloud Console에서 OAuth 클라이언트 ID 발급
- [ ] OpenAI API Key 발급
- [ ] PostgreSQL 설치 및 데이터베이스 생성
- [ ] Git 저장소 생성
- [ ] 🆕 캐릭터 이모지 및 디자인 준비

### 개발 중
- [ ] 각 Phase 완료 시 Git 커밋
- [ ] 코드 리뷰 (가능하면 동료와)
- [ ] 테스트 작성 습관화
- [ ] 🆕 캐릭터별 애니메이션 테스트
- [ ] 🆕 대사 톤앤매너 검토

### 배포 전
- [ ] 환경변수 설정 확인
- [ ] 프로덕션 DB 마이그레이션
- [ ] SSL 인증서 설정
- [ ] 모니터링 도구 연동
- [ ] 🆕 모든 캐릭터 데이터 삽입 확인
- [ ] 🆕 애니메이션 성능 체크

---

## 🎯 성공 지표

1. **기능적 목표**
   - ✅ 사용자가 답안 제출 후 30초 이내 AI 피드백 수신
   - ✅ 모든 제출 내역이 DB에 안전하게 저장
   - ✅ 통계 페이지에서 실시간 데이터 조회
   - ✅ 🆕 로딩 중 이탈률 50% 감소 (캐릭터 시스템 도입 효과)

2. **기술적 목표**
   - ✅ API 응답 시간 평균 1초 이하
   - ✅ 프론트엔드 Lighthouse 점수 90점 이상
   - ✅ 테스트 커버리지 80% 이상
   - ✅ 🆕 애니메이션 60fps 유지

3. **사용자 경험**
   - ✅ 직관적인 UI로 별도 설명 없이 사용 가능
   - ✅ 모바일에서도 원활한 사용
   - ✅ 에러 발생 시 친절한 안내 메시지
   - ✅ 🆕 사용자 만족도 4.5/5.0 이상
   - ✅ 🆕 재방문율 70% 이상 (캐릭터 애착 효과)

---

## 📞 문의 및 지원

프로젝트 개발 중 질문이나 이슈가 있다면:
1. GitHub Issues에 등록
2. 개발 문서 참고
3. 커뮤니티 포럼 활용

---

**작성일**: 2025-10-15  
**최종 수정일**: 2025-10-15  
**버전**: 2.0.0

**주요 변경사항 (v1.0 → v2.0):**
- 🆕 캐릭터 선생님 시스템 추가 (6종 캐릭터)
- 🆕 인터랙티브 로딩 애니메이션 (Framer Motion)
- 🆕 비동기 제출 처리 및 상태 폴링
- 🆕 캐릭터별 대사 시스템
- 🆕 캐릭터 관련 API 및 DB 스키마
- 🆕 CharacterContext 및 관련 컴포넌트
- 개발 기간: 16일 → 18일 (+2일)

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

이제 Codeacher v2.0 개발을 시작할 준비가 되었습니다! 🎉

여러분만의 코딩 선생님과 함께 즐거운 학습을 시작하세요! 🎓✨


