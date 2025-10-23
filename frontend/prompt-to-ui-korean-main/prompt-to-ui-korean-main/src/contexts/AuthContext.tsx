import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (credential: string) => Promise<void>;
  loginWithToken: (accessToken: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock 모드 확인
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mock 사용자 데이터
const MOCK_USER: User = {
  id: 'mock-user-id',
  email: 'test@codeacher.com',
  name: '테스트 사용자',
  profileImage: '',
  selectedCharacter: 'cody'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // 항상 null로 시작
  const [loading, setLoading] = useState(false); // 초기 로딩을 false로 설정
  const hasInitialized = useRef(false); // useRef로 초기화 상태 추적
  const [isInitialized, setIsInitialized] = useState(false); // 초기화 완료 상태

  // 초기화 시 토큰 검증
  useEffect(() => {
    const initializeAuth = async () => {
      if (USE_MOCK) {
        console.log('🔧 Mock 모드 - 초기화 건너뜀');
        return;
      }

      // Mock 토큰 제거 (Mock 모드가 비활성화된 경우)
      const token = localStorage.getItem('accessToken');
      if (!USE_MOCK && token === 'mock-token') {
        console.log('🧹 Mock 모드 비활성화 - Mock 토큰 제거');
        localStorage.removeItem('accessToken');
        setUser(null);
        return;
      }

      console.log('🔍 초기화 시 토큰 확인:', { 
        hasToken: !!token, 
        token: token ? token.substring(0, 20) + '...' : 'none',
        isMockToken: token === 'mock-token'
      });
      
      if (token && token !== 'mock-token') {
        console.log('🔐 저장된 토큰으로 사용자 정보 확인 중...');
        try {
          const response = await api.get('/api/auth/me');
          console.log('✅ 사용자 정보 조회 성공:', response.data);
          const userData = response.data.data || response.data;
          setUser(userData);
          console.log('✅ 사용자 상태 설정 완료:', userData);
        } catch (error) {
          console.error('❌ 토큰 검증 실패:', error);
          console.log('🔍 에러 상세:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
          });
          localStorage.removeItem('accessToken');
          setUser(null);
        }
      } else {
        console.log('ℹ️ 유효한 토큰이 없어서 로그인하지 않음');
      }
    };

    initializeAuth();
  }, []);

  const login = async (credential: string) => {
    console.log('🔐 로그인 시작:', { credential: credential.substring(0, 20) + '...', USE_MOCK });
    
    // Mock 모드일 때만 Mock 사용자로 로그인
    if (USE_MOCK) {
      console.log('🔧 Mock 모드 - Mock 사용자로 로그인');
      setUser(MOCK_USER);
      localStorage.setItem('accessToken', 'mock-token');
      return;
    }

    // 실제 백엔드 모드 - API 호출
    try {
      console.log('🔐 백엔드 API 호출 시작');
      
      // Google JWT credential인 경우 (구글 로그인)
      if (typeof credential === 'string') {
        console.log('🔐 Google credential로 로그인');
        const response = await api.post('/api/auth/google', { credential });
        console.log('🔐 백엔드 응답:', response.data);
        
        // 백엔드 응답 구조 확인
        const responseData = response.data.data || response.data;
        const { accessToken, user: userData } = responseData;
        
        if (!accessToken || !userData) {
          throw new Error('백엔드에서 토큰 또는 사용자 정보를 받지 못했습니다.');
        }
        
        localStorage.setItem('accessToken', accessToken);
        console.log('💾 토큰 저장됨:', accessToken.substring(0, 20) + '...');
        setUser(userData);
        console.log('✅ 구글 로그인 완료:', { user: userData.name, token: accessToken.substring(0, 20) + '...' });
        
        // 토큰 저장 확인
        const savedToken = localStorage.getItem('accessToken');
        console.log('🔍 저장된 토큰 확인:', savedToken ? savedToken.substring(0, 20) + '...' : 'none');
      } else {
        throw new Error('잘못된 credential 형식입니다.');
      }
      
      console.log('✅ 로그인 완료:', { user: user?.name, isAuthenticated: true });
    } catch (error) {
      console.error('❌ 로그인 실패:', error);
      // 에러 시 Mock 사용자로 폴백하지 않고 에러 상태 유지
      setUser(null);
      localStorage.removeItem('accessToken');
    }
  };

  // 테스트 로그인용 별도 함수
  const loginWithToken = async (accessToken: string) => {
    console.log('🔐 테스트 로그인 시작:', { token: accessToken.substring(0, 20) + '...' });
    
    if (USE_MOCK) {
      console.log('🔧 Mock 모드 - Mock 사용자로 로그인');
      setUser(MOCK_USER);
      localStorage.setItem('accessToken', 'mock-token');
      return;
    }

    try {
      console.log('🔐 JWT 토큰으로 로그인 (테스트)');
      localStorage.setItem('accessToken', accessToken);
      const response = await api.get('/api/auth/me');
      setUser(response.data.data);
      console.log('✅ 테스트 로그인 완료');
    } catch (error) {
      console.error('❌ 테스트 로그인 실패:', error);
      setUser(null);
      localStorage.removeItem('accessToken');
    }
  };

  const logout = () => {
    if (USE_MOCK) {
      console.log('🔧 Mock 로그아웃 (실제로는 무시됨)');
      return;
    }

    // 실제 백엔드 모드
    localStorage.removeItem('accessToken');
    setUser(null);
    window.location.href = '/login';
  };

  // 디버깅 로그 제거 (선택사항)
  // console.log('🔍 AuthContext 상태:', { user, isAuthenticated: !!user, loading, USE_MOCK });

  return (
    <AuthContext.Provider value={{ user, login, loginWithToken, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
