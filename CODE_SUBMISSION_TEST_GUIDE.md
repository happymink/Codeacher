# 코드 제출 테스트 가이드

## 📋 전체 프로세스 개요

```
1. JWT 토큰 발급
   ↓
2. 코드 제출 (POST)
   ↓
3. 상태 확인 (폴링)
   ↓
4. 피드백 조회 (GET)
```

---

## 🚀 단계별 테스트 프로세스

### STEP 1: JWT 토큰 발급

#### API 엔드포인트
```
GET /api/test/auth/token
```

#### 요청 예시
```bash
curl http://localhost:8080/api/test/auth/token
```

#### 응답
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "1",
    "email": "test@example.com"
  }
}
```

#### 토큰 저장
```bash
# 토큰을 변수에 저장
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### STEP 2: 코드 제출

#### API 엔드포인트
```
POST /api/submissions
Authorization: Bearer {token}
Content-Type: application/json
```

#### 요청 Body 구조
```json
{
  "problemSite": "string",      // 필수: BAEKJOON, PROGRAMMERS, LEETCODE 등
  "problemNumber": "string",    // 필수: 문제 번호
  "problemTitle": "string",     // 선택: 문제 제목
  "userCode": "string",         // 필수: 제출한 코드
  "language": "string"          // 필수: JAVA, PYTHON, CPP, JAVASCRIPT 등
}
```

#### 예시 1: 백준 1000번 (A+B) - Java
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "problemSite": "BAEKJOON",
    "problemNumber": "1000",
    "problemTitle": "A+B",
    "userCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n        sc.close();\n    }\n}",
    "language": "JAVA"
  }'
```

#### 예시 2: 백준 2557번 (Hello World) - Python
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "problemSite": "BAEKJOON",
    "problemNumber": "2557",
    "problemTitle": "Hello World",
    "userCode": "print(\"Hello World\")",
    "language": "PYTHON"
  }'
```

#### 예시 3: 백준 10950번 - C++
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "problemSite": "BAEKJOON",
    "problemNumber": "10950",
    "problemTitle": "A+B - 3",
    "userCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int T, a, b;\n    cin >> T;\n    while(T--) {\n        cin >> a >> b;\n        cout << a + b << endl;\n    }\n    return 0;\n}",
    "language": "CPP"
  }'
```

#### 예시 4: 프로그래머스 - JavaScript
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "problemSite": "PROGRAMMERS",
    "problemNumber": "12345",
    "problemTitle": "두 정수 사이의 합",
    "userCode": "function solution(a, b) {\n    let answer = 0;\n    const min = Math.min(a, b);\n    const max = Math.max(a, b);\n    for(let i = min; i <= max; i++) {\n        answer += i;\n    }\n    return answer;\n}",
    "language": "JAVASCRIPT"
  }'
```

#### 응답 (즉시)
```json
{
  "success": true,
  "message": "제출이 완료되었습니다",
  "data": {
    "id": 1,
    "userId": 1,
    "problemSite": "BAEKJOON",
    "problemNumber": "1000",
    "problemTitle": "A+B",
    "userCode": "import java.util.Scanner;...",
    "language": "JAVA",
    "characterId": "cody",
    "status": "PROCESSING",
    "submittedAt": "2025-10-16T15:30:00"
  }
}
```

**중요**: `id` 값을 저장하세요! 다음 단계에서 사용됩니다.

```bash
SUBMISSION_ID=1
```

---

### STEP 3: 제출 상태 확인 (폴링)

AI가 코드를 분석하는 동안 진행 상태를 확인합니다.

#### API 엔드포인트
```
GET /api/submissions/{submissionId}/status
Authorization: Bearer {token}
```

#### 요청
```bash
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8080/api/submissions/$SUBMISSION_ID/status
```

#### 응답 예시 (진행 중)
```json
{
  "success": true,
  "data": {
    "submissionId": 1,
    "status": "PROCESSING",
    "progress": 60
  }
}
```

#### 상태 값
- `PROCESSING`: 분석 중 (progress: 0~99)
- `COMPLETED`: 완료 (progress: 100)
- `FAILED`: 실패

#### 폴링 스크립트 예시
```bash
# 완료될 때까지 2초마다 상태 확인
while true; do
  STATUS=$(curl -s -H "Authorization: Bearer $TOKEN" \
    http://localhost:8080/api/submissions/$SUBMISSION_ID/status | \
    jq -r '.data.status')
  
  PROGRESS=$(curl -s -H "Authorization: Bearer $TOKEN" \
    http://localhost:8080/api/submissions/$SUBMISSION_ID/status | \
    jq -r '.data.progress')
  
  echo "Status: $STATUS, Progress: $PROGRESS%"
  
  if [ "$STATUS" = "COMPLETED" ] || [ "$STATUS" = "FAILED" ]; then
    break
  fi
  
  sleep 2
done
```

