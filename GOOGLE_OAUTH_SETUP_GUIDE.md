# 🔐 Google OAuth 설정 가이드

## 📋 개요

Codeacher 프로젝트에서 Google OAuth 로그인을 활성화하는 방법을 설명합니다.

## 🛠️ 설정 단계

### 1. Google Cloud Console 설정

#### 1.1 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. **프로젝트 선택** 또는 **새 프로젝트** 생성
3. 프로젝트 이름: `codeacher` (또는 원하는 이름)

#### 1.2 OAuth 동의 화면 설정
1. **API 및 서비스 > OAuth 동의 화면** 메뉴로 이동
2. **외부** 선택 (개인 계정 사용)
3. **앱 정보** 입력:
   - 앱 이름: `Codeacher`
   - 사용자 지원 이메일: `your-email@gmail.com`
   - 개발자 연락처 정보: `your-email@gmail.com`
4. **범위** 추가:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. **테스트 사용자** 추가 (개발 단계에서)

#### 1.3 OAuth 2.0 클라이언트 ID 생성
1. **API 및 서비스 > 사용자 인증 정보** 메뉴로 이동
2. **+ 사용자 인증 정보 만들기 > OAuth 2.0 클라이언트 ID** 선택
3. **애플리케이션 유형**: 웹 애플리케이션
4. **이름**: `Codeacher Web Client`
5. **승인된 자바스크립트 원본**:
   - `http://localhost:5173` (개발용)
   - `https://yourdomain.com` (프로덕션용)
6. **승인된 리디렉션 URI**:
   - `http://localhost:8080/login/oauth2/code/google` (백엔드)
   - `http://localhost:5173` (프론트엔드, 필요시)

### 2. 백엔드 설정

#### 2.1 환경 변수 설정
`backend/env.example` 파일을 `backend/.env`로 복사하고 실제 값 입력:

```env
# Google OAuth 설정
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# 기타 설정...
DB_USERNAME=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_very_long_secret_key_at_least_256_bits
OPENAI_API_KEY=sk-your_openai_api_key
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8080
```

#### 2.2 백엔드 실행
```bash
cd backend
mvn spring-boot:run
```

### 3. 프론트엔드 설정

#### 3.1 환경 변수 설정
`frontend/prompt-to-ui-korean-main/prompt-to-ui-korean-main/env.example` 파일을 `.env.local`로 복사하고 실제 값 입력:

```env
# Google OAuth 설정
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# 백엔드 API URL
VITE_API_BASE_URL=http://localhost:8080

# Mock 모드 설정 (개발용)
VITE_USE_MOCK=false
```

#### 3.2 프론트엔드 실행
```bash
cd frontend/prompt-to-ui-korean-main/prompt-to-ui-korean-main
npm install
npm run dev
```

## 🧪 테스트 방법

### 1. 개발 환경 테스트
1. 백엔드 서버 실행: `http://localhost:8080`
2. 프론트엔드 서버 실행: `http://localhost:5173`
3. 브라우저에서 `http://localhost:5173` 접속
4. **Google로 로그인** 버튼 클릭
5. Google 계정으로 로그인
6. 로그인 성공 후 캐릭터 선택 페이지로 이동 확인

### 2. API 테스트
```bash
# Google OAuth 로그인 테스트
curl -X POST http://localhost:8080/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"credential": "google_jwt_token_here"}'
```

## 🔧 문제 해결

### 일반적인 문제들

#### 1. "Invalid client" 오류
- **원인**: Google Client ID가 잘못됨
- **해결**: Google Cloud Console에서 Client ID 확인 및 재설정

#### 2. "Redirect URI mismatch" 오류
- **원인**: 승인된 리디렉션 URI가 일치하지 않음
- **해결**: Google Cloud Console에서 리디렉션 URI 추가

#### 3. CORS 오류
- **원인**: 백엔드 CORS 설정 문제
- **해결**: `application.yml`에서 `cors.allowed-origins` 확인

#### 4. JWT 토큰 오류
- **원인**: JWT Secret이 설정되지 않음
- **해결**: `.env` 파일에서 `JWT_SECRET` 설정

### 로그 확인
```bash
# 백엔드 로그 확인
tail -f backend/logs/application.log

# 프론트엔드 콘솔 확인
# 브라우저 개발자 도구 > Console 탭
```

## 🚀 프로덕션 배포

### 1. Google Cloud Console 설정
1. **OAuth 동의 화면**에서 **게시** 버튼 클릭
2. **승인된 자바스크립트 원본**에 실제 도메인 추가
3. **승인된 리디렉션 URI**에 실제 도메인 추가

### 2. 환경 변수 설정
- 프로덕션 서버에 실제 Google OAuth 정보 설정
- JWT Secret을 강력한 랜덤 문자열로 변경
- CORS 설정에 프로덕션 도메인 추가

### 3. 보안 고려사항
- Google Client Secret을 안전하게 보관
- JWT Secret을 환경 변수로 관리
- HTTPS 사용 필수
- 정기적인 Secret 키 로테이션

## 📚 참고 자료

- [Google OAuth 2.0 문서](https://developers.google.com/identity/protocols/oauth2)
- [Spring Security OAuth2 문서](https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html)
- [React Google OAuth 라이브러리](https://www.npmjs.com/package/@react-oauth/google)

## ✅ 체크리스트

- [ ] Google Cloud Console 프로젝트 생성
- [ ] OAuth 동의 화면 설정 완료
- [ ] OAuth 2.0 클라이언트 ID 생성
- [ ] 백엔드 환경 변수 설정
- [ ] 프론트엔드 환경 변수 설정
- [ ] 로컬 테스트 완료
- [ ] 프로덕션 설정 (배포 시)
