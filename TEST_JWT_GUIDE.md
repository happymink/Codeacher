# 테스트용 JWT 토큰 사용 가이드

## 🎯 개요

실제 Google OAuth 로그인 없이 JWT 토큰을 발급받아 인증이 필요한 API를 테스트할 수 있습니다.

> ⚠️ **주의**: 이 API는 개발 환경(`dev`, `local`, `default` 프로파일)에서만 작동합니다. 프로덕션에서는 자동으로 비활성화됩니다.

---

## 🚀 빠른 시작

### 1단계: 테스트 토큰 발급

```bash
curl http://localhost:8080/api/test/auth/token
```

### 2단계: 응답에서 토큰 복사

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzM0MzE2ODAwLCJleHAiOjE3MzQ0MDMyMDB9.xxx",
    "userId": "1",
    "email": "test@example.com",
    "message": "이 토큰을 Authorization: Bearer {token} 헤더에 사용하세요"
  }
}
```

### 3단계: 토큰으로 인증 API 호출

```bash
# accessToken 값을 변수에 저장
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 사용자 정보 조회
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8080/api/auth/me

# 코드 제출
curl -X POST http://localhost:8080/api/submissions \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "problemSite": "BAEKJOON",
       "problemNumber": "1000",
       "problemTitle": "A+B",
       "language": "JAVA",
       "code": "public class Main { ... }",
       "testCases": [{"input": "1 2", "expectedOutput": "3"}]
     }'
```

---

## 📝 API 엔드포인트

### GET `/api/test/auth/token`

가장 간단한 방법. 기본 테스트 사용자로 토큰 발급.

**요청:**
```bash
curl http://localhost:8080/api/test/auth/token
```

**쿼리 파라미터:**
- `email` (선택): 사용자 이메일 (기본값: `test@example.com`)

**응답:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "userId": "1",
    "email": "test@example.com",
    "message": "이 토큰을 Authorization: Bearer {token} 헤더에 사용하세요"
  }
}
```

---

### POST `/api/test/auth/login`

이메일과 이름을 지정하여 토큰 발급.

**요청:**
```bash
curl -X POST http://localhost:8080/api/test/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "홍길동"
  }'
```

**Body:**
```json
{
  "email": "user@example.com",  // 선택, 기본값: test@example.com
  "name": "홍길동"              // 선택, 기본값: 테스트 사용자
}
```

**응답:**
```json
{
  "success": true,
  "message": "테스트 로그인 성공",
  "data": {
    "accessToken": "eyJ...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "홍길동",
      "profileImageUrl": "https://via.placeholder.com/150",
      "selectedCharacter": "cody"
    }
  }
}
```

---

## 💡 IntelliJ / VS Code에서 사용하기

### IntelliJ IDEA

1. `backend/api-test.http` 파일 열기
2. 맨 위 섹션 **"0. 테스트용 JWT 토큰 발급"** 찾기
3. **"0.1 간단한 테스트 토큰 발급"** 옆 ▶️ 버튼 클릭
4. 응답 창에서 `accessToken` 값 복사 (큰따옴표 제외)
5. 파일 최상단으로 스크롤:
   ```http
   @accessToken = your-jwt-token-here
   ```
6. `your-jwt-token-here`를 복사한 토큰으로 교체:
   ```http
   @accessToken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
7. 이제 `{{accessToken}}`을 사용하는 모든 요청이 작동합니다!

### 예시

```http
### 사용자 정보 조회
GET {{baseUrl}}/api/auth/me
Authorization: Bearer {{accessToken}}
Accept: application/json
```

---

## 🔍 동작 방식

1. **사용자 조회/생성**
   - 요청한 이메일로 사용자를 DB에서 검색
   - 없으면 자동으로 새 테스트 사용자 생성
   - Google ID는 `test_` + 이메일 해시코드로 생성

2. **JWT 토큰 발급**
   - 실제 `JwtTokenProvider`를 사용하여 정식 JWT 생성
   - 토큰 내용: userId, email
   - 유효기간: 24시간 (설정에 따라 다름)

3. **인증**
   - 발급받은 토큰은 실제 Google OAuth로 받은 토큰과 동일하게 작동
   - 모든 인증 필요 API에서 사용 가능

---

## 🎓 실전 테스트 시나리오

### 시나리오 1: 코드 제출부터 피드백 조회까지

```bash
# 1. 토큰 발급
TOKEN=$(curl -s http://localhost:8080/api/test/auth/token | jq -r '.data.accessToken')

# 2. 사용자 정보 확인
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8080/api/auth/me

# 3. 캐릭터 선택
curl -X PUT http://localhost:8080/api/characters/select/prof_owl \
     -H "Authorization: Bearer $TOKEN"

# 4. 코드 제출
SUBMISSION_ID=$(curl -s -X POST http://localhost:8080/api/submissions \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{...}' | jq -r '.data.id')

# 5. 제출 상태 확인
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8080/api/submissions/$SUBMISSION_ID/status

# 6. 통계 확인
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8080/api/statistics/summary
```

### 시나리오 2: 여러 사용자 시뮬레이션

```bash
# 사용자 1
curl "http://localhost:8080/api/test/auth/token?email=user1@example.com"

# 사용자 2
curl "http://localhost:8080/api/test/auth/token?email=user2@example.com"

# 사용자 3
curl -X POST http://localhost:8080/api/test/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user3@example.com", "name": "김철수"}'
```

---

## ⚠️ 주의사항

### 1. 개발 환경에서만 사용

- 프로덕션 배포 시 자동으로 비활성화됨 (`@Profile` 설정)
- 실수로 프로덕션에 배포해도 404 에러 발생

### 2. 데이터베이스

- 테스트로 생성된 사용자는 실제 DB에 저장됨
- 개발 DB를 초기화하려면:
  ```bash
  docker-compose down -v
  docker-compose up -d postgres
  ```

### 3. 토큰 유효기간

- 기본 24시간 후 만료
- 만료되면 새로 발급받아야 함

### 4. 보안

- 이 API는 인증 없이 누구나 호출 가능
- 절대 프로덕션에서 사용하지 말 것
- 로컬 개발/테스트 용도로만 사용

---

## 🐛 문제 해결

### 404 Not Found

**원인**: 프로덕션 프로파일로 실행 중

**해결**:
```bash
# application.yml 확인
spring:
  profiles:
    active: dev  # 또는 local

# 또는 실행 시 지정
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### 500 Internal Server Error

**원인**: PostgreSQL이 실행되지 않음

**해결**:
```bash
docker-compose up -d postgres
```

### 토큰이 작동하지 않음 (401 Unauthorized)

**원인**: 
- 토큰이 만료됨
- 토큰 복사 시 실수 (공백, 따옴표 포함 등)

**해결**:
- 새 토큰 발급
- 토큰 앞뒤 공백 제거 확인
- `Bearer` 키워드 포함 확인: `Authorization: Bearer {token}`

---

## 📚 관련 문서

- [API 테스트 가이드](./API_TEST_GUIDE.md)
- [Docker 설정 가이드](./DOCKER_SETUP.md)
- [프로젝트 계획](./PROJECT_PLAN_v2.md)

---

## 🎉 이제 시작하세요!

```bash
# 1. PostgreSQL 실행
docker-compose up -d postgres

# 2. 백엔드 실행
cd backend
mvn spring-boot:run

# 3. 토큰 발급
curl http://localhost:8080/api/test/auth/token

# 4. Happy Testing! 🚀
```

