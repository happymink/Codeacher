# AI 캐릭터 애니메이션 생성 프롬프트

## 프로젝트 개요

**Codeacher** 서비스의 6종 캐릭터 선생님들의 애니메이션을 제작해주세요.

각 캐릭터는 코딩테스트 답안을 분석하는 동안 화면에 표시되며, 사용자에게 친근하고 재미있는 경험을 제공하는 것이 목표입니다.

---

## 전체 요구사항

### 애니메이션 스타일
- **스타일**: 귀엽고 친근한 2D 캐릭터 디자인
- **분위기**: 교육적이면서도 즐거운, 전문성과 친근함의 균형
- **표현**: 심플하고 명확한 실루엣, 과도하게 복잡하지 않음
- **색상**: 각 캐릭터의 테마 컬러를 주조색으로 사용

### 기술 사양
- **해상도**: 512x512px (정사각형)
- **파일 포맷**: 
  - 주요: GIF 또는 Lottie JSON (웹 최적화)
  - 대안: APNG, WebP 애니메이션
  - 고화질 원본: MP4 (알파 채널 포함)
- **프레임레이트**: 30fps
- **배경**: 투명 (알파 채널)
- **애니메이션 길이**: 2-3초 루프

### 애니메이션 상태 (각 캐릭터당 3종류)

1. **Idle (대기) 상태**
   - 부드럽게 위아래로 떠 있는 듯한 움직임
   - 눈 깜빡임
   - 호흡하는 듯한 효과

2. **Analyzing (분석 중) 상태**
   - 좌우로 약간 고개를 갸웃거림
   - 생각하는 표정
   - 주변에 💭📄💡 아이콘이 나타났다 사라지는 효과

3. **Complete (완료) 상태**
   - 밝은 표정으로 변화
   - 손 흔들기 또는 엄지척
   - 반짝이는 효과 (✨)

---

## 캐릭터별 상세 사양

---

### 캐릭터 1: 🤖 코디봇 (Cody Bot)

**기본 정보:**
- 이름: 코디봇
- 성격: 논리적이고 체계적, 약간 진지하지만 따뜻함
- 주조색: #4A90E2 (파란색)
- 보조색: #87CEEB (하늘색), #FFFFFF (흰색)

**캐릭터 디자인:**
```
A cute robot character for a coding education platform.

Physical features:
- Round, friendly robot head with smooth edges
- Two circular LED eyes (blue color #4A90E2) that glow softly
- Small antenna on top with a light bulb that blinks
- Rectangular body with rounded corners
- Simple arms and legs (cylindrical)
- Metallic blue color scheme (#4A90E2)
- White accents on chest panel
- Small details: circuitry patterns, screws, panel lines
- Overall height ratio: head 40%, body 60%

Style:
- Cute and approachable, not intimidating
- Clean, modern design
- Friendly proportions (chibi-style)
- Smooth gradients for depth
- Slight shine/reflection on metallic surfaces

Background: transparent

View: front view, centered, full body
```

**애니메이션 상태:**

1. **Idle Animation:**
```
Cody Bot robot character idle animation.

Movement:
- Gentle floating motion (y-axis: up 10px down 10px, 2 second cycle)
- Eyes blink every 3 seconds (simple close-open)
- Antenna light pulses softly (fade in/out)
- Slight rotation of body (±2 degrees)

Style: smooth, mechanical but friendly
Duration: 3 seconds loop
Format: transparent background
```

2. **Analyzing Animation:**
```
Cody Bot robot character analyzing/thinking animation.

Movement:
- Head tilts left and right slowly (±10 degrees, examining something)
- Eyes move side to side (scanning motion)
- Antenna light blinks faster (processing data)
- Small 💭 thought bubble appears next to head
- 📄 document icon floats up and fades
- 💡 lightbulb occasionally pops above antenna

Facial expression: focused, concentrated
Style: mechanical precision with curiosity
Duration: 3 seconds loop
```

3. **Complete Animation:**
```
Cody Bot robot character completion/success animation.

Movement:
- Quick jump up and down (celebratory bounce)
- Eyes change to happy crescents (^_^)
- Antenna light glows bright continuously
- One arm raises in thumbs up gesture
- ✨ sparkles appear around character
- Small smile on screen panel (if applicable)

Facial expression: happy, satisfied
Style: energetic, positive
Duration: 2 seconds (can loop)
```

