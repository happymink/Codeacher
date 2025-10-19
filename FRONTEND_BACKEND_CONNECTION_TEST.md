# 프론트엔드 ↔ 백엔드 연결 테스트 가이드

## 📊 현재 설정 확인

### Mock 모드 vs 백엔드 모드

프론트엔드는 `.env.local` 파일의 `VITE_USE_MOCK` 값으로 모드를 결정합니다.

```env
# .env.local

# Mock 모드 (프론트엔드 Mock 데이터 사용)
VITE_USE_MOCK=true

# 백엔드 모드 (실제 백엔드 API 호출) ✅ 이것으로 설정
VITE_USE_MOCK=false
VITE_API_URL=http://localhost:8080
```

---

## ✅ `.env.local` 파일 생성

파일 위치:
```
frontend/prompt-to-ui-korean-main/prompt-to-ui-korean-main/.env.local
```

파일 내용:
```env
# API 설정
VITE_API_URL=http://localhost:8080

# Mock 모드 비활성화 (실제 백엔드 사용)
VITE_USE_MOCK=false
```

---

## 🔄 변경 사항 적용

### 1. `.env.local` 파일 생성/수정 후
```bash
# 프론트엔드 재시작 필수!
Ctrl + C
npm run dev
```

### 2. 브라우저 콘솔 확인
```
🔧 API 모드: 실제 백엔드 연결  ✅
```

이렇게 표시되어야 합니다!

만약 "Mock 데이터 사용"이 표시되면:
- `.env.local` 파일을 다시 확인
- 프론트엔드를 완전히 재시작
- 브라우저 캐시 삭제 (Ctrl + Shift + R)

---

## 🧪 백엔드 호출 테스트

### 전체 플로우
```
1. 로그인
   ↓
   GET /api/test/auth/token
   → JWT 토큰 발급

2. 사용자 정보 조회
   ↓
   GET /api/auth/me
   → 사용자 정보 반환

3. 캐릭터 목록
   ↓
   GET /api/characters
   → 캐릭터 리스트 반환

4. 코드 제출
   ↓
   POST /api/submissions
   → submissionId 반환

5. 상태 확인 (로딩 페이지)
   ↓
   GET /api/submissions/{id}/status
   → { status: "COMPLETED", progress: 100 }

6. 피드백 조회 ✅ 여기!
   ↓
   GET /api/submissions/{id}
   → 전체 피드백 데이터 (백엔드에서)
```

---

## 📡 백엔드 응답 구조

### 백엔드가 반환하는 형식
```json
{
  "success": true,
  "message": null,
  "data": {
    "id": 5,
    "problemSite": "BAEKJOON",
    "problemNumber": "1000",
    "problemTitle": "A+B",
    "problemType": "구현",
    "language": "JAVA",
    "userCode": "...",
    "characterId": "cody",
    "character": {
      "id": "cody",
      "name": "코디봇",
      "emoji": "🤖"
    },
    "status": "COMPLETED",
    "feedback": {
      "overallFeedback": "...",
      "feedbacks": [...],
      "keyPoints": [...],
      "warnings": [...],
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "alternativeApproach": null
    },
    "submittedAt": "2025-10-16T16:36:58.577789"
  }
}
```

### 프론트엔드 처리
```typescript
const response = await api.get(`/api/submissions/${id}`);
// response.data = { success: true, data: {...} }

const submissionData = response.data.data || response.data;
// submissionData = 실제 제출 데이터
```

---

## 🔍 콘솔 로그로 확인

### Feedback 페이지 접속 시

**Mock 모드 (잘못된 설정):**
```
🔧 API 모드: Mock 데이터 사용
📡 Mock GET: /api/submissions/5
📡 피드백 조회 요청: 5
📡 피드백 응답: { id: '1', ... } (프론트 Mock 데이터)
```

**백엔드 모드 (올바른 설정):**
```
🔧 API 모드: 실제 백엔드 연결
📡 피드백 조회 요청: 5
📡 API Response: /api/submissions/5 { success: true, data: {...} }
📡 피드백 응답: { success: true, data: {...} }
```

