# 빠른 테스트 참조 가이드

## 🚀 5분 안에 전체 테스트하기

### 1️⃣ 토큰 발급 (5초)
```bash
curl http://localhost:8080/api/test/auth/token
```
→ `accessToken` 복사

### 2️⃣ 코드 제출 (5초)
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Authorization: Bearer {토큰}" \
  -H "Content-Type: application/json" \
  -d '{
    "problemSite": "BAEKJOON",
    "problemNumber": "1000",
    "problemTitle": "A+B",
    "userCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}",
    "language": "JAVA"
  }'
```
→ `id` 저장 (예: 1)

### 3️⃣ 상태 확인 (반복)
```bash
curl -H "Authorization: Bearer {토큰}" \
  http://localhost:8080/api/submissions/1/status
```
→ `status`가 `COMPLETED` 될 때까지

### 4️⃣ 피드백 조회
```bash
curl -H "Authorization: Bearer {토큰}" \
  http://localhost:8080/api/submissions/1
```

---

## 📋 주요 엔드포인트

| API | Method | 인증 | 설명 |
|-----|--------|------|------|
| `/api/test/auth/token` | GET | ❌ | 토큰 발급 |
| `/api/characters` | GET | ❌ | 캐릭터 목록 |
| `/api/submissions` | POST | ✅ | 코드 제출 |
| `/api/submissions/{id}/status` | GET | ✅ | 상태 확인 |
| `/api/submissions/{id}` | GET | ✅ | 피드백 조회 |
| `/api/submissions` | GET | ✅ | 제출 내역 |

---

## 💾 샘플 제출 데이터

### 백준 1000번 - Java
```json
{
  "problemSite": "BAEKJOON",
  "problemNumber": "1000",
  "problemTitle": "A+B",
  "userCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}",
  "language": "JAVA"
}
```

### 백준 2557번 - Python
```json
{
  "problemSite": "BAEKJOON",
  "problemNumber": "2557",
  "problemTitle": "Hello World",
  "userCode": "print('Hello World')",
  "language": "PYTHON"
}
```

### 프로그래머스 - JavaScript
```json
{
  "problemSite": "PROGRAMMERS",
  "problemNumber": "12345",
  "problemTitle": "두 정수 사이의 합",
  "userCode": "function solution(a, b) {\n    let answer = 0;\n    const min = Math.min(a, b);\n    const max = Math.max(a, b);\n    for(let i = min; i <= max; i++) {\n        answer += i;\n    }\n    return answer;\n}",
  "language": "JAVASCRIPT"
}
```

### LeetCode - Python
```json
{
  "problemSite": "LEETCODE",
  "problemNumber": "1",
  "problemTitle": "Two Sum",
  "userCode": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        hashmap = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in hashmap:\n                return [hashmap[complement], i]\n            hashmap[num] = i\n        return []",
  "language": "PYTHON"
}
```

---

## 🎯 응답 상태 코드

| Status | 설명 | Progress |
|--------|------|----------|
| `PROCESSING` | AI 분석 중 | 0~99% |
| `COMPLETED` | 완료 | 100% |
| `FAILED` | 실패 | - |

---

## 📱 IntelliJ 사용법

1. `backend/api-test.http` 열기
2. "0.1 토큰 발급" 실행 → `accessToken` 복사
3. 상단 `@accessToken` 변수에 붙여넣기
4. "4.1 코드 제출" 실행 → `id` 확인
5. "4.4 제출 상태" 반복 실행 (COMPLETED 될 때까지)
6. "4.3 특정 제출 조회" 실행 → 피드백 확인

---

## ⚡ 전체 자동화 스크립트

```bash
# 변수 설정
BASE_URL="http://localhost:8080"

# 1. 토큰 발급
echo "토큰 발급 중..."
TOKEN=$(curl -s $BASE_URL/api/test/auth/token | jq -r '.data.accessToken')
echo "✅ 토큰: ${TOKEN:0:20}..."

# 2. 코드 제출
echo "코드 제출 중..."
SUBMISSION_ID=$(curl -s -X POST $BASE_URL/api/submissions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "problemSite": "BAEKJOON",
    "problemNumber": "1000",
    "problemTitle": "A+B",
    "userCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}",
    "language": "JAVA"
  }' | jq -r '.data.id')
echo "✅ 제출 ID: $SUBMISSION_ID"

# 3. 상태 확인 (폴링)
echo "AI 분석 대기 중..."
while true; do
  STATUS=$(curl -s -H "Authorization: Bearer $TOKEN" \
    $BASE_URL/api/submissions/$SUBMISSION_ID/status | jq -r '.data.status')
  PROGRESS=$(curl -s -H "Authorization: Bearer $TOKEN" \
    $BASE_URL/api/submissions/$SUBMISSION_ID/status | jq -r '.data.progress')
  
  echo "  $STATUS ($PROGRESS%)"
  
  [ "$STATUS" = "COMPLETED" ] && break
  [ "$STATUS" = "FAILED" ] && exit 1
  sleep 2
done

# 4. 피드백 조회
echo "✅ 분석 완료! 피드백 조회 중..."
curl -s -H "Authorization: Bearer $TOKEN" \
  $BASE_URL/api/submissions/$SUBMISSION_ID | jq '.data.feedback'
```

저장 후 실행:
```bash
chmod +x test-submission.sh
./test-submission.sh
```

---

## 🔧 문제 해결

| 문제 | 해결 |
|------|------|
| 401 Unauthorized | 토큰 재발급 |
| 404 Not Found | submissionId 확인 |
| FAILED 상태 | OpenAI API 키 확인 |
| 피드백 null | 상태가 COMPLETED인지 확인 |

---

## 📚 상세 가이드

자세한 내용은 다음 문서를 참조하세요:
- [코드 제출 테스트 전체 가이드](./CODE_SUBMISSION_TEST_GUIDE.md)
- [API 테스트 가이드](./API_TEST_GUIDE.md)
- [JWT 토큰 가이드](./TEST_JWT_GUIDE.md)