---

### 캐릭터 2: 🦉 알고 선생님 (Professor Owl)

**기본 정보:**
- 이름: 알고 선생님
- 성격: 지혜롭고 차분한 교수님 스타일
- 주조색: #8B4513 (갈색)
- 보조색: #D2691E (오렌지 브라운), #F5DEB3 (베이지)

**캐릭터 디자인:**
```
A wise owl professor character for a coding education platform.

Physical features:
- Round, fluffy owl body with soft feathers
- Large, round glasses (thick black frames)
- Wise, gentle eyes behind glasses
- Small beak (yellow/orange)
- Feather tufts on head (ear-like)
- Wings folded at sides (can unfold slightly)
- Holding a small book or pointer stick
- Small graduation cap or professor's hat (optional)
- Brown color scheme (#8B4513) with lighter beige belly
- Overall proportions: large head (50%), smaller body

Style:
- Wise and friendly, not intimidating
- Soft, round shapes
- Academic accessories (glasses, book)
- Fluffy feather texture (but not overly detailed)
- Warm, comforting appearance

Background: transparent

View: front view, centered, full body
```

**애니메이션 상태:**

1. **Idle Animation:**
```
Professor Owl character idle animation.

Movement:
- Slow, gentle swaying (like perched on a branch)
- Eyes blink slowly and wisely
- Feathers ruffle slightly
- Book pages turn occasionally
- Head nods gently
- Glasses glint occasionally

Style: calm, dignified, scholarly
Duration: 3 seconds loop
```

2. **Analyzing Animation:**
```
Professor Owl character analyzing/thinking animation.

Movement:
- Head leans forward (as if examining something closely)
- Eyes squint slightly behind glasses
- One wing raises to adjust glasses
- Book opens and pages flip through
- 💭 thought bubble with algorithm symbols (if-else, loops)
- Small "Hmm..." text appears briefly
- Feathers on head puff up slightly (concentrating)

Facial expression: focused, contemplative, wise
Style: scholarly examination
Duration: 3 seconds loop
```

3. **Complete Animation:**
```
Professor Owl character completion/success animation.

Movement:
- Satisfied nod (up and down, 2-3 times)
- Eyes close briefly in satisfaction
- Wings spread out slightly in approval
- Book closes with a soft glow
- ✨ stars appear around head
- Gentle smile
- Small "Excellent!" text bubble (optional)

Facial expression: proud, pleased, encouraging
Style: gentle celebration, dignified
Duration: 2 seconds
```

---

### 캐릭터 3: 🐛 디버기 (Debuggy)

**기본 정보:**
- 이름: 디버기
- 성격: 꼼꼼하고 디테일 지향적, 약간 수다스러움
- 주조색: #FF6B6B (레드)
- 보조색: #FFB6C1 (핑크), #000000 (검정)

**캐릭터 디자인:**
```
A cute ladybug detective character for a coding education platform.

Physical features:
- Round ladybug body (red #FF6B6B with black spots)
- Large, expressive eyes (cartoon style)
- Small antennae on head
- Six tiny legs
- Holding a magnifying glass (detective theme)
- Optional: tiny detective hat or bow
- Black spots on red shell (3-4 spots, symmetrical)
- Cute, friendly face
- Small size relative to other characters (bug-sized charm)

Style:
- Very cute and approachable
- Detective/investigator theme (magnifying glass is key)
- Round, soft shapes
- Bright, cheerful colors
- Slightly energetic posture

Background: transparent

View: front view, centered, full body or 3/4 view
```

**애니메이션 상태:**

1. **Idle Animation:**
```
Debuggy ladybug character idle animation.

Movement:
- Bouncy floating (enthusiastic energy)
- Antennae wiggle
- Eyes blink with large, expressive motion
- Magnifying glass sways gently
- Spots on shell shimmer slightly
- Legs wiggle cutely

Style: energetic, friendly, alert
Duration: 3 seconds loop
```

2. **Analyzing Animation:**
```
Debuggy ladybug character analyzing/debugging animation.

Movement:
- Magnifying glass moves closer (examining closely)
- Eyes squint and peer through magnifying glass
- Head tilts at different angles (inspecting from multiple views)
- Small "!" exclamation mark appears occasionally
- Antennae perk up when finding something
- "🔍" magnifying glass emoji effect
- Small bug-related icons appear (representing code bugs being found)

Facial expression: curious, investigative, focused
Style: detective work, meticulous inspection
Duration: 3 seconds loop
```

