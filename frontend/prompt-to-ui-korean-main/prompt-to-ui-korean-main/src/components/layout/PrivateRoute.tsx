import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, user } = useAuth();

  // 디버깅 로그 제거 (선택사항)
  // console.log('🔍 PrivateRoute 디버깅:', { isAuthenticated, loading, user, currentPath: window.location.pathname });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 무한 리다이렉트 방지: 현재 경로가 /login이면 리다이렉트하지 않음
  if (!isAuthenticated && window.location.pathname !== '/login') {
    console.log('❌ 인증되지 않음 - 로그인으로 리다이렉트');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ 인증됨 - 페이지 렌더링');
  return isAuthenticated ? <>{children}</> : null;
};
