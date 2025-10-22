# 🛡️ GitHub 브랜치 보호 규칙 설정 가이드

## 📋 개요
이 가이드는 Codeacher 프로젝트의 main 브랜치를 보호하고 안정적인 코드 관리를 위한 GitHub 설정 방법을 설명합니다.

## 🔧 설정 단계

### 1. GitHub 저장소 설정 페이지 접근
1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Branches** 클릭

### 2. 브랜치 보호 규칙 추가
1. **Add rule** 버튼 클릭
2. **Branch name pattern**에 `main` 입력

### 3. 보호 규칙 설정

#### ✅ 필수 설정 항목
- [ ] **Require a pull request before merging**
  - **Require approvals**: `1` (최소 1명의 승인 필요)
  - **Dismiss stale PR approvals when new commits are pushed**: 체크
  - **Require review from code owners**: 체크 (CODEOWNERS 파일이 있는 경우)

- [ ] **Require status checks to pass before merging**
  - **Require branches to be up to date before merging**: 체크
  - **Status checks**: CI/CD 파이프라인이 있다면 추가

- [ ] **Require conversation resolution before merging**: 체크

- [ ] **Require signed commits**: 체크 (선택사항)

- [ ] **Require linear history**: 체크 (선택사항)

- [ ] **Restrict pushes that create files**: 체크

#### ⚠️ 주의사항
- **Allow force pushes**: 체크 해제
- **Allow deletions**: 체크 해제

### 4. 관리자 예외 설정
- **Restrict pushes that create files** 섹션에서
- **Restrict pushes that create files** 체크
- **Allow specified actors to bypass required pull requests** 체크 해제

## 📁 CODEOWNERS 파일 생성 (선택사항)

프로젝트 루트에 `.github/CODEOWNERS` 파일을 생성하여 코드 소유자를 지정할 수 있습니다.

```bash
# .github/CODEOWNERS 파일 예시
# 전체 프로젝트 소유자
* @happymink

# 백엔드 코드 소유자
/backend/ @happymink

# 프론트엔드 코드 소유자
/frontend/ @happymink

# 문서 소유자
*.md @happymink
```

## 🔄 워크플로우 예시

### 개발자가 작업하는 경우
1. 이슈 생성 (예: feat: 사용자 인증 기능 #1)
2. 브랜치 생성: `git checkout -b feat/1`
3. 개발 및 커밋
4. 푸시: `git push origin feat/1`
5. Pull Request 생성
6. 코드 리뷰 요청
7. 승인 후 병합

### 관리자가 직접 푸시하는 경우 (비상시)
1. GitHub 웹에서 직접 파일 수정
2. 또는 로컬에서 강제 푸시 (권장하지 않음)

## 🚨 문제 해결

### 일반적인 문제들

#### 1. "Protected branch update failed"
- **원인**: 보호 규칙에 위반되는 푸시 시도
- **해결**: PR을 통한 병합 사용

#### 2. "Required status check is waiting"
- **원인**: CI/CD 파이프라인이 실행 중이거나 실패
- **해결**: 파이프라인 완료 대기 또는 재실행

#### 3. "Review required"
- **원인**: 필요한 승인자 수 미달
- **해결**: 추가 리뷰어 요청 또는 승인 대기

## 📊 모니터링 및 관리

### 브랜치 보호 상태 확인
1. 저장소 메인 페이지에서 브랜치 목록 확인
2. main 브랜치 옆의 보호 아이콘 확인
3. Settings > Branches에서 규칙 상태 확인

### 규칙 위반 알림
- GitHub 이메일 알림 설정
- Slack/Discord 연동 (선택사항)
- 웹훅 설정 (고급 사용자)

## 🔧 고급 설정

### 자동 병합 설정
1. PR 생성 시 **Auto-merge** 옵션 활성화
2. 모든 조건 충족 시 자동 병합

### 브랜치 정책 설정
1. **Branch protection rules** 확장
2. **Require up-to-date branches** 활성화
3. **Restrict pushes that create files** 활성화

## 📚 참고 자료

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [CODEOWNERS 파일](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub 워크플로우](https://docs.github.com/en/actions/using-workflows)

## ⚡ 빠른 설정 체크리스트

- [ ] main 브랜치 보호 규칙 활성화
- [ ] PR 승인 요구사항 설정 (최소 1명)
- [ ] 상태 체크 요구사항 설정
- [ ] 대화 해결 요구사항 설정
- [ ] 강제 푸시 비활성화
- [ ] 브랜치 삭제 비활성화
- [ ] CODEOWNERS 파일 생성 (선택사항)
- [ ] 이슈 템플릿 확인
- [ ] PR 템플릿 확인
- [ ] 라벨 시스템 설정 확인
