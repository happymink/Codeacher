import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (credential: string) => Promise<void>;
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
  const [user, setUser] = useState<User | null>(USE_MOCK ? MOCK_USER : null);
  const [loading, setLoading] = useState(!USE_MOCK);
  const hasInitialized = useRef(false); // useRef로 초기화 상태 추적

  useEffect(() => {
    // 이미 초기화되었으면 건너뛰기 (완전히 한 번만 실행)
    if (hasInitialized.current) {
      console.log('⏭️ 이미 초기화됨 - 건너뜀');
      return;
    }
    
    hasInitialized.current = true; // 즉시 플래그 설정
    console.log('🚀 AuthContext 초기화 시작');

    // Mock 모드일 때는 로그인 체크 건너뛰기
    if (USE_MOCK) {
      setUser(MOCK_USER);
      return;
    }

    // 실제 백엔드 모드 - 한 번만 실행
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log('🔐 저장된 토큰으로 사용자 정보 확인 중...');
      api.get('/api/auth/me')
        .then((response) => {
          console.log('✅ 사용자 정보 조회 성공:', response.data);
          const userData = response.data.data || response.data;
          setUser(userData);
        })
        .catch((error) => {
          console.warn('⚠️ 토큰 검증 실패 (만료 또는 유효하지 않음):', error.response?.status);
          // 토큰이 유효하지 않으면 삭제
          localStorage.removeItem('accessToken');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log('ℹ️ 저장된 토큰이 없음');
      setLoading(false);
    }
  }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행

  const login = async (credential: string) => {
    if (USE_MOCK) {
      // Mock 모드: 바로 로그인
      console.log('🔧 Mock 로그인');
      setUser(MOCK_USER);
      return;
    }

    // 실제 백엔드 모드
    console.log('🔐 로그인 처리 중... credential 타입:', typeof credential);
    
    // credential이 이미 accessToken인지 확인 (테스트 로그인에서 사용)
    if (typeof credential === 'string' && credential.startsWith('eyJ') && credential.split('.').length === 3) {
      // JWT accessToken인 경우 (테스트 로그인)
      console.log('🔐 JWT 토큰으로 로그인 (테스트)');
      const response = await api.get('/api/auth/me');
      setUser(response.data.data);
    } else if (typeof credential === 'string') {
      // Google JWT credential인 경우
      console.log('🔐 Google credential로 로그인');
      const response = await api.post('/api/auth/google', { credential });
      console.log('🔐 백엔드 응답:', response.data);
      const { accessToken, user: userData } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      setUser(userData);
    } else {
      throw new Error('잘못된 credential 형식입니다.');
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

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
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
