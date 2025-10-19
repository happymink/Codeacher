-- 캐릭터 데이터 초기화
INSERT INTO characters (id, name, emoji, image, description, specialty, color_theme, personality, is_active) VALUES
('cody', '코디봇', '🤖', '/characters/cody_bot_portrait.jpg', '논리적 분석가', '알고리즘 패턴 분석', 'hsl(207, 71%, 59%)', 'logical', true),
('owl', '알고 선생님', '🦉', '/characters/prof_owl_portrait.jpg', '지혜로운 교수님', '개념 설명 전문', 'hsl(25, 40%, 40%)', 'wise', true),
('debuggy', '디버기', '🐛', '/characters/debuggy_portrait.jpg', '꼼꼼한 탐정', '버그 및 엣지케이스 탐지', 'hsl(0, 79%, 70%)', 'meticulous', true),
('speedy', '스피디', '🚀', '/characters/speedy_portrait.jpg', '최적화 전문가', '성능 개선 제안', 'hsl(28, 100%, 50%)', 'energetic', true),
('coco', '코코', '🐱', '/characters/coco_portrait.jpg', '친근한 친구', '초보자 친화적 설명', 'hsl(350, 100%, 88%)', 'friendly', true),
('cube', '프로페서 큐브', '🧊', '/characters/prof_cube_portrait.jpg', '전문가 스타일', '심층 분석', 'hsl(283, 39%, 53%)', 'professional', true)
ON CONFLICT (id) DO NOTHING;

-- 코디봇 대사
INSERT INTO character_dialogues (character_id, phase, dialogue, order_index) VALUES
('cody', 'LOADING', '코드 분석을 시작합니다...', 0),
('cody', 'LOADING', '알고리즘 패턴을 파악하는 중...', 1),
('cody', 'LOADING', '데이터 구조를 검토하고 있어요', 2),
('cody', 'ANALYZING', '흠... 이 로직은...', 0),
('cody', 'ANALYZING', '오! 여기가 핵심이네요!', 1),
('cody', 'ANALYZING', '최적화 포인트를 찾았어요', 2),
('cody', 'COMPLETE', '분석 완료! 피드백을 확인해보세요', 0),
('cody', 'COMPLETE', '모든 분석이 끝났습니다!', 1)
ON CONFLICT DO NOTHING;

-- 알고 선생님 대사
INSERT INTO character_dialogues (character_id, phase, dialogue, order_index) VALUES
('owl', 'LOADING', '차근차근 살펴보고 있습니다', 0),
('owl', 'LOADING', '코드의 의미를 파악하는 중...', 1),
('owl', 'LOADING', '논리 구조를 분석하고 있어요', 2),
('owl', 'ANALYZING', '흥미로운 접근이군요', 0),
('owl', 'ANALYZING', '이 부분을 주목해볼까요?', 1),
('owl', 'ANALYZING', '더 깊이 들어가보겠습니다', 2),
('owl', 'COMPLETE', '분석을 마쳤습니다', 0),
('owl', 'COMPLETE', '피드백 준비가 완료되었어요', 1)
ON CONFLICT DO NOTHING;

-- 디버기 대사
INSERT INTO character_dialogues (character_id, phase, dialogue, order_index) VALUES
('debuggy', 'LOADING', '코드를 샅샅이 뒤지는 중...', 0),
('debuggy', 'LOADING', '숨겨진 버그를 찾고 있어요', 1),
('debuggy', 'LOADING', '엣지 케이스를 체크하는 중', 2),
('debuggy', 'ANALYZING', '여기 뭔가 있는데...?', 0),
('debuggy', 'ANALYZING', '이 부분이 의심스러워요', 1),
('debuggy', 'ANALYZING', '발견했습니다!', 2),
('debuggy', 'COMPLETE', '조사 완료! 결과를 보고드릴게요', 0),
('debuggy', 'COMPLETE', '모든 검토가 끝났어요', 1)
ON CONFLICT DO NOTHING;

-- 스피디 대사
INSERT INTO character_dialogues (character_id, phase, dialogue, order_index) VALUES
('speedy', 'LOADING', '빠르게 분석 중!', 0),
('speedy', 'LOADING', '성능 포인트를 찾고 있어요', 1),
('speedy', 'LOADING', '최적화 기회를 탐색하는 중', 2),
('speedy', 'ANALYZING', '여기를 더 빠르게 만들 수 있어요!', 0),
('speedy', 'ANALYZING', '오! 성능 개선 포인트 발견!', 1),
('speedy', 'ANALYZING', '속도를 높일 방법이 보여요', 2),
('speedy', 'COMPLETE', '분석 끝! 더 빠르게 만들어드릴게요', 0),
('speedy', 'COMPLETE', '완료! 최적화 방안을 준비했어요', 1)
ON CONFLICT DO NOTHING;

-- 코코 대사
INSERT INTO character_dialogues (character_id, phase, dialogue, order_index) VALUES
('coco', 'LOADING', '천천히 살펴볼게요~', 0),
('coco', 'LOADING', '코드를 읽어보는 중이에요', 1),
('coco', 'LOADING', '하나씩 확인하고 있어요', 2),
('coco', 'ANALYZING', '아하! 이렇게 했구나', 0),
('coco', 'ANALYZING', '여기가 중요한 부분이에요', 1),
('coco', 'ANALYZING', '같이 개선해봐요!', 2),
('coco', 'COMPLETE', '다 봤어요! 피드백 확인해봐요', 0),
('coco', 'COMPLETE', '분석 끝! 잘 봤어요~', 1)
ON CONFLICT DO NOTHING;

-- 프로페서 큐브 대사
INSERT INTO character_dialogues (character_id, phase, dialogue, order_index) VALUES
('cube', 'LOADING', '전문적인 분석을 시작합니다', 0),
('cube', 'LOADING', '코드 품질을 평가하는 중', 1),
('cube', 'LOADING', '구조를 심층 분석하고 있습니다', 2),
('cube', 'ANALYZING', '이 접근법의 장단점은...', 0),
('cube', 'ANALYZING', '더 나은 방법을 고려해볼까요', 1),
('cube', 'ANALYZING', '전문가 관점에서 살펴보겠습니다', 2),
('cube', 'COMPLETE', '전문 분석 완료', 0),
('cube', 'COMPLETE', '상세한 피드백을 준비했습니다', 1)
ON CONFLICT DO NOTHING;


