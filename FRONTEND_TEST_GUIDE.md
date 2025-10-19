# 프론트엔드 + 백엔드 통합 테스트 가이드

## ✅ 설정 완료 항목

1. ✅ Mock 모드 비활성화
2. ✅ 테스트 로그인 버튼 추가
3. ✅ 백엔드 API 연결 활성화
4. ✅ JWT 토큰 자동 처리

---

## 🚀 테스트 실행 방법

### 1단계: 백엔드 실행

```bash
# 터미널 1
cd C:\prac\Codeacher\backend
mvn spring-boot:run
```

백엔드가 `http://localhost:8080`에서 실행 대기

### 2단계: 프론트엔드 실행

```bash
# 터미널 2
cd C:\prac\Codeacher\frontend\prompt-to-ui-korean-main\prompt-to-ui-korean-main
npm run dev
```

프론트엔드가 `http://localhost:5173`에서 실행

### 3단계: 브라우저에서 테스트

1. `http://localhost:5173` 접속
2. **"테스트 로그인 (개발용)"** 버튼 클릭
3. 백엔드 API로 자동 인증
4. 캐릭터 선택 페이지로 이동
5. 전체 플로우 테스트!

---

## 📋 테스트 플로우

```
┌─────────────────────────────────────────────┐
│  http://localhost:5173                      │
│  로그인 페이지                              │
└─────────────────────────────────────────────┘
              ↓ 테스트 로그인 클릭
┌─────────────────────────────────────────────┐
│  백엔드 API 호출                            │
│  GET /api/test/auth/token                   │
│  → JWT 토큰 발급                            │
└─────────────────────────────────────────────┘
              ↓ 토큰 저장
┌─────────────────────────────────────────────┐
│  사용자 정보 조회                           │
│  GET /api/auth/me                           │
│  (Authorization: Bearer {token})            │
└─────────────────────────────────────────────┘
              ↓ 인증 완료
┌─────────────────────────────────────────────┐
│  캐릭터 선택 페이지                         │
│  GET /api/characters                        │
└─────────────────────────────────────────────┘
              ↓ 캐릭터 선택
┌─────────────────────────────────────────────┐
│  코드 제출 페이지                           │
│  POST /api/submissions                      │
└─────────────────────────────────────────────┘
              ↓ AI 분석
┌─────────────────────────────────────────────┐
│  피드백 확인                                │
│  GET /api/submissions/{id}                  │
└─────────────────────────────────────────────┘
```

---

## 🔍 주요 변경 사항

### 1. `.env.local` 파일 생성
```env
VITE_API_URL=http://localhost:8080
VITE_USE_MOCK=false
```

### 2. `Login.tsx` - 테스트 로그인 추가
```typescript
const handleTestLogin = async () => {
  // 백엔드 테스트 인증 API 호출
  const response = await fetch('http://localhost:8080/api/test/auth/token');
  const { accessToken } = response.data.data;
  
  // 토큰 저장 및 사용자 정보 조회
  localStorage.setItem('accessToken', accessToken);
  await login(accessToken);
}
```

### 3. `AuthContext.tsx` - JWT 토큰 처리
```typescript
const login = async (credential: string) => {
  if (credential.startsWith('eyJ')) {
    // JWT 토큰인 경우 사용자 정보 가져오기
    const response = await api.get('/api/auth/me');
    setUser(response.data.data);
  }
}
```

### 4. `api.ts` - 응답 로깅 추가
```typescript
realApi.interceptors.response.use(
  (response) => {
    console.log('📡 API Response:', response.config.url, response.data);
    return response;
  }
)
```

---

## 🧪 테스트 체크리스트

### 인증 테스트
- [ ] 로그인 페이지 접속
- [ ] 테스트 로그인 버튼 클릭
- [ ] 콘솔에서 API 호출 확인
- [ ] JWT 토큰 발급 확인
- [ ] 사용자 정보 조회 성공
- [ ] 캐릭터 선택 페이지 이동

### 캐릭터 선택 테스트
- [ ] 캐릭터 목록 로드
- [ ] 캐릭터 선택
- [ ] 선택 상태 저장 확인

### 코드 제출 테스트
- [ ] 코드 작성
- [ ] 제출 버튼 클릭
- [ ] 제출 ID 받기
- [ ] 상태 폴링 확인
- [ ] PROCESSING → COMPLETED 전환 확인

