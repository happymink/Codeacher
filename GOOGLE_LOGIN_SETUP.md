# 구글 로그인 설정 가이드

## 1. 패키지 설치

프론트엔드 디렉토리에서 다음 명령을 실행하세요:

```bash
cd frontend/prompt-to-ui-korean-main/prompt-to-ui-korean-main
npm install @react-oauth/google
```

## 2. 환경 변수 설정

`frontend/prompt-to-ui-korean-main/prompt-to-ui-korean-main/.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 백엔드 API URL
VITE_API_URL=http://localhost:8080

# Mock 데이터 사용 여부
VITE_USE_MOCK=false

# 구글 OAuth 클라이언트 ID
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## 3. Google Cloud Console 설정

### 3.1. Google Cloud Console 접속
https://console.cloud.google.com/apis/credentials

### 3.2. OAuth 2.0 클라이언트 ID 생성

1. **프로젝트 생성** (없는 경우)
   - 상단 메뉴에서 프로젝트 선택 → 새 프로젝트 생성

2. **OAuth 동의 화면 구성**
   - 좌측 메뉴: `OAuth 동의 화면`
   - User Type: `외부` 선택
   - 앱 이름: `Codeacher`
   - 사용자 지원 이메일: 본인 이메일
   - 개발자 연락처: 본인 이메일
   - 저장

3. **사용자 인증 정보 만들기**
   - 좌측 메뉴: `사용자 인증 정보`
   - `+ 사용자 인증 정보 만들기` → `OAuth 클라이언트 ID`
   - 애플리케이션 유형: `웹 애플리케이션`
   - 이름: `Codeacher Web Client`
   - 승인된 JavaScript 원본:
     - `http://localhost:5173`
   - 승인된 리디렉션 URI:
     - `http://localhost:5173`
   - 만들기

4. **클라이언트 ID 복사**
   - 생성된 클라이언트 ID를 복사
   - `.env.local` 파일의 `VITE_GOOGLE_CLIENT_ID`에 붙여넣기

## 4. 백엔드 설정 확인

`backend/.env` 파일에 다음 내용이 있는지 확인하세요:

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> **참고**: 백엔드의 GOOGLE_CLIENT_ID는 프론트엔드와 같은 값이어야 합니다.
> GOOGLE_CLIENT_SECRET은 Google Cloud Console의 OAuth 클라이언트 세부정보에서 확인할 수 있습니다.

## 5. 로그인 페이지 확인

프론트엔드를 실행하고 로그인 페이지에 접속하면:

- **구글 로그인 버튼**: `VITE_GOOGLE_CLIENT_ID`가 설정된 경우 표시됨
- **테스트 로그인 버튼**: 개발용 테스트 로그인 (백엔드 연결 확인용)

## 6. 테스트

1. 프론트엔드 실행:
   ```bash
   cd frontend/prompt-to-ui-korean-main/prompt-to-ui-korean-main
   npm run dev
   ```

2. `http://localhost:5173` 접속

3. 구글 로그인 버튼 클릭하여 테스트

## 문제 해결

### "Google Client ID가 설정되지 않았습니다" 경고
- `.env.local` 파일이 생성되었는지 확인
- `VITE_GOOGLE_CLIENT_ID` 값이 올바른지 확인
- 프론트엔드를 재시작 (환경 변수 변경 후 필수)

### 구글 로그인 후 에러 발생
- 백엔드가 실행 중인지 확인 (`http://localhost:8080`)
- 백엔드의 `GOOGLE_CLIENT_ID`가 프론트엔드와 동일한지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### "redirect_uri_mismatch" 에러
- Google Cloud Console의 승인된 리디렉션 URI에 `http://localhost:5173`이 추가되었는지 확인
- 승인된 JavaScript 원본에 `http://localhost:5173`이 추가되었는지 확인

## 참고

- Google OAuth 2.0 문서: https://developers.google.com/identity/protocols/oauth2
- @react-oauth/google 문서: https://www.npmjs.com/package/@react-oauth/google

