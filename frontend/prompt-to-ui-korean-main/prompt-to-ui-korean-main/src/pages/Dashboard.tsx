import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import api from '@/lib/api';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Code2, FileText, TrendingUp, Award } from 'lucide-react';
import { useCharacter } from '@/contexts/CharacterContext';

interface Statistics {
  totalSubmissions: number;
  weeklySubmissions?: number;
  monthlySubmissions?: number;
  averageScore?: number;
  problemTypeDistribution: { name: string; value: number; color?: string }[];
  problemSiteDistribution?: { name: string; value: number; color?: string }[];
  weeklyProgress: { date: string; count: number }[];
  weakAreas: string[];
  dailySubmissions?: { date: string; count: number }[]; // 3개월간 일별 제출 데이터
}

interface DayCell {
  date: Date;
  count: number;
  dateStr: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentCharacter } = useCharacter();

  // 3개월간의 일별 데이터 생성 (GitHub 잔디 스타일)
  const heatmapData = useMemo(() => {
    if (!stats?.dailySubmissions) return { weeks: [], months: [] };

    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    
    // 제출 데이터를 Map으로 변환
    const submissionMap = new Map<string, number>();
    stats.dailySubmissions.forEach(({ date, count }) => {
      submissionMap.set(date, count);
    });

    // 시작일을 일요일로 맞춤
    const startDate = new Date(threeMonthsAgo);
    while (startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1);
    }

    // 주 단위로 데이터 생성
    const weeks: DayCell[][] = [];
    let currentWeek: DayCell[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayOfWeek = currentDate.getDay();
      
      currentWeek.push({
        date: new Date(currentDate),
        count: submissionMap.get(dateStr) || 0,
        dateStr,
      });
      
      // 토요일이면 주 완성
      if (dayOfWeek === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // 마지막 주가 완성되지 않았으면 추가
    if (currentWeek.length > 0) {
      // 빈 날짜로 채우기
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: new Date(currentDate),
          count: -1, // 빈 칸 표시
          dateStr: '',
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(currentWeek);
    }

    // 월 레이블 위치 계산
    const months: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    
    weeks.forEach((week, weekIndex) => {
      const firstDay = week.find(day => day.count !== -1);
      if (firstDay) {
        const month = firstDay.date.getMonth();
        if (month !== lastMonth) {
          months.push({
            label: `${month + 1}월`,
            weekIndex,
          });
          lastMonth = month;
        }
      }
    });

    return { weeks, months };
  }, [stats?.dailySubmissions]);

  // 캐릭터별 색상 강도 계산
  const getHeatmapColor = (count: number) => {
    if (!currentCharacter) return 'hsl(0, 0%, 93%)'; // 기본 회색
    
    const baseColor = currentCharacter.colorTheme;
    // hsl(207, 71%, 59%) 형태에서 숫자 추출
    const hslMatch = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    
    if (!hslMatch) return 'hsl(0, 0%, 93%)';
    
    const [, h, s, l] = hslMatch;
    
    if (count === 0) return 'hsl(0, 0%, 93%)'; // 회색
    if (count === 1) return `hsl(${h}, ${s}%, ${Math.max(parseInt(l) - 20, 75)}%)`; // 연한 색
    if (count >= 2 && count < 5) return `hsl(${h}, ${s}%, ${Math.max(parseInt(l) - 10, 60)}%)`; // 중간 색
    if (count >= 5) return `hsl(${h}, ${s}%, ${l}%)`; // 진한 색 (원래 색)
    
    return baseColor;
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('📊 통계 조회 요청');
        const response = await api.get('/api/statistics/summary');
        console.log('📊 통계 응답:', response.data);
        
        // 백엔드 응답 구조: { success: true, data: {...} }
        const statsData = (response.data as any).data || response.data;
        console.log('📊 통계 데이터:', statsData);
        
        // 기본 색상 팔레트
        const defaultColors = [
          'hsl(207, 71%, 59%)',
          'hsl(25, 40%, 40%)',
          'hsl(0, 79%, 70%)',
          'hsl(28, 100%, 50%)',
          'hsl(350, 100%, 88%)',
          'hsl(283, 39%, 53%)',
        ];
        
        // 사이트별 색상 팔레트
        const siteColors = [
          'hsl(25, 95%, 53%)',   // 백준 - 주황
          'hsl(140, 60%, 50%)',  // 프로그래머스 - 초록
          'hsl(220, 90%, 56%)',  // 리트코드 - 파랑
          'hsl(270, 50%, 50%)',  // 코드포스 - 보라
          'hsl(0, 70%, 60%)',    // 기타 - 빨강
        ];
        
        // 백엔드 응답 구조에 맞춰서 데이터 가공
        const processedStats: Statistics = {
          totalSubmissions: statsData.totalSubmissions || 0,
          weeklySubmissions: statsData.weeklyProgress?.reduce((sum: number, item: any) => sum + (item.count || 0), 0) || 0,
          monthlySubmissions: statsData.totalSubmissions || 0,
          averageScore: 85, // 백엔드에서 제공하지 않으므로 기본값
          problemTypeDistribution: (statsData.problemTypeDistribution || []).map((item: any, index: number) => ({
            ...item,
            color: item.color || defaultColors[index % defaultColors.length],
          })),
          problemSiteDistribution: (statsData.problemSiteDistribution || []).map((item: any, index: number) => ({
            ...item,
            color: item.color || siteColors[index % siteColors.length],
          })),
          weeklyProgress: statsData.weeklyProgress || [],
          weakAreas: statsData.weakAreas || [],
          dailySubmissions: statsData.dailySubmissions || [],
        };
        
        setStats(processedStats);
      } catch (error) {
        console.error('❌ Failed to fetch statistics:', error);
        
        // 3개월간의 mock 일별 제출 데이터 생성
        const mockDailySubmissions: { date: string; count: number }[] = [];
        const today = new Date();
        const threeMonthsAgo = new Date(today);
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        
        const currentDate = new Date(threeMonthsAgo);
        while (currentDate <= today) {
          const randomCount = Math.random() > 0.7 ? Math.floor(Math.random() * 8) : 0;
          mockDailySubmissions.push({
            date: currentDate.toISOString().split('T')[0],
            count: randomCount,
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        // Mock data for demo
        setStats({
          totalSubmissions: 50,
          weeklySubmissions: 7,
          monthlySubmissions: 25,
          averageScore: 85,
          problemTypeDistribution: [
            { name: 'DFS/BFS', value: 20, color: 'hsl(207, 71%, 59%)' },
            { name: 'DP', value: 30, color: 'hsl(25, 40%, 40%)' },
            { name: '구현', value: 25, color: 'hsl(0, 79%, 70%)' },
            { name: '그리디', value: 15, color: 'hsl(28, 100%, 50%)' },
            { name: '기타', value: 10, color: 'hsl(350, 100%, 88%)' },
          ],
          problemSiteDistribution: [
            { name: '백준', value: 30, color: 'hsl(25, 95%, 53%)' },
            { name: '프로그래머스', value: 15, color: 'hsl(140, 60%, 50%)' },
            { name: '리트코드', value: 3, color: 'hsl(220, 90%, 56%)' },
            { name: '기타', value: 2, color: 'hsl(0, 70%, 60%)' },
          ],
          weeklyProgress: [
            { date: '10/9', count: 3 },
            { date: '10/10', count: 5 },
            { date: '10/11', count: 2 },
            { date: '10/12', count: 7 },
            { date: '10/13', count: 4 },
            { date: '10/14', count: 6 },
            { date: '10/15', count: 8 },
          ],
          weakAreas: [],
          dailySubmissions: mockDailySubmissions,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-6xl mx-auto py-8 px-4">
          <Skeleton className="h-12 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-3xl font-bold">통계 대시보드</h1>

          {/* 상단 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 shadow-medium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">이번 주</p>
                  <p className="text-3xl font-bold">{stats.weeklySubmissions}</p>
                </div>
                <FileText className="h-10 w-10 text-primary" />
              </div>
            </Card>

            <Card className="p-6 shadow-medium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">이번 달</p>
                  <p className="text-3xl font-bold">{stats.monthlySubmissions}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-secondary" />
              </div>
            </Card>

            <Card className="p-6 shadow-medium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 제출</p>
                  <p className="text-3xl font-bold">{stats.totalSubmissions}</p>
                </div>
                <Code2 className="h-10 w-10 text-accent" />
              </div>
            </Card>

            <Card className="p-6 shadow-medium">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">평균 점수</p>
                  <p className="text-3xl font-bold">{stats.averageScore}</p>
                </div>
                <Award className="h-10 w-10 text-yellow-500" />
              </div>
            </Card>
          </div>

          {/* 첫 번째 row: 문제 유형별 분포 | 이용 사이트 분포 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 문제 유형별 분포 */}
            <Card className="p-6 shadow-medium">
              <h3 className="text-xl font-bold mb-4">문제 유형별 분포</h3>
              {stats.problemTypeDistribution && stats.problemTypeDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.problemTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name} (${entry.value})`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.problemTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  데이터가 없습니다
                </div>
              )}
            </Card>

            {/* 이용 사이트별 분포 */}
            <Card className="p-6 shadow-medium">
              <h3 className="text-xl font-bold mb-4">이용 사이트별 분포</h3>
              {stats.problemSiteDistribution && stats.problemSiteDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.problemSiteDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name} (${entry.value})`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.problemSiteDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  데이터가 없습니다
                </div>
              )}
            </Card>
          </div>

          {/* 두 번째 row: 일별 제출 추이 | 3개월 제출 기록 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 일별 제출 추이 */}
            <Card className="p-6 shadow-medium">
              <h3 className="text-xl font-bold mb-4">일별 제출 추이</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.weeklyProgress}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* 3개월 제출 기록 (GitHub 잔디 스타일) */}
            <Card className="p-6 shadow-medium">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">3개월 제출 기록</h3>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-2">
                      <div className="w-5 h-5 rounded border border-gray-300" style={{ backgroundColor: 'hsl(0, 0%, 93%)' }} />
                      <div className="w-5 h-5 rounded" style={{ backgroundColor: getHeatmapColor(1) }} />
                      <div className="w-5 h-5 rounded" style={{ backgroundColor: getHeatmapColor(3) }} />
                      <div className="w-5 h-5 rounded" style={{ backgroundColor: getHeatmapColor(5) }} />
                    </div>
                  </div>
                </div>
                
                <TooltipProvider>
                  <div className="flex justify-center items-center" style={{ height: '300px' }}>
                    {heatmapData.weeks.length === 0 ? (
                      <div className="text-center text-muted-foreground">
                        제출 기록이 없습니다
                      </div>
                    ) : (
                      <div className="inline-flex flex-row gap-2">
                        {/* 각 주를 세로로 배치 */}
                        {heatmapData.weeks.map((week, weekIdx) => (
                          <div key={weekIdx} className="flex flex-col gap-2">
                            {/* 월 레이블 */}
                            <div className="h-5 text-sm font-bold text-muted-foreground mb-1 flex items-center justify-center">
                              {heatmapData.months.find(m => m.weekIndex === weekIdx)?.label || ''}
                            </div>
                            
                            {/* 해당 주의 일~토 (세로로) */}
                            {week.map((day, dayIdx) => {
                              // 빈 칸 처리
                              if (day.count === -1) {
                                return (
                                  <div
                                    key={dayIdx}
                                    className="w-5 h-5"
                                  />
                                );
                              }
                              
                              return (
                                <Tooltip key={dayIdx}>
                                  <TooltipTrigger asChild>
                                    <div
                                      className="w-5 h-5 rounded transition-all relative"
                                      style={{
                                        backgroundColor: getHeatmapColor(day.count),
                                        border: day.count > 0 ? `1.5px solid ${getHeatmapColor(day.count)}` : '1px solid hsl(0, 0%, 85%)',
                                        cursor: day.count > 0 ? 'pointer' : 'default',
                                      }}
                                      onMouseEnter={(e) => {
                                        if (day.count > 0) {
                                          e.currentTarget.style.transform = 'scale(1.15)';
                                          e.currentTarget.style.zIndex = '10';
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.zIndex = '1';
                                      }}
                                    />
                                  </TooltipTrigger>
                                  {day.count > 0 && (
                                    <TooltipContent>
                                      <div className="text-xs">
                                        <p className="font-semibold">
                                          {day.date.toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                          })}
                                        </p>
                                        <p className="text-muted-foreground">
                                          {day.count}개 제출
                                        </p>
                                      </div>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TooltipProvider>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
