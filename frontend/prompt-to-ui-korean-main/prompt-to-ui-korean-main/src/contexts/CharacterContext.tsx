import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { getCharacterImage } from '@/lib/characterImages';
import { CharacterProfile } from '@/types';

interface CharacterContextType {
  currentCharacter: CharacterProfile | null;
  allCharacters: CharacterProfile[];
  selectCharacter: (characterId: string) => Promise<void>;
  getRandomDialogue: (phase: 'loading' | 'analyzing' | 'complete') => string;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

const defaultCharacters: CharacterProfile[] = [
  {
    id: 'cody',
    name: '코디봇',
    emoji: '🤖',
    image: '/characters/cody_bot_portrait.jpg',
    description: '논리적 분석가',
    specialty: '알고리즘 패턴 분석',
    colorTheme: 'hsl(207, 71%, 59%)',
    personality: 'logical',
    dialogues: {
      loading: ['코드 분석을 시작합니다...', '알고리즘 패턴을 파악하는 중...', '데이터 구조를 검토하고 있어요'],
      analyzing: ['흠... 이 로직은...', '오! 여기가 핵심이네요!', '최적화 포인트를 찾았어요'],
      complete: ['분석 완료! 피드백을 확인해보세요', '모든 분석이 끝났습니다!']
    }
  },
  {
    id: 'owl',
    name: '알고 선생님',
    emoji: '🦉',
    image: '/characters/prof_owl_portrait.jpg',
    description: '지혜로운 교수님',
    specialty: '개념 설명 전문',
    colorTheme: 'hsl(25, 40%, 40%)',
    personality: 'wise',
    dialogues: {
      loading: ['차근차근 살펴보고 있습니다', '코드의 의미를 파악하는 중...', '논리 구조를 분석하고 있어요'],
      analyzing: ['흥미로운 접근이군요', '이 부분을 주목해볼까요?', '더 깊이 들어가보겠습니다'],
      complete: ['분석을 마쳤습니다', '피드백 준비가 완료되었어요']
    }
  },
  {
    id: 'debuggy',
    name: '디버기',
    emoji: '🐛',
    image: '/characters/debuggy_portrait.jpg',
    description: '꼼꼼한 탐정',
    specialty: '버그 및 엣지케이스 탐지',
    colorTheme: 'hsl(0, 79%, 70%)',
    personality: 'meticulous',
    dialogues: {
      loading: ['코드를 샅샅이 뒤지는 중...', '숨겨진 버그를 찾고 있어요', '엣지 케이스를 체크하는 중'],
      analyzing: ['여기 뭔가 있는데...?', '이 부분이 의심스러워요', '발견했습니다!'],
      complete: ['조사 완료! 결과를 보고드릴게요', '모든 검토가 끝났어요']
    }
  },
  {
    id: 'speedy',
    name: '스피디',
    emoji: '🚀',
    image: '/characters/speedy_portrait.jpg',
    description: '최적화 전문가',
    specialty: '성능 개선 제안',
    colorTheme: 'hsl(28, 100%, 50%)',
    personality: 'energetic',
    dialogues: {
      loading: ['빠르게 분석 중!', '성능 포인트를 찾고 있어요', '최적화 기회를 탐색하는 중'],
      analyzing: ['여기를 더 빠르게 만들 수 있어요!', '오! 성능 개선 포인트 발견!', '속도를 높일 방법이 보여요'],
      complete: ['분석 끝! 더 빠르게 만들어드릴게요', '완료! 최적화 방안을 준비했어요']
    }
  },
  {
    id: 'coco',
    name: '코코',
    emoji: '🐱',
    image: '/characters/coco_portrait.jpg',
    description: '친근한 친구',
    specialty: '초보자 친화적 설명',
    colorTheme: 'hsl(350, 100%, 88%)',
    personality: 'friendly',
    dialogues: {
      loading: ['천천히 살펴볼게요~', '코드를 읽어보는 중이에요', '하나씩 확인하고 있어요'],
      analyzing: ['아하! 이렇게 했구나', '여기가 중요한 부분이에요', '같이 개선해봐요!'],
      complete: ['다 봤어요! 피드백 확인해봐요', '분석 끝! 잘 봤어요~']
    }
  },
  {
    id: 'cube',
    name: '프로페서 큐브',
    emoji: '🧊',
    image: '/characters/prof_cube_portrait.jpg',
    description: '전문가 스타일',
    specialty: '심층 분석',
    colorTheme: 'hsl(283, 39%, 53%)',
    personality: 'professional',
    dialogues: {
      loading: ['전문적인 분석을 시작합니다', '코드 품질을 평가하는 중', '구조를 심층 분석하고 있습니다'],
      analyzing: ['이 접근법의 장단점은...', '더 나은 방법을 고려해볼까요', '전문가 관점에서 살펴보겠습니다'],
      complete: ['전문 분석 완료', '상세한 피드백을 준비했습니다']
    }
  }
];

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCharacter, setCurrentCharacter] = useState<CharacterProfile | null>(defaultCharacters[0]); // 기본 캐릭터 설정
  const [allCharacters, setAllCharacters] = useState<CharacterProfile[]>(defaultCharacters);

  // 캐릭터 목록 불러오기
  useEffect(() => {
    api.get('/api/characters')
      .then((response) => {
        // 백엔드 응답 구조: { success: true, data: [...] }
        const charactersData = response.data.data || response.data;
        
        // response.data가 배열인지 확인
        if (Array.isArray(charactersData) && charactersData.length > 0) {
          // 백엔드에서 받은 캐릭터에 프론트엔드 이미지 매핑
          const charactersWithImages = charactersData.map(char => ({
            ...char,
            image: getCharacterImage(char.id),
          }));
          setAllCharacters(charactersWithImages);
        } else {
          setAllCharacters(defaultCharacters);
        }
      })
      .catch((error) => {
        console.log('API 호출 실패, 기본 캐릭터 사용:', error.message);
        setAllCharacters(defaultCharacters);
      });
  }, []);

  // 사용자가 선택한 캐릭터 불러오기
  useEffect(() => {
    api.get('/api/auth/me')
      .then((response) => {
        const selectedCharacterId = response.data?.selectedCharacter;
        if (selectedCharacterId) {
          const selected = allCharacters.find((c) => c.id === selectedCharacterId);
          if (selected) {
            setCurrentCharacter(selected);
            console.log('✅ 선택된 캐릭터 로드:', selected.name);
          }
        }
      })
      .catch((error) => {
        console.log('선택된 캐릭터 로드 실패, 기본 캐릭터 사용:', error.message);
      });
  }, [allCharacters]);

  const selectCharacter = async (characterId: string) => {
    await api.put(`/api/characters/select/${characterId}`);
    const selected = allCharacters.find((c) => c.id === characterId);
    if (selected) {
      setCurrentCharacter(selected);
    }
  };

  const getRandomDialogue = (phase: 'loading' | 'analyzing' | 'complete') => {
    if (!currentCharacter) return '';
    const dialogues = currentCharacter.dialogues[phase];
    return dialogues[Math.floor(Math.random() * dialogues.length)];
  };

  return (
    <CharacterContext.Provider value={{ currentCharacter, allCharacters, selectCharacter, getRandomDialogue }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within CharacterProvider');
  }
  return context;
};
