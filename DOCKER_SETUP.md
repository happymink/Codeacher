# Docker로 PostgreSQL 실행하기

## 사전 준비

1. Docker와 Docker Compose가 설치되어 있어야 합니다.
   - Docker Desktop 다운로드: https://www.docker.com/products/docker-desktop/

## 설정 방법

### 1. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 필요한 값을 설정하세요:

```bash
cp .env.example .env
```

`.env` 파일을 열어서 다음 값들을 설정하세요:
- `GOOGLE_CLIENT_ID`: Google OAuth2 클라이언트 ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth2 클라이언트 시크릿
- `OPENAI_API_KEY`: OpenAI API 키

### 2. PostgreSQL 시작

프로젝트 루트 디렉토리에서 다음 명령어를 실행하세요:

```bash
docker-compose up -d postgres
```

### 3. PostgreSQL 상태 확인

```bash
docker-compose ps
```

또는 로그 확인:

```bash
docker-compose logs -f postgres
```

### 4. 백엔드 애플리케이션 실행

PostgreSQL이 실행 중이면 백엔드를 시작할 수 있습니다:

```bash
cd backend
mvn spring-boot:run
```

또는 IntelliJ/Eclipse에서 `CodeacherApplication.java`를 실행하세요.

## Docker 명령어

### PostgreSQL 중지
```bash
docker-compose stop postgres
```

### PostgreSQL 시작 (이미 생성된 경우)
```bash
docker-compose start postgres
```

### PostgreSQL 재시작
```bash
docker-compose restart postgres
```

### PostgreSQL 완전 삭제 (데이터 포함)
```bash
docker-compose down -v
```

### PostgreSQL 로그 보기
```bash
docker-compose logs -f postgres
```

## 데이터베이스 접속

### Docker 컨테이너 내에서 psql 접속
```bash
docker-compose exec postgres psql -U postgres -d codeacher
```

### 외부 PostgreSQL 클라이언트로 접속
- Host: `localhost`
- Port: `5432`
- Database: `codeacher`
- Username: `postgres`
- Password: `postgres` (또는 `.env`에서 설정한 값)

추천 클라이언트:
- [DBeaver](https://dbeaver.io/)
- [pgAdmin](https://www.pgadmin.org/)
- [DataGrip](https://www.jetbrains.com/datagrip/)

## 트러블슈팅

### 포트 5432가 이미 사용 중인 경우

로컬에 PostgreSQL이 이미 설치되어 실행 중일 수 있습니다.

**해결 방법 1**: 로컬 PostgreSQL 중지
```bash
# Windows (관리자 권한 PowerShell)
Stop-Service postgresql-x64-[버전]

# 또는 서비스에서 수동으로 중지
services.msc
```

**해결 방법 2**: Docker 포트 변경
`docker-compose.yml`에서 포트를 변경:
```yaml
ports:
  - "5433:5432"  # 5432 대신 5433 사용
```

그리고 `application.yml`의 URL도 수정:
```yaml
url: jdbc:postgresql://localhost:5433/codeacher
```

### 데이터 초기화

데이터를 완전히 초기화하고 다시 시작하려면:
```bash
docker-compose down -v
docker-compose up -d postgres
```

## 프로덕션 환경

프로덕션 환경에서는:
1. 강력한 비밀번호 사용
2. `.env` 파일을 Git에 커밋하지 않기 (이미 `.gitignore`에 포함됨)
3. 데이터 백업 전략 수립
4. 적절한 볼륨 백업 설정

## 향후 개선 사항

백엔드도 도커라이징하려면 `docker-compose.yml`의 주석 처리된 `backend` 서비스를 활성화하고, `backend/Dockerfile`을 생성하면 됩니다.

