# API 테스트 가이드

## 서버 실행

```bash
cd backend
mvn spring-boot:run
```

서버가 `http://localhost:8080`에서 실행됩니다.

## 테스트 방법

### 방법 1: IntelliJ IDEA (추천)

1. `backend/api-test.http` 파일 열기
2. 각 요청 옆의 **▶️ 버튼** 클릭하여 실행
3. 응답 결과가 하단에 표시됨

### 방법 2: VS Code with REST Client 확장

1. [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 확장 설치
2. `backend/api-test.http` 파일 열기
3. 요청 위의 **Send Request** 링크 클릭

### 방법 3: cURL

```bash
# 모든 캐릭터 조회
curl -X GET http://localhost:8080/api/characters

# 특정 캐릭터 조회
curl -X GET http://localhost:8080/api/characters/cody
```

### 방법 4: Postman

1. Postman 실행
2. 아래 예시 참고하여 요청 생성

---

## 🔑 테스트용 JWT 토큰 발급 (개발 환경 전용)

Google OAuth 없이 테스트할 수 있도록 개발 환경에서만 사용 가능한 테스트 인증 API를 제공합니다.

### 방법 1: 간단한 GET 요청

```bash
curl http://localhost:8080/api/test/auth/token
```

응답 예시:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "1",
    "email": "test@example.com",
    "message": "이 토큰을 Authorization: Bearer {token} 헤더에 사용하세요"
  }
}
```

### 방법 2: 이메일 지정

```bash
curl "http://localhost:8080/api/test/auth/token?email=mytest@example.com"
```

### 방법 3: POST로 이름까지 지정

```bash
curl -X POST http://localhost:8080/api/test/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "name": "홍길동"}'
```

### IntelliJ에서 사용하기

1. `backend/api-test.http` 파일 열기
2. **"0.1 간단한 테스트 토큰 발급"** 실행 (▶️ 버튼 클릭)
3. 응답에서 `accessToken` 값 복사
4. 파일 상단의 `@accessToken` 변수에 붙여넣기:
   ```
   @accessToken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
5. 이제 모든 인증 필요 API에서 `{{accessToken}}` 사용 가능!

---

## 📋 API 엔드포인트 목록

### 🔓 인증 불필요 API (테스트 가능)

#### 1. 캐릭터 조회

**모든 캐릭터 조회**
```http
GET http://localhost:8080/api/characters
```

**특정 캐릭터 조회**
```http
GET http://localhost:8080/api/characters/{characterId}
```

사용 가능한 캐릭터 ID:
- `cody` - 코디봇
- `prof_owl` - 올빼미 교수
- `debuggy` - 디버기
- `speedy` - 스피디
- `coco` - 코코
- `prof_cube` - 큐브 교수

#### 2. 로그아웃

```http
POST http://localhost:8080/api/auth/logout
```

---

### 🔒 인증 필요 API (JWT 토큰 필요)

> **주의**: 아래 API들은 Google OAuth 로그인을 통해 받은 JWT 토큰이 필요합니다.

#### Header에 토큰 추가:
```
Authorization: Bearer {your-jwt-token}
```

#### 1. 사용자 정보

**현재 사용자 정보**
```http
GET http://localhost:8080/api/auth/me
Authorization: Bearer {token}
```

**현재 선택된 캐릭터**
```http
GET http://localhost:8080/api/characters/current
Authorization: Bearer {token}
```

**캐릭터 변경**
```http
PUT http://localhost:8080/api/characters/select/prof_owl
Authorization: Bearer {token}
```

#### 2. 코드 제출

**코드 제출**
```http
POST http://localhost:8080/api/submissions
Authorization: Bearer {token}
Content-Type: application/json

{
  "problemSite": "BAEKJOON",
  "problemNumber": "1000",
  "problemTitle": "A+B",
  "language": "JAVA",
  "code": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}",
  "testCases": [
    {
      "input": "1 2",
      "expectedOutput": "3"
    }
  ],
  "executionTime": 120,
  "memoryUsage": 11420
}
```

**제출 내역 조회**
```http
GET http://localhost:8080/api/submissions?page=0&size=10&sort=submittedAt,desc
Authorization: Bearer {token}
```

