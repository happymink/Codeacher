# 🌿 Codeacher Git 브랜치 전략

## 📋 브랜치 전략 개요

이 프로젝트는 다음과 같은 브랜치 전략을 사용합니다:

### 🏗️ 브랜치 구조
```
main (기본 브랜치)
├── feat/1 (기능 개발)
├── fix/2 (단순 수정)
└── bug/3 (버그 수정)
```

### 🎯 브랜치 유형

#### 1. `main` - 기본 브랜치
- **목적**: 프로덕션 배포 가능한 안정적인 코드
- **특징**: 항상 배포 가능한 상태 유지
- **보호 규칙**: 직접 푸시 금지, PR을 통해서만 병합

#### 2. `feat/[이슈번호]` - 기능 개발 브랜치
- **목적**: 새로운 기능 개발
- **예시**: `feat/1`, `feat/2`
- **생성 시점**: 새로운 기능 개발 요청 시
- **병합 조건**: 기능 완성, 테스트 통과, 코드 리뷰 완료

#### 3. `fix/[이슈번호]` - 단순 수정 브랜치
- **목적**: 기존 기능 개선, 코드 리팩토링, 단순 수정
- **예시**: `fix/1`, `fix/2`
- **생성 시점**: 기능 개선이나 수정 요청 시
- **병합 조건**: 수정 완료, 테스트 통과, 코드 리뷰 완료

#### 4. `bug/[이슈번호]` - 버그 수정 브랜치
- **목적**: 발견된 버그 수정
- **예시**: `bug/1`, `bug/2`
- **생성 시점**: 버그 발견 및 수정 요청 시
- **병합 조건**: 버그 수정 완료, 재현 테스트 통과, 회귀 테스트 완료

## 🔄 워크플로우

### 1. 이슈 생성
1. GitHub에서 적절한 이슈 템플릿 선택
2. 이슈 제목 형식: `[feat/fix/bug]: [제목]`
3. 상세 내용 작성 후 이슈 생성

### 2. 브랜치 생성
```bash
# 기능 개발
git checkout main
git pull origin main
git checkout -b feat/1

# 단순 수정
git checkout -b fix/2

# 버그 수정
git checkout -b bug/3
```

### 3. 개발 및 커밋
```bash
# 작업 진행
git add .
git commit -m "feat: 사용자 인증 기능 구현

- JWT 토큰 기반 인증 시스템 추가
- 로그인/로그아웃 API 구현
- 프론트엔드 인증 컴포넌트 추가

Closes #1"
```

### 4. 푸시 및 PR 생성
```bash
git push origin feat/1
```

### 5. Pull Request 생성
- PR 제목 형식: `[feat/fix/bug]: [이슈번호] - [간단한 설명]`
- PR 템플릿에 따라 상세 내용 작성
- 리뷰어 지정 및 라벨 추가

### 6. 코드 리뷰 및 병합
- 코드 리뷰 완료
- 모든 체크리스트 완료
- 충돌 해결
- main 브랜치로 병합

## 📝 커밋 메시지 규칙

### 형식
```
[타입]: [제목]

[본문]

[푸터]
```

### 타입 종류
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정 등

### 예시
```
feat: 사용자 프로필 편집 기능 추가

- 프로필 이미지 업로드 기능
- 개인정보 수정 폼 구현
- 유효성 검사 로직 추가

Closes #1
```

## 🛡️ 브랜치 보호 규칙

### main 브랜치 보호 설정
1. **Branch protection rules** 활성화
2. **Require pull request reviews** 활성화 (최소 1명)
3. **Require status checks to pass** 활성화
4. **Require branches to be up to date** 활성화
5. **Restrict pushes that create files** 활성화

## 🏷️ 라벨 시스템

### 이슈 라벨
- `enhancement`: 기능 개발
- `feature`: 새로운 기능
- `fix`: 수정사항
- `improvement`: 개선사항
- `bug`: 버그
- `high-priority`: 높은 우선순위
- `ready-for-review`: 리뷰 준비 완료

### PR 라벨
- `ready-for-review`: 리뷰 준비 완료
- `needs-review`: 리뷰 필요
- `approved`: 승인됨
- `changes-requested`: 변경 요청됨

## 📚 참고 자료

- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)
