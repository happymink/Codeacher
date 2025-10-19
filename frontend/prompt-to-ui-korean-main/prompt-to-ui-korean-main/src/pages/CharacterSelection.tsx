import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCharacter } from '@/contexts/CharacterContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function CharacterSelection() {
  const { allCharacters, selectCharacter } = useCharacter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewCharacter, setPreviewCharacter] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelect = async (characterId: string) => {
    try {
      await selectCharacter(characterId);
      toast({
        title: '선택 완료! 🎉',
        description: '선생님이 준비되었어요!',
      });
      navigate('/submit');
    } catch (error) {
      toast({
        title: '오류 발생',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    }
  };

  // allCharacters가 배열인지 확인
  const characters = Array.isArray(allCharacters) ? allCharacters : [];
  const previewChar = characters.find(c => c.id === previewCharacter);

  // 버튼 색상 조정 (일부 캐릭터는 더 진하게)
  const getButtonColor = (characterId: string, originalColor: string) => {
    if (characterId === 'coco') {
      return 'hsl(350, 100%, 75%)'; // 코코는 더 진한 핑크색
    }
    return originalColor;
  };

  // 캐릭터별 별명과 특성
  const characterDetails: Record<string, { nickname: string; traits: string[] }> = {
    cody: {
      nickname: '알고리즘 마스터',
      traits: ['효율적이고 체계적인 분석', '최적화 중심 피드백', '패턴 인식 전문']
    },
    owl: {
      nickname: '개념의 달인',
      traits: ['친절하고 자세한 설명', '깊이 있는 이해 제공', '단계적 학습 가이드']
    },
    debuggy: {
      nickname: '버그 헌터',
      traits: ['세심한 코드 검토', '엣지 케이스 발견 능력', '완벽주의 스타일']
    },
    speedy: {
      nickname: '성능 튜너',
      traits: ['빠른 분석과 피드백', '성능 개선 전문', '효율성 극대화']
    },
    coco: {
      nickname: '초보자의 친구',
      traits: ['쉽고 친근한 설명', '따뜻한 격려와 응원', '부담 없는 톤']
    },
    cube: {
      nickname: '코드 아키텍트',
      traits: ['전문적이고 심층적 분석', '아키텍처 중심 리뷰', '고급 개발 인사이트']
    }
  };

  // 로딩 중일 때
  if (characters.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">나만의 코딩 선생님을 선택하세요! 🎓</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="relative p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-heavy"
                style={{
                  borderColor: character.colorTheme,
                  borderWidth: selectedId === character.id ? '3px' : '1px'
                }}
                onClick={() => setPreviewCharacter(character.id)}
              >
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    {character.image ? (
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="w-32 h-32 object-contain rounded-full"
                      />
                    ) : (
                      <span className="text-7xl">{character.emoji}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{character.name}</h3>
                    <p className="text-xs font-semibold" style={{ color: character.colorTheme }}>
                      {characterDetails[character.id]?.nickname || character.description}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{character.specialty}</p>
                  </div>
                  <div className="pt-2">
                    <Button
                      className="w-full"
                      style={{ backgroundColor: getButtonColor(character.id, character.colorTheme) }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(character.id);
                      }}
                    >
                      선택
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground"
        >
          💡 선택한 선생님이 피드백을 해줘요! 나중에 언제든 변경할 수 있어요
        </motion.div>
      </motion.div>

      <Dialog open={!!previewCharacter} onOpenChange={() => setPreviewCharacter(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {previewChar?.image ? (
                <img 
                  src={previewChar.image} 
                  alt={previewChar.name}
                  className="w-16 h-16 object-contain rounded-full"
                />
              ) : (
                <span className="text-4xl">{previewChar?.emoji}</span>
              )}
              <div>
                <div>{previewChar?.name}</div>
                <div className="text-sm font-semibold" style={{ color: previewChar?.colorTheme }}>
                  {previewChar && characterDetails[previewChar.id]?.nickname}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">🎯 전문 분야</h4>
              <p className="text-sm text-muted-foreground">{previewChar?.specialty}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">✨ 주요 특성</h4>
              <div className="space-y-2">
                {previewChar && characterDetails[previewChar.id]?.traits.map((trait, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <p className="text-sm text-muted-foreground">{trait}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button
              className="w-full"
              style={{ backgroundColor: previewChar ? getButtonColor(previewChar.id, previewChar.colorTheme) : undefined }}
              onClick={() => {
                if (previewChar) {
                  handleSelect(previewChar.id);
                }
              }}
            >
              이 선생님 선택하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