3. **Complete Animation:**
```
Debuggy ladybug character completion/success animation.

Movement:
- Excited jump/bounce
- Wings open briefly (revealing transparent wings underneath red shell)
- Magnifying glass raised in triumph
- Eyes sparkle with excitement
- "Found it!" or "✓" checkmark appears
- Happy wiggle dance
- ✨ sparkles around character

Facial expression: excited, proud, satisfied
Style: enthusiastic celebration
Duration: 2 seconds
```

---

### 캐릭터 4: 🚀 스피디 (Speedy)

**기본 정보:**
- 이름: 스피디
- 성격: 에너제틱하고 효율성 중시
- 주조색: #FF8C00 (오렌지)
- 보조색: #FFD700 (금색), #FF6347 (토마토 레드)

**캐릭터 디자인:**
```
A speedy rocket character for a coding education platform.

Physical features:
- Sleek rocket shape with rounded nose cone
- Two small fins at the base
- Circular window/porthole showing a friendly face inside
- Flame/exhaust trail at bottom (animated flames)
- Orange color scheme (#FF8C00) with red/gold accents
- Speed lines or motion blur elements
- Small wings or stabilizers
- Streamlined, aerodynamic design
- Confident, energetic expression

Style:
- Dynamic, fast-looking even when still
- Sleek and modern design
- Bold colors
- Action-oriented posture (slight tilt upward)
- Trail effects to emphasize speed

Background: transparent

View: front view with slight angle, full body
```

**애니메이션 상태:**

1. **Idle Animation:**
```
Speedy rocket character idle animation.

Movement:
- Gentle hover with small up-down motion
- Flames at bottom flicker continuously
- Small side-to-side wobble (preparing to launch)
- Speed lines pulse
- Window/face blinks
- Slight rotation on axis

Style: ready for action, energetic potential
Duration: 3 seconds loop
```

2. **Analyzing Animation:**
```
Speedy rocket character analyzing/optimizing animation.

Movement:
- Rapid scanning motion (left to right quickly)
- Flames intensify (faster flickering)
- Speed lines multiply
- Small circular orbit around center point
- "⚡" lightning bolt icons appear (representing speed/optimization)
- Dashboard/meter appears showing analysis progress
- Quick, sharp movements

Facial expression: focused, intense, determined
Style: high-speed analysis, optimization mode
Duration: 3 seconds loop
```

3. **Complete Animation:**
```
Speedy rocket character completion/success animation.

Movement:
- Quick upward burst (zoom up briefly)
- Flames trail behind dramatically
- Returns to position with satisfaction
- Victory pose (slight tilt)
- "✓" checkmark zooms across screen
- Speed lines radiate outward
- ✨ sparkles in trail

Facial expression: triumphant, satisfied, confident
Style: fast, energetic, victorious
Duration: 2 seconds
```

---

### 캐릭터 5: 🐱 코코 (Coco)

**기본 정보:**
- 이름: 코코
- 성격: 친근하고 격려를 잘해줌, 초보자 친화적
- 주조색: #FFB6C1 (핑크)
- 보조색: #FFF0F5 (라벤더 블러시), #FF69B4 (핫 핑크)

**캐릭터 디자인:**
```
A cute cat character sitting with a laptop for a coding education platform.

Physical features:
- Adorable cat with round head and body
- Large, sparkling eyes (friendly and encouraging)
- Small pink nose and whiskers
- Cat ears (pointed, alert)
- Sitting position with a small laptop/tablet in front
- Small paws on keyboard
- Fluffy tail curled around body
- Pink color scheme (#FFB6C1) with white accents
- Optional: small bow or collar accessory
- Soft, cuddly appearance

Style:
- Very cute, kawaii style
- Warm and approachable
- Soft, rounded shapes
- Friendly expression
- Cozy, comfortable posture

Background: transparent

View: front view, sitting position, full body
```

**애니메이션 상태:**

1. **Idle Animation:**
```
Coco cat character idle animation.

Movement:
- Gentle breathing motion (body expands/contracts slightly)
- Tail sways gently side to side
- Ears twitch occasionally
- Eyes blink with cute effect
- Paws gently tap on laptop keyboard
- Whiskers wiggle slightly
- Small heart icon appears occasionally (friendly vibe)

Style: cozy, comfortable, encouraging
Duration: 3 seconds loop
```

