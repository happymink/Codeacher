import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCharacter } from '@/contexts/CharacterContext';
import api from '@/lib/api';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Terminal, Trees, Bug, Rocket, Cat, Calculator } from 'lucide-react';


// 캐릭터별 테마 설정
const characterThemes = {
  cody: {
    icon: Terminal,
    gradient: 'from-[hsl(var(--cody-bg))] to-[hsl(140,20%,15%)]',
    accent: 'hsl(var(--character-cody))',
    textareaClass: 'bg-[hsl(var(--cody-bg))] text-[hsl(var(--cody-text))] border-[hsl(var(--cody-border))] font-mono placeholder:text-[hsl(var(--cody-text))]/50',
    cardBg: 'bg-gradient-to-br from-slate-900 to-slate-800',
    cardTextClass: 'text-white',  // 어두운 배경용 밝은 텍스트
    decorations: '$ ▊',
  },
  owl: {
    icon: Trees,
    gradient: 'from-[hsl(var(--owl-bg))] to-[hsl(120,50%,20%)]',
    accent: 'hsl(var(--character-owl))',
    textareaClass: 'bg-[hsl(var(--owl-bg))] text-[hsl(var(--owl-text))] border-[hsl(var(--owl-border))] font-mono placeholder:text-[hsl(var(--owl-text))]/50',
    cardBg: 'bg-gradient-to-br from-green-900 to-green-950',
    cardTextClass: 'text-green-100',  // 어두운 배경용 밝은 텍스트
    decorations: '🌿',
  },
  debuggy: {
    icon: Bug,
    gradient: 'from-[hsl(var(--debuggy-bg))] to-[hsl(350,100%,95%)]',
    accent: 'hsl(var(--character-debuggy))',
    textareaClass: 'bg-[hsl(var(--debuggy-bg))] text-[hsl(var(--debuggy-text))] border-[hsl(var(--debuggy-border))] font-mono placeholder:text-[hsl(var(--debuggy-text))]/50',
    cardBg: 'bg-gradient-to-br from-pink-100 to-red-50',
    cardTextClass: 'text-gray-900',  // 밝은 배경용 어두운 텍스트
    decorations: '🐛',
  },
  speedy: {
    icon: Rocket,
    gradient: 'from-[hsl(var(--speedy-bg))] to-[hsl(230,60%,15%)]',
    accent: 'hsl(var(--character-speedy))',
    textareaClass: 'bg-[hsl(var(--speedy-bg))] text-[hsl(var(--speedy-text))] border-[hsl(var(--speedy-border))] font-mono placeholder:text-[hsl(var(--speedy-text))]/50',
    cardBg: 'bg-gradient-to-br from-blue-950 to-indigo-950',
    cardTextClass: 'text-orange-100',  // 어두운 배경용 밝은 텍스트
    decorations: '🚀',
  },
  coco: {
    icon: Cat,
    gradient: 'from-[hsl(var(--coco-bg))] to-[hsl(340,100%,96%)]',
    accent: 'hsl(350, 100%, 75%)',
    textareaClass: 'bg-[hsl(var(--coco-bg))] text-[hsl(var(--coco-text))] border-[hsl(var(--coco-border))] font-mono placeholder:text-[hsl(var(--coco-text))]/50',
    cardBg: 'bg-gradient-to-br from-pink-50 to-pink-100',
    cardTextClass: 'text-gray-900',  // 밝은 배경용 어두운 텍스트
    decorations: '🐱',
  },
  cube: {
    icon: Calculator,
    gradient: 'from-[hsl(var(--cube-bg))] to-[hsl(160,50%,25%)]',
    accent: 'hsl(var(--character-cube))',
    textareaClass: 'bg-[hsl(var(--cube-bg))] text-[hsl(var(--cube-text))] border-[hsl(var(--cube-border))] font-mono placeholder:text-[hsl(var(--cube-text))]/50',
    cardBg: 'bg-gradient-to-br from-green-800 to-teal-900',
    cardTextClass: 'text-yellow-100',  // 어두운 배경용 밝은 텍스트
    decorations: '∫',
  },
};