---

### STEP 4: 피드백 조회

상태가 `COMPLETED`가 되면 전체 피드백을 조회합니다.

#### API 엔드포인트
```
GET /api/submissions/{submissionId}
Authorization: Bearer {token}
```

#### 요청
```bash
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8080/api/submissions/$SUBMISSION_ID
```

#### 응답 (피드백 포함)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": 1,
    "problemSite": "BAEKJOON",
    "problemNumber": "1000",
    "problemTitle": "A+B",
    "problemType": "구현",
    "userCode": "import java.util.Scanner;...",
    "language": "JAVA",
    "characterId": "cody",
    "status": "COMPLETED",
    "submittedAt": "2025-10-16T15:30:00",
    "feedback": {
      "id": 1,
      "overallFeedback": "전반적으로 깔끔하게 작성된 코드입니다. Scanner를 사용한 입력 처리가 적절합니다.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "alternativeApproach": "BufferedReader를 사용하면 더 빠른 입력 처리가 가능합니다.",
      "feedbacks": [
        "Scanner를 올바르게 사용했습니다.",
        "변수명이 명확합니다.",
        "리소스를 적절히 해제했습니다."
      ],
      "keyPoints": [
        "Scanner의 close() 메서드를 호출하여 리소스 누수를 방지했습니다.",
        "간단한 문제에 적합한 구조입니다."
      ],
      "warnings": [
        "대량의 입력을 처리해야 한다면 BufferedReader를 고려하세요."
      ],
      "createdAt": "2025-10-16T15:30:15"
    }
  }
}
```

---

## 🔄 전체 테스트 스크립트 (Bash)

```bash
#!/bin/bash

echo "=== 코드 제출 테스트 시작 ==="

