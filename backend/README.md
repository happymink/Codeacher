# Codeacher Backend

AI를 활용한 코딩테스트 피드백 선생님 프로그램의 백엔드 서버입니다.

## 🛠 기술 스택

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Spring Security + OAuth2**
- **PostgreSQL 15**
- **OpenAI GPT-4 API**
- **JWT (JSON Web Token)**

## 📋 주요 기능

- 구글 OAuth 2.0 로그인
- 코딩 테스트 답안 제출 및 AI 피드백 생성
- 캐릭터 선생님 시스템 (6종 캐릭터)
- 문제풀이 내역 관리
- 학습 통계 분석 (문제 유형별 분포, 주간 진척도, 약점 분석)

## 🚀 시작하기

### 사전 요구사항

- Java 17 이상
- Maven 3.6 이상
- PostgreSQL 15 이상
- OpenAI API Key
- Google OAuth 2.0 Credentials

### 데이터베이스 설정

```bash
# PostgreSQL 데이터베이스 생성
createdb codeacher

# 또는 psql에서
CREATE DATABASE codeacher;
```

### 환경 변수 설정

1. `.env.example` 파일을 `.env`로 복사:
```bash
cp .env.example .env
```

2. `.env` 파일을 편집하여 실제 값을 입력:
```env
DB_USERNAME=postgres
DB_PASSWORD=your_password

GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

JWT_SECRET=your_very_long_secret_key_at_least_256_bits

OPENAI_API_KEY=sk-your_openai_api_key

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8080
```

### Google OAuth 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. **API 및 서비스 > 사용자 인증 정보** 메뉴로 이동
3. **OAuth 2.0 클라이언트 ID** 생성
4. 승인된 리디렉션 URI 추가:
   - `http://localhost:8080/login/oauth2/code/google`
5. 클라이언트 ID와 클라이언트 보안 비밀번호를 `.env`에 저장

### OpenAI API 키 발급

1. [OpenAI Platform](https://platform.openai.com/)에서 계정 생성
2. **API Keys** 메뉴에서 새 키 생성
3. 발급받은 키를 `.env`에 저장

### 빌드 및 실행

```bash
# 의존성 설치 및 빌드
mvn clean install

# 애플리케이션 실행
mvn spring-boot:run
```

서버는 기본적으로 `http://localhost:8080`에서 실행됩니다.

## 📁 프로젝트 구조

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/codeacher/
│   │   │   ├── config/              # 설정 클래스
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   └── AsyncConfig.java
│   │   │   ├── controller/          # REST API 컨트롤러
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── CharacterController.java
│   │   │   │   ├── SubmissionController.java
│   │   │   │   └── StatisticsController.java
│   │   │   ├── service/             # 비즈니스 로직
│   │   │   │   ├── UserService.java
│   │   │   │   ├── CharacterService.java
│   │   │   │   ├── SubmissionService.java
│   │   │   │   ├── AIFeedbackService.java
│   │   │   │   └── StatisticsService.java
│   │   │   ├── repository/          # JPA Repository
│   │   │   ├── entity/              # JPA Entity
│   │   │   ├── dto/                 # DTO 클래스
│   │   │   ├── security/            # 보안 관련
│   │   │   ├── util/                # 유틸리티
│   │   │   └── exception/           # 예외 처리
│   │   └── resources/
│   │       ├── application.yml      # 설정 파일
│   │       └── data.sql             # 초기 데이터
│   └── test/                        # 테스트 코드
├── pom.xml                          # Maven 설정
└── README.md
```

## 🔌 주요 API 엔드포인트

### 인증
- `POST /api/auth/google` - 구글 로그인
- `GET /api/auth/me` - 현재 사용자 정보
- `POST /api/auth/logout` - 로그아웃

### 캐릭터
- `GET /api/characters` - 전체 캐릭터 목록
- `GET /api/characters/{id}` - 특정 캐릭터 조회
- `GET /api/characters/current` - 현재 선택된 캐릭터
- `PUT /api/characters/select/{id}` - 캐릭터 선택

### 제출
- `POST /api/submissions` - 코드 제출
- `GET /api/submissions` - 제출 내역 목록
- `GET /api/submissions/{id}` - 특정 제출 조회
- `GET /api/submissions/{id}/status` - 제출 상태 확인

### 통계
- `GET /api/statistics/summary` - 사용자 통계 요약

## 🧪 테스트

```bash
# 전체 테스트 실행
mvn test

# 특정 테스트 클래스 실행
mvn test -Dtest=UserServiceTest
```

## 🔧 개발 모드

개발 모드에서는 H2 인메모리 데이터베이스를 사용할 수 있습니다:

```yaml
# application-dev.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true
```

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## 📝 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.

## 🤝 기여

버그 리포트나 기능 제안은 Issues에 등록해주세요.


