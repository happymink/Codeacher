import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Eye, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SubmissionSummary {
  id: number;
  problemSite: string;
  problemNumber: string;
  problemTitle?: string;
  problemType?: string;
  language: string;
  characterId: string;
  character: {
    id: string;
    name: string;
    emoji: string;
    image?: string;
  };
  status: string;
  submittedAt: string;
}

// 날짜 그룹 타입 정의
type DateGroup = 'today' | 'thisWeek' | 'older';

interface GroupedSubmissions {
  today: SubmissionSummary[];
  thisWeek: SubmissionSummary[];
  older: SubmissionSummary[];
}

// 날짜 그룹 판단 함수
const getDateGroup = (dateStr: string): DateGroup => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // 이번 주 시작일 (월요일 기준)
  const thisWeekStart = new Date(today);
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 일요일(0)이면 6일 전, 그 외는 해당 요일-1
  thisWeekStart.setDate(today.getDate() - diff);
  thisWeekStart.setHours(0, 0, 0, 0);
  
  const submissionDate = new Date(date);
  submissionDate.setHours(0, 0, 0, 0);
  
  if (submissionDate.getTime() === today.getTime()) {
    return 'today';
  } else if (submissionDate.getTime() >= thisWeekStart.getTime() && submissionDate.getTime() < today.getTime()) {
    return 'thisWeek';
  } else {
    return 'older';
  }
};

export default function History() {
  const [submissions, setSubmissions] = useState<SubmissionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSite, setFilterSite] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        console.log('📡 제출 내역 조회 요청');
        const response = await api.get('/api/submissions?page=0&size=100&sort=submittedAt,desc');
        console.log('📡 제출 내역 응답:', response.data);
        
        // 백엔드 응답 구조: { success: true, data: { content: [...], ... } }
        const submissionsData = response.data.data?.content || response.data.content || [];
        console.log('📋 제출 내역 데이터:', submissionsData);
        setSubmissions(submissionsData);
      } catch (error) {
        console.error('❌ Failed to fetch submissions:', error);
        setSubmissions([]); // 에러 시 빈 배열로 설정
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // 필터링된 제출 내역
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      const siteMatch = filterSite === 'all' || submission.problemSite === filterSite;
      const typeMatch = filterType === 'all' || submission.problemType === filterType;
      return siteMatch && typeMatch;
    });
  }, [submissions, filterSite, filterType]);

  // 날짜별 그룹화
  const groupedSubmissions = useMemo(() => {
    const grouped: GroupedSubmissions = {
      today: [],
      thisWeek: [],
      older: []
    };

    filteredSubmissions.forEach(submission => {
      const group = getDateGroup(submission.submittedAt);
      grouped[group].push(submission);
    });

    return grouped;
  }, [filteredSubmissions]);

  // 문제 사이트 목록 추출
  const problemSites = useMemo(() => {
    const sites = new Set(submissions.map(s => s.problemSite));
    return Array.from(sites);
  }, [submissions]);

  // 문제 유형 목록 추출
  const problemTypes = useMemo(() => {
    const types = new Set(submissions.map(s => s.problemType).filter(Boolean));
    return Array.from(types) as string[];
  }, [submissions]);

  // 제출 카드 렌더링 함수
  const renderSubmissionCard = (submission: SubmissionSummary, index: number) => (
    <motion.div
      key={submission.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-6 hover:scale-105 hover:shadow-heavy transition-all duration-300 cursor-pointer h-full">
        <Link to={`/feedback/${submission.id}`}>
          <div className="space-y-3">
            <div className="text-4xl">{submission.character?.emoji || '🤖'}</div>
            
            {submission.problemType && (
              <Badge variant="secondary">{submission.problemType}</Badge>
            )}
            
            <div>
              <p className="text-lg font-bold">
                {submission.problemSite} #{submission.problemNumber}
              </p>
              {submission.problemTitle && (
                <p className="text-sm text-muted-foreground truncate">
                  {submission.problemTitle}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {submission.language}
              </p>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {new Date(submission.submittedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Eye className="h-4 w-4" />
              자세히 보기
            </Button>
          </div>
        </Link>
      </Card>
    </motion.div>
  );

  // 그룹 렌더링 함수
  const renderGroup = (title: string, submissions: SubmissionSummary[], showDivider: boolean) => {
    if (submissions.length === 0) return null;

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {submissions.map((submission, index) => renderSubmissionCard(submission, index))}
        </div>
        {showDivider && (
          <div className="my-8 border-t-2 border-muted-foreground/20" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 헤더와 필터 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">나의 문제풀이 내역</h1>
            
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="h-5 w-5 text-muted-foreground" />
              
              {/* 문제 사이트 필터 */}
              <Select value={filterSite} onValueChange={setFilterSite}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="문제 사이트" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 사이트</SelectItem>
                  {problemSites.map(site => (
                    <SelectItem key={site} value={site}>{site}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* 문제 유형 필터 */}
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="문제 유형" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 유형</SelectItem>
                  {problemTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* 필터 초기화 버튼 */}
              {(filterSite !== 'all' || filterType !== 'all') && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setFilterSite('all');
                    setFilterType('all');
                  }}
                >
                  초기화
                </Button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-12 w-12 rounded-full mb-4" />
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-24" />
                </Card>
              ))}
            </div>
          ) : submissions.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-xl text-muted-foreground mb-4">아직 제출한 답안이 없어요</p>
              <Button asChild>
                <Link to="/submit">첫 답안 제출하기</Link>
              </Button>
            </Card>
          ) : filteredSubmissions.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-xl text-muted-foreground mb-4">필터 조건에 맞는 답안이 없어요</p>
              <Button 
                variant="outline"
                onClick={() => {
                  setFilterSite('all');
                  setFilterType('all');
                }}
              >
                필터 초기화
              </Button>
            </Card>
          ) : (
            <div>
              {renderGroup('오늘', groupedSubmissions.today, groupedSubmissions.thisWeek.length > 0 || groupedSubmissions.older.length > 0)}
              {renderGroup('이번 주', groupedSubmissions.thisWeek, groupedSubmissions.older.length > 0)}
              {renderGroup('오래 전', groupedSubmissions.older, false)}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
