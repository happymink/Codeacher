# OpenAI API 설정 가이드

## 🆓 무료 테스트 모드 (Mock 피드백)

**OpenAI API 키가 없어도 전체 기능을 테스트할 수 있습니다!**

### 기본 설정 (무료 모드)

`application.yml`에 이미 설정되어 있습니다:

```yaml
openai:
  use-mock: true  # Mock 피드백 사용 (무료)
```

이 설정으로:
- ✅ **OpenAI API 키 불필요**
- ✅ **비용 발생 없음**
- ✅ **전체 플로우 테스트 가능**
- ✅ **즉시 피드백 생성** (API 호출 지연 없음)

### Mock 피드백 예시

```json
{
  "problemType": "구현",
  "overallFeedback": "안녕하세요! 코디봇입니다. 코드를 잘 작성하셨네요! 기본적인 로직이 명확하고 가독성이 좋습니다...",
  "feedbacks": [
    "✅ 코드 구조가 명확하고 이해하기 쉽습니다.",
    "✅ 변수명이 의미를 잘 전달하고 있습니다.",
    "💡 에러 처리를 추가하면 더 안정적인 코드가 될 것 같아요."
  ],
  "keyPoints": [
    "📌 BAEKJOON 문제의 핵심은 주어진 요구사항을 정확히 구현하는 것입니다.",
    "📌 입력값의 범위와 제약조건을 항상 확인하세요."
  ],
  "warnings": [
    "⚠️ 큰 입력값에 대한 성능을 고려해보세요.",
    "⚠️ 엣지 케이스(빈 배열, null 등)를 처리했는지 확인하세요."
  ],
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(1)",
  "alternativeApproach": "현재 구현도 좋지만, 내장 라이브러리 함수를 활용하면..."
}
```

---

## 💰 실제 OpenAI API 사용 (유료)

실제 GPT를 사용하려면:

### 1. OpenAI API 키 발급

1. [OpenAI Platform](https://platform.openai.com/) 가입
2. [API Keys](https://platform.openai.com/api-keys) 페이지에서 키 생성
3. **결제 수단 등록 필수** (무료 크레딧은 제한적)

### 2. 비용

| 모델 | 입력 비용 | 출력 비용 | 권장 |
|------|----------|----------|------|
| gpt-3.5-turbo | $0.0005 / 1K tokens | $0.0015 / 1K tokens | ✅ 추천 |
| gpt-4 | $0.03 / 1K tokens | $0.06 / 1K tokens | 별도 승인 필요 |
| gpt-4-turbo | $0.01 / 1K tokens | $0.03 / 1K tokens | 별도 승인 필요 |

**예상 비용**: 코드 제출 1회당 약 $0.01~0.05

### 3. 설정 방법

#### 방법 A: 환경 변수 (추천)

`backend/.env` 파일에 추가:

```bash
OPENAI_API_KEY=sk-proj-...
OPENAI_USE_MOCK=false
OPENAI_MODEL=gpt-3.5-turbo
```

#### 방법 B: IntelliJ 실행 설정

1. Run → Edit Configurations
2. Environment variables 추가:
   ```
   OPENAI_API_KEY=sk-proj-...;OPENAI_USE_MOCK=false
   ```

### 4. 백엔드 재시작

```bash
cd backend
mvn spring-boot:run
```

로그 확인:
```
INFO --- [codeacher] : Mock 피드백 생성 모드  # Mock 모드
INFO --- [codeacher] : AI 피드백 생성 완료  # 실제 API 모드
```

---

## 🔄 모드 전환

### Mock → 실제 API

```yaml
# application.yml 또는 환경 변수
openai:
  api-key: sk-proj-your-actual-key
  use-mock: false
```

### 실제 API → Mock

```yaml
openai:
  use-mock: true
```

또는 API 키를 제거/dummy로 설정하면 자동으로 Mock 모드로 동작합니다.

---

## 🚨 문제 해결

### "You exceeded your current quota"

**원인**: 
- OpenAI API 크레딧이 소진됨
- 무료 크레딧이 만료됨 (3개월)
- 결제 수단이 등록되지 않음

**해결**:
1. [OpenAI 결제 페이지](https://platform.openai.com/account/billing) 확인
2. 크레딧 충전 또는 결제 수단 등록
3. 또는 **Mock 모드로 전환** (무료)

### "The model gpt-4 does not exist"

**원인**: GPT-4 모델 접근 권한 없음

**해결**:
```yaml
openai:
  model: gpt-3.5-turbo  # 누구나 사용 가능
```

### "Invalid API key"

**원인**: API 키가 잘못됨

**해결**:
1. API 키 재확인 (`sk-proj-`로 시작)
2. 환경 변수가 제대로 로드되는지 확인
3. 백엔드 재시작

### Mock 피드백이 나오지 않음

**원인**: 설정이 제대로 적용되지 않음

**해결**:
```yaml
openai:
  use-mock: true
```
설정 후 백엔드 재시작

---

## 📊 비교표

| 항목 | Mock 모드 | 실제 API |
|------|-----------|----------|
| 비용 | 무료 | 유료 (건당 $0.01~0.05) |
| API 키 | 불필요 | 필수 |
| 응답 속도 | 즉시 | 2~10초 |
| 피드백 품질 | 일반적 | AI 분석 기반 |
| 사용 제한 | 없음 | API 할당량 |
| 권장 시나리오 | 개발/테스트 | 프로덕션 |

---

## 💡 권장 사항

### 개발 단계
- ✅ **Mock 모드 사용** (무료, 빠름)
- 전체 플로우 테스트
- UI/UX 개발
- 통합 테스트

### 프로덕션 배포
- 실제 OpenAI API 사용
- GPT-3.5-Turbo 권장 (비용 대비 성능)
- API 호출 제한 설정
- 에러 핸들링 강화

---

## 🔧 설정 파일 전체 예시

### Mock 모드 (무료)
```yaml
# application.yml
openai:
  api-key: ${OPENAI_API_KEY:dummy-openai-key}
  model: ${OPENAI_MODEL:gpt-3.5-turbo}
  use-mock: ${OPENAI_USE_MOCK:true}  # Mock 사용
```

### 실제 API 모드 (유료)
```yaml
# application.yml
openai:
  api-key: ${OPENAI_API_KEY}  # 필수
  model: ${OPENAI_MODEL:gpt-3.5-turbo}
  use-mock: ${OPENAI_USE_MOCK:false}  # 실제 API 사용
```

```bash
# backend/.env
OPENAI_API_KEY=sk-proj-your-actual-key
OPENAI_USE_MOCK=false
OPENAI_MODEL=gpt-3.5-turbo
```

---

## 📚 추가 정보

- [OpenAI 가격 정책](https://openai.com/pricing)
- [OpenAI API 문서](https://platform.openai.com/docs)
- [사용량 확인](https://platform.openai.com/usage)

---

## 🎉 결론

**OpenAI API 없이도 전체 기능을 무료로 테스트할 수 있습니다!**

기본 설정(`use-mock: true`)으로 바로 시작하세요. 실제 AI 피드백이 필요할 때만 API 키를 설정하면 됩니다.

