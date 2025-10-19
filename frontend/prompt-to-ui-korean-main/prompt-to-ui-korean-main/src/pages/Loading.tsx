import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCharacter } from '@/contexts/CharacterContext';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function Loading() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const { currentCharacter, getRandomDialogue } = useCharacter();
  const [displayedText, setDisplayedText] = useState('');
  const [dialogues] = useState(() => {
    // 초기 렌더링 시 2개의 랜덤 대사 선택
    const first = getRandomDialogue('loading');
    let second = getRandomDialogue('loading');
    // 같은 대사가 선택되지 않도록
    while (second === first) {
      second = getRandomDialogue('loading');
    }
    return [first, second];
  });
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [status, setStatus] = useState<'PROCESSING' | 'COMPLETED' | 'FAILED'>('PROCESSING');
  const [typingComplete, setTypingComplete] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // 타이핑 효과 (2개의 대사를 순차적으로)
  useEffect(() => {
    if (!currentCharacter || !dialogues || dialogues.length === 0) return;

    const currentDialogue = dialogues[currentDialogueIndex];
    let currentIndex = 0;
    const charDuration = 80; // 각 글자당 80ms (더 자연스러운 타이핑 속도)

    // 한 글자씩 출력
    const typingInterval = setInterval(() => {
      if (currentIndex < currentDialogue.length) {
        setDisplayedText(currentDialogue.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        // 현재 대사 타이핑 완료
        clearInterval(typingInterval);
        
        if (currentDialogueIndex === 0) {
          // 첫 번째 대사 완료 - 잠시 대기 후 두 번째 대사 시작
          console.log('✅ 첫 번째 대사 타이핑 완료');
          setTimeout(() => {
            setDisplayedText(''); // 텍스트 초기화
            setCurrentDialogueIndex(1); // 두 번째 대사로 전환
          }, 800); // 0.8초 대기
        } else {
          // 두 번째 대사 완료 - 모든 타이핑 완료
          console.log('✅ 두 번째 대사 타이핑 완료 - 모든 타이핑 완료');
          setTypingComplete(true);
        }
      }
    }, charDuration);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentCharacter, dialogues, currentDialogueIndex]);

  // 상태 폴링 (별도 useEffect)
  useEffect(() => {
    if (!submissionId) return;

    // 상태 폴링
    const statusInterval = setInterval(async () => {
      try {
        const response = await api.get(`/api/submissions/${submissionId}/status`);
        const { status: newStatus } = response.data.data || response.data;
        
        if (newStatus === 'COMPLETED') {
          console.log('✅ 백엔드에서 완료 응답 받음');
          setStatus('COMPLETED');
          clearInterval(statusInterval);
        }
      } catch (error) {
        console.error('❌ Status check failed:', error);
      }
    }, 1000);

    return () => {
      clearInterval(statusInterval);
    };
  }, [submissionId]);

  // 타이핑 완료 && 상태 완료 시 피드백 페이지로 이동
  useEffect(() => {
    if (status === 'COMPLETED' && typingComplete) {
      console.log('🎉 타이핑 완료 + 백엔드 완료 - 피드백 페이지로 이동');
      // 짧은 딜레이 후 이동 (부드러운 전환)
      setTimeout(() => {
        navigate(`/feedback/${submissionId}`);
      }, 500);
    }
  }, [status, typingComplete, submissionId, navigate]);

  if (!currentCharacter) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const bgColor = currentCharacter.colorTheme.replace('hsl(', 'hsla(').replace(')', ', 0.05)');

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full space-y-8 text-center"
      >
        {/* 캐릭터 애니메이션 */}
        <div className="relative">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: !typingComplete ? [0, 3, -3, 0] : 0,
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="flex justify-center items-center"
          >
            {currentCharacter.image ? (
              <img 
                src={currentCharacter.image} 
                alt={currentCharacter.name}
                className="w-48 h-48 object-contain rounded-full"
              />
            ) : (
              <span className="text-9xl">{currentCharacter.emoji}</span>
            )}
          </motion.div>

          {/* 상태별 이펙트 */}
          <AnimatePresence mode="wait">
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -right-8 top-1/4 flex gap-2 text-4xl"
            >
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                💭
              </motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>
                📄
              </motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>
                💡
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 대사 말풍선 (타이핑 효과) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-heavy max-w-lg mx-auto min-h-[100px] flex items-center justify-center"
        >
          <p className="text-xl font-medium">
            💬 {displayedText}
            {!typingComplete && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-6 bg-current ml-1"
              />
            )}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
