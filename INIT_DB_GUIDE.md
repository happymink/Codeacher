# 데이터베이스 초기화 가이드

## 문제 상황

`/api/characters/cody` 호출 시 "캐릭터를 찾을 수 없습니다" 에러 발생
→ DB에 초기 데이터가 없음

## 해결 방법

### ✅ 방법 1: 백엔드 재시작 (추천)

`application.yml`에 설정을 추가했으므로 백엔드를 재시작하면 자동으로 `data.sql`이 실행됩니다.

```bash
# IntelliJ에서 애플리케이션 중지 후 재시작
# 또는
cd backend
mvn spring-boot:run
```

재시작 후 다음 로그가 보이면 성공:
```
Executing SQL script from URL [file:/.../data.sql]
```

### ✅ 방법 2: Docker exec으로 직접 실행

Docker 컨테이너에 접속해서 SQL 파일을 직접 실행:

```bash
# 1. SQL 파일을 컨테이너로 복사
docker cp backend/src/main/resources/data.sql codeacher-postgres:/tmp/data.sql

# 2. SQL 실행
docker-compose exec postgres psql -U postgres -d codeacher -f /tmp/data.sql
```

### ✅ 방법 3: psql로 직접 접속해서 입력

```bash
# PostgreSQL 접속
docker-compose exec postgres psql -U postgres -d codeacher

# 아래 SQL을 복사-붙여넣기
INSERT INTO characters (id, name, emoji, description, specialty, color_theme, personality, is_active) VALUES
('cody', '코디봇', '🤖', '논리적 분석가', '알고리즘 패턴 분석', 'hsl(207, 71%, 59%)', 'logical', true),
('owl', '알고 선생님', '🦉', '지혜로운 교수님', '개념 설명 전문', 'hsl(25, 40%, 40%)', 'wise', true),
('debuggy', '디버기', '🐛', '꼼꼼한 탐정', '버그 및 엣지케이스 탐지', 'hsl(0, 79%, 70%)', 'meticulous', true),
('speedy', '스피디', '🚀', '최적화 전문가', '성능 개선 제안', 'hsl(28, 100%, 50%)', 'energetic', true),
('coco', '코코', '🐱', '친근한 친구', '초보자 친화적 설명', 'hsl(350, 100%, 88%)', 'friendly', true),
('cube', '프로페서 큐브', '🧊', '전문가 스타일', '심층 분석', 'hsl(283, 39%, 53%)', 'professional', true)
ON CONFLICT (id) DO NOTHING;
```

---

## 확인 방법

### 1. DB에서 직접 확인

```bash
docker-compose exec postgres psql -U postgres -d codeacher -c "SELECT id, name, emoji FROM characters;"
```

기대 결과:
```
   id    |      name       | emoji 
---------+-----------------+-------
 cody    | 코디봇          | 🤖
 owl     | 알고 선생님     | 🦉
 debuggy | 디버기          | 🐛
 speedy  | 스피디          | 🚀
 coco    | 코코            | 🐱
 cube    | 프로페서 큐브   | 🧊
```

### 2. API로 확인

```bash
# 모든 캐릭터 조회
curl http://localhost:8080/api/characters

# 특정 캐릭터 조회
curl http://localhost:8080/api/characters/cody
```

성공 응답:
```json
{
  "success": true,
  "data": {
    "id": "cody",
    "name": "코디봇",
    "emoji": "🤖",
    "description": "논리적 분석가",
    "specialty": "알고리즘 패턴 분석",
    "colorTheme": "hsl(207, 71%, 59%)",
    "personality": "logical",
    "dialogues": {
      "loading": [...],
      "analyzing": [...],
      "complete": [...]
    }
  }
}
```

---

## 🔍 `/api/characters/{id}` API 설명

### 용도
특정 캐릭터의 상세 정보를 조회합니다.

### 요청
```
GET /api/characters/{characterId}
```

### 파라미터
- `characterId`: 캐릭터 ID (cody, owl, debuggy, speedy, coco, cube)

### 응답
```json
{
  "success": true,
  "data": {
    "id": "cody",
    "name": "코디봇",
    "emoji": "🤖",
    "description": "논리적 분석가",
    "specialty": "알고리즘 패턴 분석",
    "colorTheme": "hsl(207, 71%, 59%)",
    "personality": "logical",
    "dialogues": {
      "loading": [
        "코드 분석을 시작합니다...",
        "알고리즘 패턴을 파악하는 중...",
        "데이터 구조를 검토하고 있어요"
      ],
      "analyzing": [
        "흠... 이 로직은...",
        "오! 여기가 핵심이네요!",
        "최적화 포인트를 찾았어요"
      ],
      "complete": [
        "분석 완료! 피드백을 확인해보세요",
        "모든 분석이 끝났습니다!"
      ]
    }
  }
}
```

### 사용 시나리오
1. **캐릭터 선택 화면**: 사용자가 선택할 수 있는 캐릭터 목록 표시
2. **피드백 화면**: 선택한 캐릭터의 대사를 단계별로 표시
3. **프로필 확인**: 캐릭터의 상세 정보 조회

---

## 관련 엔드포인트

### 모든 캐릭터 조회
```
GET /api/characters
```
활성화된 모든 캐릭터 목록을 반환합니다.

### 현재 선택된 캐릭터 조회 (인증 필요)
```
GET /api/characters/current
Authorization: Bearer {token}
```
로그인한 사용자가 현재 선택한 캐릭터를 반환합니다.

### 캐릭터 선택 (인증 필요)
```
PUT /api/characters/select/{characterId}
Authorization: Bearer {token}
```
사용자의 선택 캐릭터를 변경합니다.

---

## 추가 정보

### 캐릭터 ID 목록
- `cody` - 코디봇 (논리적 분석가)
- `owl` - 알고 선생님 (지혜로운 교수님)
- `debuggy` - 디버기 (꼼꼼한 탐정)
- `speedy` - 스피디 (최적화 전문가)
- `coco` - 코코 (친근한 친구)
- `cube` - 프로페서 큐브 (전문가 스타일)

### 캐릭터 역할
각 캐릭터는 코드 피드백 시 다른 스타일과 전문 분야로 피드백을 제공합니다.

---

## 문제 해결

### "캐릭터를 찾을 수 없습니다" 에러
→ DB에 데이터가 없음. 위의 해결 방법 중 하나 실행

### "Table 'characters' doesn't exist" 에러  
→ 백엔드를 한 번 실행해서 테이블 자동 생성 필요

### 데이터가 계속 초기화됨
→ `application.yml`의 `spring.sql.init.mode`를 `never`로 변경