# 1. 토큰 발급
echo "1. JWT 토큰 발급 중..."
TOKEN=$(curl -s http://localhost:8080/api/test/auth/token | jq -r '.data.accessToken')
echo "✅ 토큰 발급 완료"

# 2. 코드 제출
echo ""
echo "2. 코드 제출 중..."
SUBMISSION_RESPONSE=$(curl -s -X POST http://localhost:8080/api/submissions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "problemSite": "BAEKJOON",
    "problemNumber": "1000",
    "problemTitle": "A+B",
    "userCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n        sc.close();\n    }\n}",
    "language": "JAVA"
  }')

SUBMISSION_ID=$(echo $SUBMISSION_RESPONSE | jq -r '.data.id')
echo "✅ 제출 완료: ID=$SUBMISSION_ID"

# 3. 상태 확인 (폴링)
echo ""
echo "3. AI 피드백 생성 대기 중..."
while true; do
  STATUS_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
    http://localhost:8080/api/submissions/$SUBMISSION_ID/status)
  
  STATUS=$(echo $STATUS_RESPONSE | jq -r '.data.status')
  PROGRESS=$(echo $STATUS_RESPONSE | jq -r '.data.progress')
  
  echo "   상태: $STATUS, 진행률: $PROGRESS%"
  
  if [ "$STATUS" = "COMPLETED" ]; then
    echo "✅ 분석 완료!"
    break
  elif [ "$STATUS" = "FAILED" ]; then
    echo "❌ 분석 실패"
    exit 1
  fi
  
  sleep 2
done

# 4. 피드백 조회
echo ""
echo "4. 피드백 조회 중..."
FEEDBACK=$(curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/submissions/$SUBMISSION_ID)

echo "✅ 피드백 조회 완료"
echo ""
echo "=== 피드백 결과 ==="
echo $FEEDBACK | jq '.data.feedback'

echo ""
echo "=== 테스트 완료 ==="
```

---

## 📝 IntelliJ HTTP Client로 테스트

`backend/api-test.http` 파일에 다음 순서로 실행:

### 1️⃣ 토큰 발급
```http
### 0.1 간단한 테스트 토큰 발급 - GET 요청
GET {{baseUrl}}/api/test/auth/token
Accept: application/json
```

**응답에서 accessToken 복사 → 상단의 @accessToken 변수에 붙여넣기**

### 2️⃣ 코드 제출
```http
### 4.1 코드 제출
POST {{baseUrl}}/api/submissions
Authorization: Bearer {{accessToken}}
Content-Type: application/json

{
  "problemSite": "BAEKJOON",
  "problemNumber": "1000",
  "problemTitle": "A+B",
  "userCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n        sc.close();\n    }\n}",
  "language": "JAVA"
}
```

**응답에서 id 값 확인 (예: 1)**

### 3️⃣ 상태 확인 (2~3초 간격으로 반복 실행)
```http
### 4.4 제출 상태 조회
GET {{baseUrl}}/api/submissions/1/status
Authorization: Bearer {{accessToken}}
Accept: application/json
```

**status가 COMPLETED가 될 때까지 반복**

### 4️⃣ 피드백 조회
```http
### 4.3 특정 제출 조회
GET {{baseUrl}}/api/submissions/1
Authorization: Bearer {{accessToken}}
Accept: application/json
```

---

## 📊 응답 필드 설명

### SubmissionResponse

| 필드 | 타입 | 설명 |
|------|------|------|
| id | Long | 제출 ID |
| userId | Long | 사용자 ID |
| problemSite | String | 문제 사이트 (BAEKJOON, PROGRAMMERS 등) |
| problemNumber | String | 문제 번호 |
| problemTitle | String | 문제 제목 |
| problemType | String | 문제 유형 (구현, DP, 그리디 등) |
| userCode | String | 제출한 코드 |
| language | String | 프로그래밍 언어 |
| characterId | String | 선택한 캐릭터 ID |
| status | String | PROCESSING, COMPLETED, FAILED |
| submittedAt | DateTime | 제출 시간 |
| feedback | FeedbackResponse | 피드백 (완료 시에만) |

### FeedbackResponse

| 필드 | 타입 | 설명 |
|------|------|------|
| id | Long | 피드백 ID |
| overallFeedback | String | 전반적인 피드백 |
| timeComplexity | String | 시간 복잡도 (예: O(n)) |
| spaceComplexity | String | 공간 복잡도 (예: O(1)) |
| alternativeApproach | String | 대안적 접근 방법 |
| feedbacks | List<String> | 세부 피드백 목록 |
| keyPoints | List<String> | 핵심 포인트 목록 |
| warnings | List<String> | 주의사항 목록 |
| createdAt | DateTime | 생성 시간 |

---

## 🎯 추가 API 엔드포인트

### 제출 내역 조회 (페이지네이션)
```
GET /api/submissions?page=0&size=20&sort=submittedAt,desc
Authorization: Bearer {token}
```

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8080/api/submissions?page=0&size=10"
```

응답:
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "problemTitle": "A+B",
        "status": "COMPLETED",
        "submittedAt": "2025-10-16T15:30:00"
      }
    ],
    "totalElements": 10,
    "totalPages": 1,
    "currentPage": 0
  }
}
```

---

## ⚠️ 주의사항

### 1. OpenAI API 키 필요
실제 AI 피드백을 받으려면 `.env` 파일 또는 환경 변수에 OpenAI API 키가 설정되어 있어야 합니다.

```bash
OPENAI_API_KEY=sk-...
```

키가 없으면 AI 피드백 생성 시 실패합니다.

### 2. 비동기 처리
코드 제출 후 피드백 생성은 **비동기**로 처리됩니다.
- 제출 즉시 `PROCESSING` 상태로 응답
- 백그라운드에서 AI 분석 진행
- 완료되면 `COMPLETED` 상태로 변경

### 3. 폴링 주기
상태 확인은 2~3초 간격으로 폴링하는 것을 권장합니다.

### 4. 타임아웃
AI 분석이 오래 걸릴 수 있습니다 (10초~30초).

---

## 🐛 문제 해결

### 401 Unauthorized
→ JWT 토큰이 없거나 만료됨. 새로 발급 필요.

### 404 Not Found (제출 조회)
→ submissionId가 잘못되었거나, 다른 사용자의 제출을 조회하려고 함.

### FAILED 상태
→ AI 피드백 생성 실패. 서버 로그 확인:
- OpenAI API 키 확인
- API 호출 제한 확인
- 네트워크 연결 확인

### 피드백이 null
→ 아직 분석이 완료되지 않음. 상태를 먼저 확인하세요.

---

## 📚 관련 문서

- [API 테스트 가이드](./API_TEST_GUIDE.md)
- [JWT 토큰 가이드](./TEST_JWT_GUIDE.md)
- [DB 초기화 가이드](./INIT_DB_GUIDE.md)