**특정 제출 조회**
```http
GET http://localhost:8080/api/submissions/{submissionId}
Authorization: Bearer {token}
```

**제출 상태 조회**
```http
GET http://localhost:8080/api/submissions/{submissionId}/status
Authorization: Bearer {token}
```

#### 3. 통계

**사용자 통계**
```http
GET http://localhost:8080/api/statistics/summary
Authorization: Bearer {token}
```

---

## 🎯 빠른 테스트 시나리오

### 1단계: 캐릭터 조회 (인증 불필요)

```bash
curl http://localhost:8080/api/characters
```

예상 응답:
```json
{
  "success": true,
  "data": [
    {
      "id": "cody",
      "name": "코디봇",
      "emoji": "🤖",
      "description": "친절한 코딩 선생님",
      "personality": "차분하고 체계적",
      "feedbackStyle": "기본적이고 친절한 설명"
    },
    ...
  ]
}
```

### 2단계: 특정 캐릭터 조회

```bash
curl http://localhost:8080/api/characters/cody
```

### 3단계: Google OAuth 로그인 (프론트엔드 필요)

> Google OAuth는 프론트엔드를 통해서만 가능합니다.
> 로그인 후 받은 JWT 토큰을 복사하여 사용하세요.

### 4단계: JWT 토큰으로 인증 API 테스트

```bash
# 토큰을 변수에 저장
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
       "code": "import java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(); int b = sc.nextInt(); System.out.println(a + b); } }",
       "testCases": [{"input": "1 2", "expectedOutput": "3"}],
       "executionTime": 120,
       "memoryUsage": 11420
     }'
```

---

## 📝 필드 설명

### SubmissionRequest

| 필드 | 타입 | 필수 | 설명 | 예시 |
|------|------|------|------|------|
| problemSite | String | ✅ | 문제 사이트 | "BAEKJOON", "PROGRAMMERS", "LEETCODE" |
| problemNumber | String | ✅ | 문제 번호 | "1000", "12345" |
| problemTitle | String | ✅ | 문제 제목 | "A+B" |
| language | String | ✅ | 프로그래밍 언어 | "JAVA", "PYTHON", "CPP", "JAVASCRIPT" |
| code | String | ✅ | 제출 코드 | "public class Main {...}" |
| testCases | Array | ✅ | 테스트 케이스 | [{"input": "1 2", "expectedOutput": "3"}] |
| executionTime | Double | ❌ | 실행 시간 (ms) | 120.5 |
| memoryUsage | Double | ❌ | 메모리 사용량 (KB) | 11420 |

---

## 🐛 문제 해결

### 1. 서버가 시작되지 않는 경우

**PostgreSQL이 실행 중인지 확인:**
```bash
docker-compose ps
```

**PostgreSQL 시작:**
```bash
docker-compose up -d postgres
```

### 2. CORS 에러

현재 설정:
```yaml
cors:
  allowed-origins: http://localhost:5173,http://localhost:8080
```

다른 포트에서 테스트하려면 `application.yml` 수정 필요

### 3. 401 Unauthorized

- JWT 토큰이 없거나 만료됨
- Google OAuth로 다시 로그인 필요

### 4. 404 Not Found

- URL 확인 (대소문자 구분)
- 서버가 실행 중인지 확인

---

## 🔍 데이터베이스 확인

PostgreSQL에 직접 접속하여 데이터 확인:

```bash
docker-compose exec postgres psql -U postgres -d codeacher
```

유용한 SQL:
```sql
-- 모든 사용자 조회
SELECT * FROM users;

-- 모든 제출 조회
SELECT * FROM submissions;

-- 모든 캐릭터 조회
SELECT * FROM characters;

-- 특정 사용자의 제출 내역
SELECT * FROM submissions WHERE user_id = 1;
```

---

## 📚 추가 정보

- **API 문서**: Swagger UI는 추후 추가 예정
- **로그 확인**: 콘솔에서 실시간 로그 확인 가능
- **디버그 모드**: `application.yml`에 이미 디버그 로그 활성화됨