2. **Analyzing Animation:**
```
Coco cat character analyzing/helping animation.

Movement:
- Leans forward toward laptop (engaged)
- Paws type on keyboard (more actively)
- Ears perk up (focused)
- Eyes move as if reading code
- Small "💭" thought bubble with positive symbols (stars, hearts)
- Tail curls tighter (concentrating)
- Occasional head tilt (thinking)
- Small "You're doing great!" text bubble (optional)

Facial expression: encouraging, supportive, engaged
Style: helpful friend reviewing with you
Duration: 3 seconds loop
```

3. **Complete Animation:**
```
Coco cat character completion/success animation.

Movement:
- Happy wiggle (excited shimmy)
- Paws clap together (celebration)
- Eyes turn to crescents (^_^)
- Tail wags enthusiastically
- Small jump for joy
- Hearts and stars appear around character
- "Great job!" or "🎉" celebration icons
- Purring effect (visual vibration)

Facial expression: proud, happy, celebratory
Style: warm, encouraging celebration
Duration: 2 seconds
```

---

### 캐릭터 6: 🧊 프로페서 큐브 (Professor Cube)

**기본 정보:**
- 이름: 프로페서 큐브
- 성격: 전문가 스타일, 직설적이고 명확함
- 주조색: #9B59B6 (보라색)
- 보조색: #D8BFD8 (엷은 보라), #4B0082 (인디고)

**캐릭터 디자인:**
```
A geometric cube professor character for a coding education platform.

Physical features:
- Main body is a floating cube (perfect geometry)
- Purple gradient (#9B59B6 to lighter shade)
- Minimalist face on front face of cube (simple eyes and line mouth)
- Small geometric patterns on other cube faces (circuit-like)
- Rotating slowly even when idle
- Sharp, clean edges
- Optional: small floating geometric shapes around it
- Slightly glowing edges
- Modern, sleek, professional appearance

Style:
- Geometric, minimalist design
- Professional and refined
- Clean lines and precise angles
- Subtle glow/shine effects
- Tech/modern aesthetic
- Floating, ethereal quality

Background: transparent

View: 3/4 view showing three faces of cube
```

**애니메이션 상태:**

1. **Idle Animation:**
```
Professor Cube character idle animation.

Movement:
- Slow rotation on Y-axis (360 degrees over 4 seconds)
- Gentle floating motion (up and down)
- Edges pulse with soft light
- Geometric patterns shift on surface
- Minimal, controlled movements
- Occasional geometric shapes orbit around cube

Style: precise, professional, controlled
Duration: 4 seconds loop (slower, more refined)
```

2. **Analyzing Animation:**
```
Professor Cube character analyzing/processing animation.

Movement:
- Faster rotation (analyzing data)
- Small geometric particles orbit cube rapidly
- Edges glow brighter
- Faces of cube light up in sequence
- Small data/binary code streams flow across surfaces
- "..." thinking indicator appears
- Precise, mechanical movements

Facial expression: focused, analytical (minimal change)
Style: data processing, calculation mode
Duration: 3 seconds loop
```

3. **Complete Animation:**
```
Professor Cube character completion/success animation.

Movement:
- Quick spin/rotation (completed calculation)
- Bright flash of light
- Edges glow intensely
- "✓" checkmark appears and rotates around cube
- Geometric explosion of small particles (orderly, not chaotic)
- Cube settles back to idle position
- Face shows satisfied expression (simple smile line)

Facial expression: satisfied (subtly, minimalist)
Style: precise, professional completion
Duration: 2 seconds
```

---

## 파일 명명 규칙

각 캐릭터의 각 상태에 대해:

```
{character-id}_{state}.{format}

예시:
- cody_bot_idle.gif
- cody_bot_analyzing.gif
- cody_bot_complete.gif

- prof_owl_idle.gif
- prof_owl_analyzing.gif
- prof_owl_complete.gif

- debuggy_idle.gif
- debuggy_analyzing.gif
- debuggy_complete.gif

- speedy_idle.gif
- speedy_analyzing.gif
- speedy_complete.gif

- coco_idle.gif
- coco_analyzing.gif
- coco_complete.gif

- prof_cube_idle.gif
- prof_cube_analyzing.gif
- prof_cube_complete.gif
```