### 피드백 확인 테스트
- [ ] AI 피드백 로드
- [ ] 전체 피드백 표시
- [ ] 복잡도 분석 확인
- [ ] 개선 제안 확인

---

## 🐛 문제 해결

### CORS 에러
```
Access to fetch at 'http://localhost:8080' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

**해결**: 백엔드 `application.yml` 확인
```yaml
cors:
  allowed-origins: http://localhost:5173,http://localhost:8080
```

### 401 Unauthorized
**원인**: JWT 토큰이 없거나 만료됨

**해결**: 
1. 로그아웃 후 재로그인
2. localStorage에서 토큰 확인
3. 백엔드 로그 확인

### 네트워크 에러
**원인**: 백엔드가 실행되지 않음

**해결**:
```bash
# 백엔드 상태 확인
curl http://localhost:8080/api/characters

# 백엔드 재시작
cd backend
mvn spring-boot:run
```

### Mock 데이터가 계속 나옴
**원인**: `.env.local` 설정이 반영되지 않음

**해결**:
1. 프론트엔드 서버 재시작
2. 브라우저 캐시 삭제
3. 콘솔에서 `VITE_USE_MOCK` 값 확인

---

## 📊 콘솔 로그 확인

### 정상 동작 시
```
🔧 API 모드: 실제 백엔드 연결
📡 API Response: /api/test/auth/token {...}
📡 API Response: /api/auth/me {...}
📡 API Response: /api/characters {...}
```

### Mock 모드 (잘못된 설정)
```
🔧 API 모드: Mock 데이터 사용
📡 Mock GET: /api/characters
```

---

## 🎯 API 엔드포인트 매핑

| 프론트엔드 요청 | 백엔드 API | 설명 |
|----------------|-----------|------|
| 로그인 | `GET /api/test/auth/token` | 테스트 토큰 발급 |
| 사용자 정보 | `GET /api/auth/me` | 현재 사용자 |
| 캐릭터 목록 | `GET /api/characters` | 전체 캐릭터 |
| 캐릭터 선택 | `PUT /api/characters/select/{id}` | 캐릭터 변경 |
| 코드 제출 | `POST /api/submissions` | 제출 생성 |
| 제출 상태 | `GET /api/submissions/{id}/status` | 진행 상태 |
| 피드백 조회 | `GET /api/submissions/{id}` | 전체 피드백 |
| 제출 내역 | `GET /api/submissions` | 내 제출 목록 |
| 통계 | `GET /api/statistics/summary` | 통계 요약 |

---

## 🔧 개발자 도구 활용

### Network 탭
- API 요청/응답 확인
- 상태 코드 확인
- 응답 시간 측정

### Console 탭
- API 로그 확인
- 에러 메시지 확인
- 토큰 확인: `localStorage.getItem('accessToken')`

### Application 탭
- Local Storage 확인
- 토큰 수동 삭제/추가 가능

---

## 📝 환경 변수 설정

### `.env.local` (현재 설정)
```env
VITE_API_URL=http://localhost:8080
VITE_USE_MOCK=false
```

### Mock 모드로 돌리려면
```env
VITE_USE_MOCK=true
```

### 프로덕션 배포 시
```env
VITE_API_URL=https://api.your-domain.com
VITE_USE_MOCK=false
```

---

## 🚀 다음 단계

1. ✅ 기본 플로우 테스트
2. ✅ API 연동 확인
3. ⏭️ Google OAuth 추가 (선택사항)
4. ⏭️ 에러 핸들링 강화
5. ⏭️ 로딩 상태 개선
6. ⏭️ 프로덕션 빌드 테스트

---

## 💡 팁

### 빠른 재시작
```bash
# 백엔드
Ctrl+C → 위 화살표 → Enter

# 프론트엔드  
Ctrl+C → npm run dev
```

### 토큰 수동 테스트
```javascript
// 브라우저 콘솔에서
localStorage.setItem('accessToken', 'your-test-token')
location.reload()
```

### API 직접 호출
```bash
# 토큰 발급
curl http://localhost:8080/api/test/auth/token

# 인증 테스트
curl -H "Authorization: Bearer {token}" \
  http://localhost:8080/api/auth/me
```

---

## 📚 관련 문서

- [API 테스트 가이드](./API_TEST_GUIDE.md)
- [JWT 토큰 가이드](./TEST_JWT_GUIDE.md)
- [코드 제출 테스트](./CODE_SUBMISSION_TEST_GUIDE.md)

---

**준비 완료! 이제 테스트를 시작하세요!** 🎉

