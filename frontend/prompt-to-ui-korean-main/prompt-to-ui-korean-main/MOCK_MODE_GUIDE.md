# 🎭 Mock 모드 사용 가이드

프론트엔드를 백엔드 없이 완전히 테스트할 수 있는 Mock 모드입니다.

---

## 🚀 빠른 시작

### 1. Mock 모드 활성화 (현재 기본 설정)

`.env.local` 파일이 이미 생성되어 있습니다:
```env
VITE_USE_MOCK=true
VITE_API_URL=http://localhost:8080
```

### 2. 서버 실행

```bash
npm run dev
```

### 3. 브라우저에서 확인

```
http://localhost:5173/
```

---

## 📂 Mock 데이터 구조

### 제공되는 Mock 데이터

#### 1. Mock 제출 내역 (5개)
- **DFS와 BFS** (백준 #1234) - Java - 코디봇 피드백
- **K번째 수** (프로그래머스 #42748) - Python - 코코 피드백
- **계단 오르기** (백준 #2579) - C++ - 알고 선생님 피드백
- **Number of Islands** (LeetCode #200) - JavaScript - 스피디 피드백
- **회의실 배정** (백준 #1931) - Java - 디버기 피드백

#### 2. Mock 통계 데이터
- 총 제출 수: 5개
- 문제 유형별 분포: DFS, BFS, DP, 정렬, 그리디
- 주간 진행률: 7일간 데이터
- 약점 영역: DP, 그리디
- 캐릭터별 사용 통계

#### 3. Mock 사용자
- 이름: 테스트 사용자
- 이메일: test@codeacher.com
- 기본 캐릭터: 코디봇

---

## 🎯 테스트 가능한 기능

### ✅ 완전히 작동하는 기능

1. **캐릭터 선택** (`/character-selection`)
   - 6개 캐릭터 모두 표시 (이미지 포함)
   - 캐릭터 선택 및 변경
   - 미리보기 모달

2. **답안 제출** (`/submit`)
   - 문제 정보 입력
   - 코드 입력
   - 제출 버튼
   - 제출 후 로딩 페이지로 자동 이동

3. **로딩 애니메이션** (`/loading/:submissionId`)
   - 캐릭터 애니메이션
   - 진행률 바 (자동 증가)
   - 단계별 대사 변경
   - 상태 폴링 시뮬레이션
   - 완료 후 피드백 페이지로 이동

4. **피드백 상세** (`/feedback/:id`)
   - 5개 Mock 제출 내역 조회 가능
   - 코드 하이라이팅
   - AI 피드백 (전반적 피드백, 잘한 점, 주의사항 등)
   - 복잡도 분석

5. **제출 내역** (`/history`)
   - 5개 Mock 제출 카드 표시
   - 카드 클릭 시 상세 페이지 이동
   - 캐릭터 이모지/이미지 표시

6. **통계 대시보드** (`/dashboard`)
   - 통계 카드 (주간, 월간 제출 수)
   - 문제 유형별 분포 차트
   - 캐릭터별 사용 통계
   - 약점 영역 분석

7. **설정** (`/settings`)
   - 사용자 정보 표시
   - 캐릭터 변경
   - 로그아웃 (Mock 모드에서는 무시)

---

## 🎮 사용 시나리오

### 시나리오 1: 전체 플로우 테스트

1. **시작**: `http://localhost:5173/`
2. **캐릭터 선택**: `/character-selection`에서 원하는 캐릭터 선택
3. **답안 제출**: `/submit`에서 문제 정보와 코드 입력 후 제출
4. **로딩 확인**: 캐릭터 애니메이션과 대사 확인
5. **피드백 확인**: 자동으로 이동된 피드백 페이지에서 AI 피드백 확인
6. **내역 확인**: `/history`에서 제출 내역 확인
7. **통계 확인**: `/dashboard`에서 학습 통계 확인

### 시나리오 2: 기존 데이터 확인

1. **내역 페이지**: `http://localhost:5173/history`
2. 5개의 Mock 제출 카드 확인
3. 아무 카드나 클릭하여 상세 피드백 확인
4. 각 문제마다 다른 캐릭터 선생님의 피드백 스타일 비교

### 시나리오 3: 통계 확인

1. **대시보드**: `http://localhost:5173/dashboard`
2. 문제 유형별 분포 차트 확인
3. 일별 제출 추이 그래프 확인
4. 약점 영역 및 추천 문제 확인

---

## 🔄 백엔드 연결로 전환

### Mock 모드 → 실제 백엔드

`.env.local` 파일 수정:
```env
# Mock 모드 비활성화
VITE_USE_MOCK=false

# 백엔드 API URL
VITE_API_URL=http://localhost:8080
```

**서버 재시작 필수:**
```bash
# Ctrl+C로 종료 후
npm run dev
```

---

## 📝 Mock 데이터 수정

### Mock 데이터 위치
```
src/lib/mockData.ts
```

### 데이터 추가 예시

#### 새로운 제출 내역 추가
```typescript
export const mockSubmissions: Submission[] = [
  // 기존 데이터...
  {
    id: '6',
    problemSite: '백준',
    problemNumber: '1234',
    problemTitle: '새 문제',
    problemType: 'DP',
    language: 'Python',
    userCode: `def solution():
    pass`,
    submittedAt: new Date().toISOString(),
    status: 'COMPLETED',
    character: {
      id: 'cube',
      name: '프로페서 큐브',
      emoji: '🧊',
      image: '/characters/prof_cube_portrait.jpg'
    },
    feedback: {
      overallFeedback: '피드백 내용...',
      feedbacks: ['피드백1', '피드백2'],
      keyPoints: ['개념1', '개념2'],
      warnings: ['주의사항1'],
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)'
    }
  }
];
```

#### 통계 데이터 수정
```typescript
export const mockStatistics = {
  totalSubmissions: 6, // 수정
  problemTypeDistribution: {
    'DFS': 1,
    'BFS': 1,
    'DP': 2, // 수정
    '정렬': 1,
    '그리디': 1
  },
  // ...
};
```

---

## 🐛 디버깅

### 콘솔 로그 확인

브라우저 개발자 도구(F12) → Console 탭:

```
🔧 API 모드: Mock 데이터 사용
📡 Mock GET: /api/submissions
📡 Mock POST: /api/submissions
```

### Mock 모드 확인

```javascript
// 브라우저 콘솔에서 실행
console.log(import.meta.env.VITE_USE_MOCK);
// 출력: "true"
```

---

## 📊 Mock vs Real API 차이점

| 기능 | Mock 모드 | Real API 모드 |
|------|-----------|---------------|
| 로그인 | 자동 로그인 | Google OAuth 필요 |
| 데이터 저장 | 저장 안됨 (휘발성) | DB에 영구 저장 |
| 제출 처리 | 즉시 완료 (시뮬레이션) | 실제 AI 분석 |
| 응답 시간 | 300ms (시뮬레이션) | 실제 네트워크 지연 |
| 데이터 | 고정된 5개 제출 | 사용자별 실제 데이터 |

---

## ⚡ 성능 최적화

### Mock API 응답 속도 조정

`src/lib/api.ts`에서 지연 시간 수정:
```typescript
// 현재: 300ms
await new Promise(resolve => setTimeout(resolve, 300));

// 빠르게: 100ms
await new Promise(resolve => setTimeout(resolve, 100));

// 느리게 (네트워크 시뮬레이션): 1000ms
await new Promise(resolve => setTimeout(resolve, 1000));
```

---

## 🎨 UI/UX 테스트

### 로딩 애니메이션 테스트

`src/lib/mockData.ts`에서 진행률 증가 속도 조정:
```typescript
export const createMockSubmissionStatus = (submissionId: string) => {
  let progress = 0;
  
  return () => {
    // 현재: 5-20% 증가
    progress = Math.min(progress + Math.random() * 15 + 5, 100);
    
    // 느리게: 2-8% 증가
    progress = Math.min(progress + Math.random() * 6 + 2, 100);
    
    return {
      submissionId,
      status: progress >= 100 ? 'COMPLETED' : 'PROCESSING',
      progress: Math.round(progress)
    };
  };
};
```

---

## 📌 주의사항

1. **데이터 지속성 없음**
   - Mock 모드에서 제출한 데이터는 페이지 새로고침 시 사라집니다
   - 영구 저장이 필요하면 실제 백엔드 모드 사용

2. **제한된 Mock 데이터**
   - 5개의 제출 내역만 제공
   - 더 많은 데이터가 필요하면 `mockData.ts` 수정

3. **환경변수 변경 시 재시작**
   - `.env.local` 수정 후 반드시 서버 재시작

4. **인증 우회**
   - Mock 모드에서는 로그인 없이 모든 기능 접근 가능
   - 실제 서비스에서는 Google OAuth 필수

---

## 🔗 파일 구조

```
src/
├── lib/
│   ├── api.ts              # Mock/Real API 전환 로직
│   └── mockData.ts         # Mock 데이터 정의
├── contexts/
│   ├── AuthContext.tsx     # Mock 로그인 로직
│   └── CharacterContext.tsx # 캐릭터 기본 데이터
└── pages/
    ├── Login.tsx           # (Mock 모드에서는 우회)
    ├── CharacterSelection.tsx
    ├── Submit.tsx
    ├── Loading.tsx         # Mock 상태 폴링
    ├── Feedback.tsx        # Mock 피드백 표시
    ├── History.tsx         # Mock 제출 내역
    ├── Dashboard.tsx       # Mock 통계
    └── Settings.tsx
```

---

## 💡 개발 팁

1. **새 기능 개발 시**
   - Mock 데이터를 먼저 추가
   - UI 완성 후 백엔드 API 연동

2. **UI/UX 테스트**
   - Mock 모드로 빠르게 반복 테스트
   - 로딩 시간, 애니메이션 등 조정

3. **데모/발표용**
   - Mock 모드로 안정적인 데모 가능
   - 네트워크 상태에 영향 받지 않음

---

## 🆘 문제 해결

### 1. Mock 모드가 안 켜져요
```bash
# .env.local 파일 확인
cat .env.local

# 서버 재시작
npm run dev
```

### 2. 이미지가 안 보여요
```bash
# public/characters/ 폴더 확인
ls public/characters/

# 브라우저 콘솔에서 404 에러 확인
```

### 3. 데이터가 표시 안 돼요
```bash
# 브라우저 콘솔 확인
F12 → Console 탭

# Mock API 로그 확인
📡 Mock GET: /api/submissions
```

---

**Happy Testing! 🎉**

Mock 모드로 프론트엔드를 마음껏 테스트하세요!