**총 18개 애니메이션 파일** (6 캐릭터 × 3 상태)

---

## 추가 옵션: 정적 이미지

애니메이션 외에 각 캐릭터의 정적 대표 이미지도 필요합니다:

**사양:**
- 포맷: PNG (투명 배경)
- 해상도: 512x512px
- 용도: 캐릭터 선택 화면, 썸네일 등

**명명:**
```
{character-id}_portrait.png

예시:
- cody_bot_portrait.png
- prof_owl_portrait.png
- debuggy_portrait.png
- speedy_portrait.png
- coco_portrait.png
- prof_cube_portrait.png
```

---

## 기술 가이드라인

### GIF 최적화
- 색상: 최대 256색 (GIF 제한)
- 디더링: 최소화
- 프레임 간격: 33ms (30fps)
- 파일 크기: 각 1MB 이하 목표

### Lottie JSON (권장)
- Bodymovin 플러그인으로 After Effects에서 내보내기
- 웹 최적화된 벡터 애니메이션
- 무한 스케일 가능
- 파일 크기 매우 작음

### WebP 애니메이션
- GIF보다 압축률 우수
- 알파 채널 지원
- 현대 브라우저 대부분 지원

---

## 품질 체크리스트

각 애니메이션이 다음을 만족하는지 확인:

- [ ] 배경이 투명함
- [ ] 루프가 자연스러움 (끊김 없음)
- [ ] 캐릭터 성격이 잘 표현됨
- [ ] 움직임이 부드러움 (최소 30fps)
- [ ] 파일 크기가 적절함 (로딩 속도 고려)
- [ ] 색상이 지정된 테마 컬러와 일치함
- [ ] 해상도가 선명함 (512x512px)
- [ ] 각 상태(idle, analyzing, complete)가 명확히 구분됨

---

## 사용 예시

생성된 애니메이션은 다음과 같이 웹에서 사용됩니다:

```html
<!-- GIF 사용 -->
<img src="cody_bot_analyzing.gif" alt="코디봇이 분석 중입니다" />

<!-- Lottie 사용 (권장) -->
<lottie-player 
  src="cody_bot_analyzing.json"
  background="transparent"
  speed="1"
  loop
  autoplay
></lottie-player>
```

---

## 참고 스타일 레퍼런스

**유사한 스타일:**
- Duolingo의 Duo (귀여운 교육용 마스코트)
- GitHub Octocat (친근한 기술 캐릭터)
- Slack 이모지 스타일 (명확하고 표현력 있는)
- Notion 아이콘 스타일 (미니멀하면서 친근한)

**피해야 할 스타일:**
- 너무 사실적이거나 무서운 표현
- 과도하게 복잡한 디테일
- 어둡거나 우울한 색상
- 공격적이거나 불친절한 표정

---

## 추가 요청사항

1. **일관성**: 6개 캐릭터가 같은 스타일 계열이면서도 각자의 개성이 명확해야 함
2. **확장성**: 향후 새로운 캐릭터 추가 시 같은 스타일 적용 가능해야 함
3. **접근성**: 모든 연령대가 친근하게 느낄 수 있어야 함
4. **브랜드 정체성**: 교육적이면서도 재미있는 분위기

---

## 생성 도구별 프롬프트 사용법

### Midjourney
위의 각 캐릭터 디자인 프롬프트를 그대로 사용하되, 끝에 다음 파라미터 추가:
```
--v 6 --ar 1:1 --style raw --s 50
```

### DALL-E 3
위의 프롬프트를 그대로 사용하되, "transparent background"를 강조

### Runway Gen-2 (애니메이션)
정적 이미지를 먼저 생성한 후, 각 상태의 애니메이션 프롬프트를 사용하여 움직임 생성

### After Effects + Bodymovin (Lottie)
수동 애니메이션 제작 후 Lottie JSON으로 내보내기 (최고 품질, 권장)

---

**목표**: 사용자가 코드를 제출하고 기다리는 동안, 선택한 캐릭터가 살아있는 듯한 애니메이션으로 즐거운 경험을 제공하는 것! 🎉

각 캐릭터의 개성이 명확히 드러나고, 사용자가 애착을 느낄 수 있도록 제작해주세요.


