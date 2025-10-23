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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 text-center space-y-6"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
              <Code2 className="relative h-20 w-20 text-green-500" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">이미 로그인되어 있습니다</h2>
            <p className="text-muted-foreground">
              캐릭터 선택 페이지로 이동합니다...
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                logout();
                setRedirecting(false);
              }}
            >
              로그아웃
            </Button>
            <Button
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 p-8"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <Code2 className="relative h-20 w-20 text-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Codeacher
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              AI 코딩테스트 피드백 선생님
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-4"
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
              <span className="bg-background px-2 text-muted-foreground">
                또는
              </span>
            </div>
          </div>

          {/* 테스트 로그인 버튼 */}
          <Button
            onClick={handleTestLogin}
            disabled={loading}
            variant="outline"
            className="w-full h-12 text-base gap-3"
            size="lg"
          >
            <Code2 className="h-5 w-5" />
            {loading ? '로그인 중...' : '테스트 로그인 (개발용)'}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            개발 및 테스트용 로그인
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground"
        >
          로그인하고 AI 선생님과 함께<br />코딩 실력을 향상시켜보세요!
        </motion.p>
      </motion.div>
    </div>
  );

  return <LoginContent />;
}
