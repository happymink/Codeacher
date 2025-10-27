import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Code2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { login, loginWithToken, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      setRedirecting(true);
      // 2초 후 리다이렉트
      const timer = setTimeout(() => {
        navigate('/character-selection');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast({
        title: '로그인 실패',
        description: 'Google 인증 정보를 받아올 수 없습니다.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      console.log('🔐 구글 로그인 시작:', credentialResponse.credential.substring(0, 20) + '...');
      await login(credentialResponse.credential);
      
      console.log('✅ 구글 로그인 성공, 캐릭터 선택 페이지로 이동');
      toast({
        title: '로그인 성공! 🎉',
        description: '캐릭터 선택 페이지로 이동합니다.',
      });
      navigate('/character-selection');
    } catch (error) {
      console.error('❌ Google 로그인 에러:', error);
      toast({
        title: '로그인 실패',
        description: `Google 로그인 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setLoading(true);
    try {
      // 백엔드 테스트 인증 API 호출
      const response = await fetch('http://localhost:8080/api/test/auth/token?email=test@codeacher.com');
      const data = await response.json();
      
      if (data.success && data.data.accessToken) {
        // 토큰 저장
        localStorage.setItem('accessToken', data.data.accessToken);
        
        // Context의 loginWithToken 함수 호출 (토큰으로 사용자 정보 가져오기)
        await loginWithToken(data.data.accessToken);
        
        toast({
          title: '로그인 성공! 🎉',
          description: '캐릭터 선택 페이지로 이동합니다.',
        });
        navigate('/character-selection');
      } else {
        throw new Error('토큰 발급 실패');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      toast({
        title: '로그인 실패',
        description: '백엔드 서버가 실행 중인지 확인해주세요.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // 이미 로그인된 상태일 때
  if (redirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 text-center space-y-6"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
              <Code2 className="relative h-20 w-20 text-green-600" />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">이미 로그인되어 있습니다</h2>
            <p className="text-gray-500">
              캐릭터 선택 페이지로 이동합니다...
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              className="border-2 border-gray-300"
              onClick={() => {
                logout();
                setRedirecting(false);
              }}
            >
              로그아웃
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate('/character-selection')}
            >
              바로 이동
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const LoginContent = () => (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-8"
      >
        {/* 메인 타이틀 섹션 */}
        <div className="flex justify-between items-start mb-16">
          <div className="space-y-8 flex-1">
            {/* 대형 타이틀 - 이미지 스타일 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="text-7xl font-black leading-tight tracking-tight">
                <span className="text-blue-600">코딩</span>
                <br />
                <span className="text-blue-300">테스트</span>
                <br />
                <span className="text-blue-600">코치</span>
              </h1>
            </motion.div>
          </div>

          {/* 오른쪽 아이콘 */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="relative ml-8 flex flex-col items-center"
          >
            <div className="absolute inset-0 bg-blue-100 blur-3xl rounded-full opacity-50"></div>
            <Code2 className="relative h-32 w-32 text-blue-600" strokeWidth={1.5} />
            <div className="text-lg text-blue-600 mt-2 w-full">
              <p className="text-center">나만의 코딩 테스트 코치</p>
              <br />
              <br />
              <motion.p
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold text-center text-2xl text-blue-700"
              >
                코테코
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* 하단 배지 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-2 mb-12"
        >
          {/* 배지 1 */}
          <div className="flex-1 border-2 border-blue-400 rounded-full bg-blue-50 p-3 text-center">
            <p className="text-sm font-bold text-blue-700 mb-0.5">AI 피드백</p>
            <p className="text-xs text-blue-600">OPEN AI API, GPT-4</p>
          </div>

          {/* 배지 2 */}
          <div className="flex-1 border-2 border-blue-400 rounded-full bg-blue-50 p-3 text-center">
            <p className="text-sm font-bold text-blue-700 mb-0.5">실시간 분석</p>
            <p className="text-xs text-blue-600">상세한 코드 리뷰</p>
          </div>

          {/* 배지 3 */}
          <div className="flex-1 border-2 border-blue-400 rounded-full bg-blue-50 p-3 text-center">
            <p className="text-sm font-bold text-blue-700 mb-0.5">다른 사람의 답안 보기</p>
            <p className="text-xs text-blue-600">다양한 예시 답안 제공!</p>
          </div>
        </motion.div>

        {/* 로그인 버튼 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4 max-w-md mx-auto"
        >
          {/* Google 로그인 버튼 */}
          <div className="w-full">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                toast({
                  title: 'Google 로그인 실패',
                  description: 'Google 로그인 중 오류가 발생했습니다.',
                  variant: 'destructive',
                });
              }}
              useOneTap={false}
              theme="outline"
              size="large"
              width="100%"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          {/* 구분선 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">
                또는
              </span>
            </div>
          </div>

          {/* 테스트 로그인 버튼 */}
          <Button
            onClick={handleTestLogin}
            disabled={loading}
            variant="outline"
            className="w-full h-14 text-base gap-3 border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 hover:text-gray-900 transition-colors"
            size="lg"
          >
            <Code2 className="h-5 w-5" />
            {loading ? '로그인 중...' : '테스트 로그인'}
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-4">
            개발 및 테스트용 로그인
          </p>
        </motion.div>

        {/* 하단 텍스트 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-gray-400 mt-8"
        >
          코드 품질을 향상시키는 AI 코치
        </motion.p>
      </motion.div>
    </div>
  );

  return <LoginContent />;
}
