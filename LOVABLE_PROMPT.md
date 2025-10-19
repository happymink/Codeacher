# Lovable (Lovable.dev) 프론트엔드 구현 프롬프트

## 프로젝트 개요

**Codeacher** - AI 기반 코딩테스트 피드백 서비스의 프론트엔드를 구축해주세요.

사용자가 코딩테스트 답안을 제출하면, 선택한 캐릭터 선생님이 AI를 통해 피드백을 제공하고, 학습 진척도를 추적하는 서비스입니다.

---

## 기술 스택

- **프레임워크**: React 18 + TypeScript
- **빌드 도구**: Vite
- **상태 관리**: React Query (서버 상태) + Context API (클라이언트 상태)
- **UI 라이브러리**: Material-UI (MUI) v5
- **라우팅**: React Router v6
- **애니메이션**: Framer Motion
- **HTTP 클라이언트**: Axios
- **코드 하이라이팅**: react-syntax-highlighter
- **차트**: recharts

---

## 페이지 구조 및 라우팅

```
/ (루트)
├── /login - 로그인 페이지
├── /character-selection - 캐릭터 선택 페이지 (첫 로그인 시)
├── /submit - 답안 제출 페이지
├── /loading/:submissionId - 로딩 애니메이션 페이지 (캐릭터 표시)
├── /history - 문제풀이 내역 페이지
├── /feedback/:id - 피드백 상세 페이지
├── /dashboard - 통계 대시보드
└── /settings - 설정 (캐릭터 변경 등)
```

---

## 주요 기능 요구사항

### 1. 로그인 페이지 (`/login`)

**UI 구성:**
- 중앙 정렬된 로고와 타이틀
- "Codeacher" 로고 (텍스트 또는 이미지)
- 부제: "AI 코딩테스트 피드백 선생님"
- Google 로그인 버튼 (아이콘 + "Google로 로그인하기" 텍스트)
- 깔끔하고 미니멀한 디자인

**기능:**
- Google OAuth 2.0 로그인
- 로그인 성공 시 JWT 토큰을 localStorage에 저장
- 이미 로그인된 사용자는 자동으로 메인 페이지로 리다이렉트

**API:**
```typescript
POST /api/auth/google
Request: { credential: string }
Response: { 
  accessToken: string, 
  user: { id, email, name, profileImage, selectedCharacter } 
}
```

---

### 2. 캐릭터 선택 페이지 (`/character-selection`)

**UI 구성:**
- 페이지 상단: "나만의 코딩 선생님을 선택하세요! 🎓"
- 6개의 캐릭터 카드를 2x3 그리드로 배치 (데스크톱), 모바일은 1열
- 각 카드 내용:
  - 큰 이모지 (5rem)
  - 캐릭터 이름
  - 짧은 설명 (예: "논리적 분석가")
  - [선택] 버튼 (캐릭터 컬러로)
  - 호버 시 카드 확대 효과 (scale: 1.05)
- 하단 안내 문구: "💡 선택한 선생님이 피드백을 해줘요! 나중에 언제든 변경할 수 있어요"

