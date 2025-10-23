import axios, { AxiosRequestConfig } from 'axios';
import { 
  mockSubmissions, 
  mockStatistics, 
  mockUser, 
  createMockSubmissionStatus,
  createMockSubmission 
} from './mockData';

// Mock 모드 설정 확인
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

console.log('🔧 API 모드:', USE_MOCK ? 'Mock 데이터 사용' : '실제 백엔드 연결');

// Mock API 응답 시뮬레이션
const mockApi = {
  get: async (url: string, config?: AxiosRequestConfig) => {
    await new Promise(resolve => setTimeout(resolve, 300)); // 네트워크 지연 시뮬레이션

    console.log('📡 Mock GET:', url);

    // URL에서 쿼리 파라미터 제거
    const cleanUrl = url.split('?')[0];
    const urlParams = new URLSearchParams(url.split('?')[1] || '');

    if (cleanUrl === '/api/characters') {
      // CharacterContext에서 기본 데이터 사용
      return { data: [] };
    }

    if (cleanUrl === '/api/auth/me') {
      return { data: mockUser };
    }

    // /api/submissions (쿼리 파라미터 포함 처리)
    if (cleanUrl === '/api/submissions') {
      return { data: {
        content: mockSubmissions,
        totalElements: mockSubmissions.length,
        totalPages: 1,
        currentPage: 0
      }};
    }

    if (cleanUrl.startsWith('/api/submissions/') && url.endsWith('/status')) {
      const submissionId = cleanUrl.split('/')[3];
      const getStatus = createMockSubmissionStatus(submissionId);
      return { data: getStatus() };
    }

    if (cleanUrl.startsWith('/api/submissions/')) {
      const submissionId = cleanUrl.split('/')[3];
      const submission = mockSubmissions.find(s => s.id === submissionId);
      if (submission) {
        return { data: submission };
      }
      return { data: mockSubmissions[0] }; // fallback
    }

    if (cleanUrl === '/api/statistics/summary') {
      return { data: mockStatistics };
    }

    if (cleanUrl === '/api/statistics/monthly') {
      return { data: {
        year: 2025,
        month: 10,
        totalSubmissions: mockStatistics.totalSubmissions,
        dailySubmissions: mockStatistics.weeklyProgress.map((item, index) => ({
          day: index + 9,
          count: item.count
        })),
        problemTypeDistribution: mockStatistics.problemTypeDistribution
      }};
    }

    if (cleanUrl === '/api/statistics/weak-areas') {
      return { data: {
        weakAreas: [
          {
            problemType: 'DP',
            totalAttempts: 1,
            averageFeedbackScore: 85,
            commonIssues: ['메모이제이션 활용', '점화식 도출'],
            recommendedProblems: [
              { site: '백준', number: '2579' },
              { site: '백준', number: '1463' }
            ]
          },
          {
            problemType: '그리디',
            totalAttempts: 1,
            averageFeedbackScore: 88,
            commonIssues: ['정렬 기준 설정', '최적 선택 전략'],
            recommendedProblems: [
              { site: '백준', number: '1931' },
              { site: '백준', number: '11047' }
            ]
          }
        ]
      }};
    }

    throw new Error(`Mock API: 지원하지 않는 엔드포인트 - ${url}`);
  },

  post: async (url: string, data?: any, config?: AxiosRequestConfig) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    console.log('📡 Mock POST:', url, data);

    const cleanUrl = url.split('?')[0];

    if (cleanUrl === '/api/auth/google') {
      localStorage.setItem('accessToken', 'mock-token-12345');
      return { data: {
        accessToken: 'mock-token-12345',
        user: mockUser
      }};
    }

    if (cleanUrl === '/api/submissions') {
      const result = createMockSubmission(data);
      // 완료된 Mock 제출 생성
      const newSubmission = {
        ...mockSubmissions[0],
        id: result.submissionId,
        ...data,
        submittedAt: new Date().toISOString(),
        status: 'PROCESSING' as const
      };
      
      return { data: {
        submissionId: result.submissionId,
        status: 'PROCESSING',
        character: mockUser.selectedCharacter,
        estimatedTime: 25
      }};
    }

    throw new Error(`Mock API: 지원하지 않는 엔드포인트 - ${url}`);
  },

  put: async (url: string, data?: any, config?: AxiosRequestConfig) => {
    await new Promise(resolve => setTimeout(resolve, 200));

    console.log('📡 Mock PUT:', url, data);

    const cleanUrl = url.split('?')[0];

    if (cleanUrl.startsWith('/api/characters/select/')) {
      const characterId = cleanUrl.split('/').pop();
      mockUser.selectedCharacter = characterId || 'cody';
      return { data: {
        message: '캐릭터가 변경되었습니다',
        selectedCharacter: { id: characterId }
      }};
    }

    throw new Error(`Mock API: 지원하지 않는 엔드포인트 - ${url}`);
  },

  delete: async (url: string, config?: AxiosRequestConfig) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log('📡 Mock DELETE:', url);
    
    const cleanUrl = url.split('?')[0];
    return { data: { success: true } };
  }
};

// 실제 Axios 인스턴스
const realApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
});

// Request 인터셉터
realApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log('🔐 API 요청 토큰 확인:', { 
      url: config.url, 
      hasToken: !!token, 
      token: token ? token.substring(0, 20) + '...' : 'none' 
    });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Authorization 헤더 추가됨');
    } else {
      console.log('❌ 토큰이 없어서 Authorization 헤더 추가 안됨');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response 인터셉터
realApi.interceptors.response.use(
  (response) => {
    // 백엔드 응답 구조 확인용 로그
    console.log('📡 API Response:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      console.log('🔐 401 에러 - 토큰 제거 및 로그인 페이지로 리다이렉트');
      console.log('🔍 현재 토큰:', localStorage.getItem('accessToken')?.substring(0, 20) + '...');
      localStorage.removeItem('accessToken');
      
      // 현재 경로가 로그인 페이지가 아닐 때만 리다이렉트
      if (window.location.pathname !== '/login') {
        console.log('🔄 로그인 페이지로 리다이렉트');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Mock 모드에 따라 적절한 API 사용
const api = USE_MOCK ? mockApi : realApi;

export default api;