export default function Submit() {
  const { currentCharacter } = useCharacter();
  const [formData, setFormData] = useState({
    problemUrl: '',
    userCode: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.problemUrl || !formData.userCode) {
      toast({
        title: '필수 항목을 입력해주세요',
        description: '문제 URL과 코드는 필수입니다.',
        variant: 'destructive',
      });
      return;
    }

    if (!currentCharacter) {
      toast({
        title: '캐릭터를 선택해주세요',
        description: '캐릭터 선택 페이지로 이동합니다.',
        variant: 'destructive',
      });
      navigate('/character-selection');
      return;
    }

    setLoading(true);
    try {
      // characterId 포함하여 제출
      const submissionData = {
        ...formData,
        characterId: currentCharacter.id,
      };
      
      console.log('📤 제출 데이터:', submissionData);
      const response = await api.post('/api/submissions', submissionData);
      console.log('📤 제출 응답:', response.data);
      
      // 백엔드 응답 구조: { success: true, data: { id: 1, ... } }
      const submissionId = response.data.data?.id || response.data.id;
      
      if (!submissionId) {
        throw new Error('Submission ID를 받지 못했습니다');
      }
      
      toast({
        title: '제출이 완료되었어요! 🎉',
        description: '피드백을 생성하고 있어요.',
      });
      navigate(`/loading/${submissionId}`);
    } catch (error) {
      console.error('❌ 제출 실패:', error);
      toast({
        title: '제출 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // 테마 적용
  const theme = currentCharacter 
    ? characterThemes[currentCharacter.id as keyof typeof characterThemes] 
    : characterThemes.cody;
  const ThemeIcon = theme.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {currentCharacter && (
            <motion.div 
              className={`flex items-center gap-3 mb-6 p-4 rounded-lg border-2 shadow-light ${theme.cardBg} ${theme.cardTextClass}`}
              style={{ borderColor: theme.accent }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              {currentCharacter.image ? (
                <img 
                  src={currentCharacter.image} 
                  alt={currentCharacter.name}
                  className="w-16 h-16 object-contain rounded-full"
                />
              ) : (
                <span className="text-4xl">{currentCharacter.emoji}</span>
              )}
              <div className="flex-1">
                <p className="text-sm opacity-80 font-medium">현재 선생님</p>
                <p className="font-bold text-lg">{currentCharacter.name}</p>
              </div>
              <ThemeIcon className="w-8 h-8 opacity-60" />
            </motion.div>
          )}

          <Card 
            className="p-6 shadow-medium overflow-hidden relative border-2" 
            style={{ borderColor: theme.accent }}
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient}`} />
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
              답안 제출하기
              <span className="text-lg">{theme.decorations}</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="problemUrl" className="flex items-center gap-2">
                  문제 URL * 
                  <span className="text-sm text-muted-foreground">(백준, 프로그래머스, 리트코드 등)</span>
                </Label>
                <Input
                  id="problemUrl"
                  value={formData.problemUrl}
                  onChange={(e) => setFormData({ ...formData, problemUrl: e.target.value })}
                  placeholder="예: https://www.acmicpc.net/problem/1260 또는 https://programmers.co.kr/learn/courses/30/lessons/43165"
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="userCode" className="flex items-center gap-2">
                  코드 * 
                  <ThemeIcon className="w-4 h-4" style={{ color: theme.accent }} />
                </Label>
                <div className="relative">
                  <Textarea
                    id="userCode"
                    value={formData.userCode}
                    onChange={(e) => setFormData({ ...formData, userCode: e.target.value })}
                    placeholder={
                      currentCharacter?.id === 'cody' ? '$ cat your_code.cpp | less' :
                      currentCharacter?.id === 'owl' ? '🌿 자연스럽게 코드를 작성해보세요...' :
                      currentCharacter?.id === 'debuggy' ? '🐛 꼼꼼하게 코드를 붙여넣어주세요...' :
                      currentCharacter?.id === 'speedy' ? '🚀 빠르게 코드를 입력하세요!' :
                      currentCharacter?.id === 'coco' ? '🐱 편하게 코드를 붙여넣으세요~' :
                      currentCharacter?.id === 'cube' ? '∫ 수학적으로 정확한 코드를...' :
                      '여기에 코드를 붙여넣으세요...'
                    }
                    className={`min-h-[400px] resize-y transition-all ${theme.textareaClass}`}
                  />
                  
                  {/* 코디봇 전용: 터미널 경로 표시 */}
                  {currentCharacter?.id === 'cody' && (
                    <div className="absolute bottom-3 left-3 text-[hsl(var(--cody-text))] text-sm font-mono opacity-50">
                      ~/code/submission
                    </div>
                  )}
                  
                  {/* 스피디 전용: 반짝이는 별 */}
                  {currentCharacter?.id === 'speedy' && (
                    <div className="absolute top-3 right-3 text-2xl animate-pulse">
                      ✨
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-lg gap-2 shadow-medium hover:shadow-heavy transition-all"
                size="lg"
                style={{ 
                  backgroundColor: theme.accent,
                  borderColor: theme.accent,
                }}
              >
                {loading ? '제출 중...' : (
                  <>
                    <Send className="h-5 w-5" />
                    제출하고 피드백 받기
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