**캐릭터 목록:**
1. **🤖 코디봇** - 논리적 분석가 (파란색 #4A90E2)
2. **🦉 알고 선생님** - 지혜로운 교수님 (브라운 #8B4513)
3. **🐛 디버기** - 꼼꼼한 탐정 (레드 #FF6B6B)
4. **🚀 스피디** - 최적화 전문가 (오렌지 #FF8C00)
5. **🐱 코코** - 친근한 친구 (핑크 #FFB6C1)
6. **🧊 프로페서 큐브** - 전문가 스타일 (보라 #9B59B6)

**기능:**
- 카드 클릭 시 미리보기 모달 표시 (캐릭터 상세 정보, 샘플 대사, 특기)
- [선택] 버튼 클릭 시 API 호출 후 다음 페이지로 이동
- 애니메이션: 페이지 진입 시 카드가 하나씩 fade-in

**API:**
```typescript
GET /api/characters
Response: [{ id, name, emoji, description, specialty, colorTheme, personality }]

PUT /api/characters/select/{characterId}
Response: { message, selectedCharacter }
```

---

### 3. 답안 제출 페이지 (`/submit`)

**UI 구성:**
- 상단: 현재 선택된 캐릭터 표시 (이모지 + 이름)
- 입력 폼:
  - 문제 사이트 선택 (Select): 백준, 프로그래머스, LeetCode 등
  - 문제 번호 (TextField)
  - 문제 제목 (TextField, optional)
  - 언어 선택 (Select): Java, Python, JavaScript, C++ 등
  - 코드 입력 에디터 (CodeMirror 또는 Monaco Editor)
    - 문법 하이라이팅
    - 라인 넘버 표시
    - 최소 높이 400px, 리사이즈 가능
- 하단: [제출하고 피드백 받기] 버튼 (크고 눈에 띄게, 캐릭터 컬러)

**기능:**
- 코드 에디터는 선택한 언어에 맞는 문법 하이라이팅 적용
- 필수 필드 검증 (사이트, 문제번호, 언어, 코드)
- 제출 버튼 클릭 시:
  1. 로딩 상태 표시
  2. API 호출
  3. 성공 시 "제출이 완료되었어요! 🎉" 스낵바 표시
  4. 로딩 페이지로 자동 이동

**API:**
```typescript
POST /api/submissions
Request: { problemSite, problemNumber, problemTitle?, language, userCode }
Response: { submissionId, status: "PROCESSING", character, estimatedTime }
```

---

### 4. 로딩 애니메이션 페이지 (`/loading/:submissionId`) ⭐ 핵심 기능

**UI 구성:**
- 중앙 정렬된 애니메이션 영역
- 배경색: 선택된 캐릭터 컬러의 15% 투명도
- 구성 요소:
  1. **캐릭터 애니메이션**
     - 큰 이모지 (5rem)
     - 위아래로 부드럽게 움직이는 애니메이션 (y: [0, -10, 0])
     - 분석 중일 때 좌우로 약간 회전 (rotate: [0, 5, -5, 0])
  
  2. **상태별 이펙트**
     - 로딩 중 (0-40%): 기본 애니메이션
     - 분석 중 (40-80%): 💭📄💡 아이콘이 캐릭터 옆에 fade-in
     - 완료 (100%): ✨🎉✨ 축하 효과가 scale-up
  
  3. **진행률 바**
     - 너비: 최대 400px
     - 높이: 12px
     - 둥근 모서리 (border-radius: 10px)
     - 배경: rgba(0,0,0,0.1)
     - 진행 바: 캐릭터 컬러 + 그림자 효과
     - 부드러운 애니메이션 (transition: 0.5s)
  
  4. **진행률 퍼센트**
     - 진행률 바 아래 중앙에 표시
     - 폰트 크기: 1.2rem, 볼드
  
  5. **대사 말풍선**
     - 흰색 배경, 둥근 모서리 (border-radius: 20px)
     - 그림자 효과 (box-shadow: 0 4px 15px rgba(0,0,0,0.1))
     - 최대 너비: 500px
     - 내용: 💬 "{캐릭터 대사}"
     - 대사 변경 시 fade 애니메이션
  
  6. **예상 시간 표시**
     - 대사 말풍선 아래
     - "⏱ 약 XX초 남았어요"
  
  7. **완료 버튼** (100% 도달 시)
     - [피드백 확인하기 ✨] 버튼
     - 펄스 효과 (scale: [1, 1.05, 1] 반복)
     - 클릭 시 피드백 상세 페이지로 이동

**로직:**
- 컴포넌트 마운트 시:
  1. 진행률 시뮬레이션 시작 (0→100%, 속도는 랜덤)
  2. 2초마다 상태 폴링 (GET /api/submissions/{id}/status)
  3. 3초마다 대사 변경 (phase에 맞는 랜덤 대사)
  4. status가 "COMPLETED"면 진행률 100%로 강제 설정
  5. 완료 후 2초 대기 후 자동으로 피드백 페이지 이동

**대사 데이터 예시:**
```typescript
// CharacterContext에서 제공
dialogues: {
  loading: ["코드 분석을 시작합니다...", "알고리즘 패턴을 파악하는 중..."],
  analyzing: ["흠... 이 로직은...", "오! 여기가 핵심이네요!"],
  complete: ["분석 완료! 피드백을 확인해보세요"]
}
```

**API:**
```typescript
GET /api/submissions/{id}/status
Response: { submissionId, status: "PROCESSING" | "COMPLETED" | "FAILED", progress: 0-100 }
```

---

### 5. 문제풀이 내역 페이지 (`/history`)

**UI 구성:**
- 페이지 헤더: "나의 문제풀이 내역"
- 필터 옵션:
  - 문제 유형 선택 (Chip 형태)
  - 날짜 범위 선택
  - 캐릭터 필터
- 카드 그리드 (반응형):
  - 데스크톱: 4열
  - 태블릿: 2열
  - 모바일: 1열

**카드 디자인:**
```
┌────────────────────┐
│ 🤖 (캐릭터 이모지)  │
│ DFS                │ (문제 유형 뱃지)
│ #1234              │ (문제 번호)
│ 백준               │ (사이트)
│ 2025-10-15         │ (제출일)
│ [자세히 보기]       │
└────────────────────┘
```

**기능:**
- 무한 스크롤 또는 페이지네이션
- 카드 호버 시 확대 효과
- 카드 클릭 또는 [자세히 보기] 버튼 클릭 시 피드백 상세 페이지로 이동
- 로딩 시 스켈레톤 UI 표시

**API:**
```typescript
GET /api/submissions?page=0&size=20&sort=submittedAt,desc
Response: { 
  content: [{ id, problemSite, problemNumber, problemType, submittedAt, feedbackSummary, characterEmoji }],
  totalElements, totalPages, currentPage 
}
```

---

### 6. 피드백 상세 페이지 (`/feedback/:id`)

**UI 구성:**

**헤더 섹션:**
- 문제 정보
  - 문제: 백준 #1234 - DFS와 BFS
  - 제출일: 2025-10-15
  - 언어: Java
  - 선생님: 🤖 코디봇

**코드 섹션:**
- 제목: "나의 답안 코드"
- react-syntax-highlighter로 코드 하이라이팅
- 복사 버튼 포함
- 접기/펼치기 기능 (기본은 펼쳐진 상태)

**피드백 섹션:**
- 제목: "🤖 코디봇의 피드백" (캐릭터에 따라 변경)
- 카드 스타일, 배경색은 캐릭터 컬러의 5% 투명도
- 내부 구성:
  1. **📝 전반적인 피드백** (overallFeedback)
  2. **✅ 잘한 점** (feedbacks 목록)
     - 불릿 포인트로 표시
  3. **💡 중요 개념** (keyPoints 목록)
  4. **⚠️ 주의 사항** (warnings 목록)
  5. **📊 복잡도 분석**
     - 시간 복잡도: O(V+E)
     - 공간 복잡도: O(V)
  6. **💼 대안적 접근** (alternativeApproach, 있을 경우만)

**하단 액션:**
- [목록으로 돌아가기] 버튼
- [재도전하기] 버튼 (같은 문제번호로 제출 페이지 이동)

**API:**
```typescript
GET /api/submissions/{id}
Response: {
  id, problemSite, problemNumber, problemTitle, problemType,
  language, userCode, submittedAt,
  character: { id, name, emoji },
  feedback: { overallFeedback, feedbacks[], keyPoints[], warnings[], timeComplexity, spaceComplexity, alternativeApproach? }
}
```

---

### 7. 통계 대시보드 (`/dashboard`)

**UI 구성:**

**상단 통계 카드 (2x2 그리드):**
1. 이번 주 제출: 7개
2. 이번 달 제출: 25개
3. 총 제출: 50개
4. 평균 점수: 85점

**차트 섹션:**

1. **문제 유형별 분포 (파이 차트)**
   - recharts의 PieChart 사용
   - DFS: 20%, DP: 30%, 구현: 25% 등
   - 각 유형별 색상 구분

2. **일별 제출 추이 (라인 차트)**
   - recharts의 LineChart 사용
   - 최근 30일간 데이터
   - X축: 날짜, Y축: 제출 수

3. **캐릭터별 사용 통계 (바 차트)**
   - recharts의 BarChart 사용
   - 각 캐릭터 이모지와 이름 표시
   - 막대는 캐릭터 컬러로

**약점 영역 카드:**
- 제목: "📌 약점 영역"
- 각 약점 표시:
  - 문제 유형 (예: DP - 동적계획법)
  - 공통 이슈 목록
  - 추천 문제 링크

**API:**
```typescript
GET /api/statistics/summary
Response: {
  totalSubmissions, problemTypeDistribution, weeklyProgress[], weakAreas[], characterUsage
}
```

---

### 8. 설정 페이지 (`/settings`)

**UI 구성:**
- 프로필 섹션
  - 사용자 이름, 이메일, 프로필 이미지
  - [로그아웃] 버튼

- 캐릭터 설정
  - 현재 선택된 캐릭터 표시
  - [캐릭터 변경하기] 버튼
  - 클릭 시 캐릭터 선택 모달 표시

- 테마 설정
  - 라이트/다크 모드 토글

- 알림 설정
  - 제출 완료 알림
  - 주간 리포트 알림

---

## Context 및 상태 관리

### 1. AuthContext

```typescript
interface AuthContextType {
  user: User | null;
  login: (credential: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

**기능:**
- JWT 토큰 관리
- 로그인/로그아웃 처리
- 사용자 정보 저장

### 2. CharacterContext

```typescript
interface CharacterContextType {
  currentCharacter: CharacterProfile | null;
  allCharacters: CharacterProfile[];
  selectCharacter: (characterId: string) => Promise<void>;
  getRandomDialogue: (phase: 'loading' | 'analyzing' | 'complete') => string;
}
```

**기능:**
- 현재 선택된 캐릭터 정보 관리
- 캐릭터 목록 캐싱
- 대사 랜덤 조회

### 3. ThemeContext (선택사항)

```typescript
interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}
```

---

## 공통 컴포넌트

### 1. LoadingSpinner
- Material-UI CircularProgress 사용
- 중앙 정렬
- 캐릭터 컬러 적용

### 2. PrivateRoute
- 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
- 인증된 사용자는 children 렌더링

### 3. Navbar
- 로고 (좌측)
- 네비게이션 링크: 제출, 내역, 대시보드
- 사용자 프로필 (우측)
  - 아바타 클릭 시 드롭다운: 설정, 로그아웃

### 4. SkeletonCard
- 로딩 시 표시할 스켈레톤 UI
- Material-UI Skeleton 사용

---

## 디자인 시스템

### 색상 팔레트

```css
:root {
  /* 기본 색상 */
  --primary: #4A90E2;
  --secondary: #50C878;
  --warning: #FFB347;
  --error: #FF6B6B;
  --background: #F8F9FA;
  --text-primary: #2C3E50;
  --text-secondary: #7F8C8D;
  
  /* 캐릭터 색상 */
  --character-cody: #4A90E2;
  --character-owl: #8B4513;
  --character-debuggy: #FF6B6B;
  --character-speedy: #FF8C00;
  --character-coco: #FFB6C1;
  --character-cube: #9B59B6;
}
```

### 타이포그래피
- 제목: Pretendard Bold (또는 system-ui fallback)
- 본문: Pretendard Regular
- 코드: 'Fira Code', monospace

### 간격 시스템
- 기본 단위: 8px
- xs: 8px
- sm: 16px
- md: 24px
- lg: 32px
- xl: 48px

### 그림자
- light: 0 2px 8px rgba(0,0,0,0.1)
- medium: 0 4px 15px rgba(0,0,0,0.1)
- heavy: 0 8px 24px rgba(0,0,0,0.15)

### 애니메이션
- 기본 duration: 0.3s
- 이징: ease-in-out
- Framer Motion variants 활용

---

## 반응형 디자인

### 브레이크포인트
- xs: 0px (모바일)
- sm: 600px (태블릿)
- md: 900px (작은 데스크톱)
- lg: 1200px (데스크톱)
- xl: 1536px (큰 화면)

### 모바일 최적화
- 네비게이션 바 → 하단 탭바
- 카드 그리드 → 1열
- 폰트 크기 조정
- 터치 친화적 버튼 크기 (최소 44x44px)

---

## API 통신 설정

### Axios 인터셉터

```typescript
// Request 인터셉터
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

// Response 인터셉터
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그아웃
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Base URL
- 개발: `http://localhost:8080`
- 프로덕션: 환경변수에서 가져오기

---

## 성능 최적화

1. **Code Splitting**
   - React.lazy로 페이지별 코드 스플리팅
   - Suspense로 로딩 처리

2. **이미지 최적화**
   - WebP 포맷 사용
   - Lazy loading

3. **React Query 캐싱**
   - staleTime 설정으로 불필요한 재요청 방지
   - 캐릭터 정보, 통계 데이터 캐싱

4. **애니메이션 최적화**
   - transform과 opacity만 사용 (GPU 가속)
   - will-change 속성 활용

---

## 접근성 (a11y)

1. **키보드 네비게이션**
   - Tab으로 모든 인터랙티브 요소 접근 가능
   - Enter/Space로 버튼 활성화

2. **ARIA 속성**
   - 적절한 role, aria-label 사용
   - 스크린 리더 대응

3. **색상 대비**
   - WCAG 2.1 AA 수준 준수
   - 텍스트와 배경 대비비 4.5:1 이상

4. **포커스 표시**
   - 포커스된 요소에 명확한 아웃라인

---

## 에러 처리

1. **API 에러**
   - 에러 발생 시 Snackbar로 사용자에게 알림
   - 재시도 버튼 제공

2. **네트워크 에러**
   - "네트워크 연결을 확인해주세요" 메시지

3. **404 에러**
   - 404 페이지 구현
   - 홈으로 돌아가기 버튼

4. **Error Boundary**
   - React Error Boundary로 전역 에러 처리
   - 에러 발생 시 fallback UI 표시

---

## 추가 요구사항

1. **애니메이션**
   - 페이지 전환 시 fade 효과
   - 카드 hover 시 smooth scale 효과
   - 로딩 애니메이션은 매끄럽고 자연스럽게

2. **사용자 경험**
   - 로딩 상태 명확히 표시
   - 성공/실패 피드백 즉각적 제공
   - 직관적인 네비게이션

3. **코드 품질**
   - TypeScript strict 모드
   - ESLint + Prettier 설정
   - 재사용 가능한 컴포넌트 작성
   - 적절한 주석

4. **테스트 고려**
   - 테스트하기 쉬운 구조
   - data-testid 속성 추가

---

## 우선순위

### Phase 1 (MVP - 필수)
1. ✅ 로그인 페이지
2. ✅ 캐릭터 선택 페이지
3. ✅ 답안 제출 페이지
4. ✅ 로딩 애니메이션 페이지 (핵심!)
5. ✅ 피드백 상세 페이지

### Phase 2 (중요)
6. 문제풀이 내역 페이지
7. 통계 대시보드

### Phase 3 (추가)
8. 설정 페이지
9. 다크모드
10. 알림 시스템

---

## 시작 명령어

프로젝트 생성 후 다음 명령어로 시작:

```bash
npm install
npm run dev
```

포트는 기본 5173 사용.

---

## 참고 사항

- 백엔드 API는 `http://localhost:8080`에서 실행 중이라고 가정
- 모든 API 엔드포인트는 위에 명시된 형식 사용
- 캐릭터 이모지는 실제 이모지 문자 사용 (🤖, 🦉, 🐛, 🚀, 🐱, 🧊)
- Material-UI 컴포넌트를 최대한 활용
- 반응형 디자인은 필수
- 로딩 애니메이션 페이지가 가장 중요한 차별화 포인트!

---

이 프롬프트를 바탕으로 **Codeacher** 프론트엔드를 구축해주세요. 특히 **로딩 애니메이션 페이지**는 사용자 경험의 핵심이므로 애니메이션이 부드럽고 즐겁게 구현되어야 합니다! 🎉