---

## ✅ 백엔드 호출 확인 방법

### 1. 브라우저 개발자 도구
```
F12 → Network 탭 → XHR 필터
```

백엔드 호출 시:
- Request URL: `http://localhost:8080/api/submissions/5`
- Status: `200 OK`
- Response: 백엔드 JSON 응답

Mock 모드 시:
- Network 탭에 아무것도 없음 (로컬에서 처리)

### 2. 백엔드 로그 확인
```bash
# 백엔드 터미널에서
INFO --- [codeacher] : 제출 조회: ID=5
INFO --- [codeacher] : Mock 피드백 생성 모드 (openai.use-mock=true인 경우)
```

### 3. 콘솔 로그 확인
```javascript
📡 API Response: /api/submissions/5 {...}
```

---

## 🎯 테스트 시나리오

### 시나리오 1: Mock 피드백 (백엔드)
```
1. 백엔드: openai.use-mock=true
2. 프론트엔드: VITE_USE_MOCK=false

결과:
✅ 프론트엔드가 백엔드 호출
✅ 백엔드에서 Mock 피드백 생성
✅ 피드백 페이지에 표시
```

### 시나리오 2: 실제 OpenAI (백엔드)
```
1. 백엔드: openai.use-mock=false, OPENAI_API_KEY=실제키
2. 프론트엔드: VITE_USE_MOCK=false

결과:
✅ 프론트엔드가 백엔드 호출
✅ 백엔드에서 OpenAI API 호출
✅ 실제 AI 피드백 표시
```

### 시나리오 3: 프론트엔드 Mock (잘못됨)
```
1. 프론트엔드: VITE_USE_MOCK=true

결과:
❌ 백엔드 호출 안 함
❌ 프론트엔드 Mock 데이터 사용
❌ 백엔드 테스트 안됨
```

---

## 🛠️ 문제 해결

### "Mock 데이터 사용" 표시됨
**원인**: `.env.local` 설정이 반영되지 않음

**해결**:
1. `.env.local` 파일 확인
2. `VITE_USE_MOCK=false` 확인
3. 프론트엔드 완전히 재시작
4. 브라우저 캐시 삭제

### Network 탭에 요청이 없음
**원인**: Mock 모드로 동작 중

**해결**:
1. 콘솔에서 API 모드 확인
2. `.env.local` 설정 확인
3. 재시작

### 401 Unauthorized
**원인**: JWT 토큰 없음

**해결**:
1. 로그인 페이지로 이동
2. 테스트 로그인 다시 수행

### 피드백이 null
**원인**: 백엔드에서 아직 처리 중

**해결**:
1. 로딩 페이지에서 3초 대기
2. 상태가 COMPLETED인지 확인
3. 백엔드 로그 확인

---

## 📝 체크리스트

### 백엔드 호출 확인
- [ ] `.env.local` 파일 생성
- [ ] `VITE_USE_MOCK=false` 설정
- [ ] 프론트엔드 재시작
- [ ] 콘솔: "실제 백엔드 연결" 표시
- [ ] Network 탭: API 요청 확인
- [ ] 백엔드 로그: 요청 수신 확인
- [ ] 피드백 페이지: 백엔드 데이터 표시

---

## 🎉 성공 시 표시

### 콘솔
```
🔧 API 모드: 실제 백엔드 연결
📡 피드백 조회 요청: 5
📡 API Response: /api/submissions/5 {success: true, data: {...}}
📡 피드백 응답: {success: true, data: {...}}
```

### Network 탭
```
Request URL: http://localhost:8080/api/submissions/5
Status Code: 200 OK
Response: { success: true, data: {...} }
```

### 백엔드 로그
```
INFO --- [codeacher] : Mock 피드백 생성: BAEKJOON-1000, 캐릭터: cody
```

### 피드백 페이지
- ✅ 백엔드에서 생성한 피드백 표시
- ✅ 시간 복잡도: O(1)
- ✅ 공간 복잡도: O(1)
- ✅ 전반적인 피드백 내용

---

이제 `.env.local` 파일을 만들고 프론트엔드를 재시작하세요!

