import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import api from '@/lib/api';
import { getCharacterImage } from '@/lib/characterImages';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Submission } from '@/types';
import { ArrowLeft, Copy, ChevronDown, ChevronUp, RefreshCw, Code2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Feedback() {
  const { id } = useParams<{ id: string }>();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [codeExpanded, setCodeExpanded] = useState(true);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        console.log('📡 피드백 조회 요청:', id);
        const response = await api.get(`/api/submissions/${id}`);
        console.log('📡 피드백 응답:', response.data);
        
        // 백엔드 응답 구조: { success: true, data: {...} }
        const submissionData = response.data.data || response.data;
        setSubmission(submissionData);
      } catch (error) {
        console.error('❌ 피드백 조회 실패:', error);
        toast({
          title: '피드백을 불러올 수 없습니다',
          description: '백엔드 서버를 확인해주세요.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id, toast]);

  const copyCode = () => {
    if (submission) {
      navigator.clipboard.writeText(submission.userCode);
      toast({
        title: '코드가 복사되었습니다',
      });
    }
  };

  const handleRetry = () => {
    navigate('/submit', {
      state: {
        problemSite: submission?.problemSite,
        problemNumber: submission?.problemNumber,
        problemTitle: submission?.problemTitle,
        language: submission?.language,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-4xl mx-auto py-8 px-4 text-center">
          <p className="text-xl text-muted-foreground">피드백을 찾을 수 없습니다.</p>
          <Button asChild className="mt-4">
            <Link to="/history">내역으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  const characterEmoji = submission.character?.emoji || '🤖';
  const bgColor = characterEmoji === '🤖' ? 'hsl(207, 71%, 59%, 0.05)' :
                   characterEmoji === '🦉' ? 'hsl(25, 40%, 40%, 0.05)' :
                   characterEmoji === '🐛' ? 'hsl(0, 79%, 70%, 0.05)' :
                   characterEmoji === '🚀' ? 'hsl(28, 100%, 50%, 0.05)' :
                   characterEmoji === '🐱' ? 'hsl(350, 100%, 88%, 0.05)' :
                   'hsl(283, 39%, 53%, 0.05)';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* 헤더 */}
          <Card className="p-6 shadow-medium">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  {submission.problemSite} #{submission.problemNumber}
                  {submission.problemTitle && ` - ${submission.problemTitle}`}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>제출일: {new Date(submission.submittedAt).toLocaleDateString('ko-KR')}</span>
                  <span>언어: {submission.language}</span>
                  <span className="flex items-center gap-1">
                    선생님: 
                    {getCharacterImage(submission.characterId) ? (
                      <img 
                        src={getCharacterImage(submission.characterId)} 
                        alt={submission.character?.name || '캐릭터'}
                        className="w-6 h-6 object-contain rounded-full inline-block"
                      />
                    ) : (
                      <span className="text-xl">{submission.character?.emoji || '🤖'}</span>
                    )}
                    {submission.character?.name || '코디'}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* 코드 섹션 */}
          <Card className="overflow-hidden shadow-medium">
            <div
              className="flex justify-between items-center p-4 bg-card border-b cursor-pointer"
              onClick={() => setCodeExpanded(!codeExpanded)}
            >
              <h2 className="text-xl font-bold">나의 답안 코드</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyCode();
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  {codeExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {codeExpanded && (
              <SyntaxHighlighter
                language={submission.language.toLowerCase()}
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{ margin: 0, borderRadius: 0 }}
              >
                {submission.userCode}
              </SyntaxHighlighter>
            )}
          </Card>

          {/* 피드백 섹션 */}
          {submission.feedback && (
            <Card className="p-6 shadow-heavy" style={{ backgroundColor: bgColor }}>
              <div className="flex items-center gap-3 mb-6">
                {getCharacterImage(submission.characterId) ? (
                  <img 
                    src={getCharacterImage(submission.characterId)} 
                    alt={submission.character?.name || '캐릭터'}
                    className="w-16 h-16 object-contain rounded-full"
                  />
                ) : (
                  <span className="text-4xl">{submission.character?.emoji || '🤖'}</span>
                )}
                <h2 className="text-2xl font-bold">{submission.character?.name || '코디'}의 피드백</h2>
              </div>

              <div className="space-y-6">
                {/* 전반적인 피드백 */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    📝 전반적인 피드백
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{submission.feedback.overallFeedback}</p>
                </div>

                {/* 잘한 점 */}
                {submission.feedback.feedbacks.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      ✅ 잘한 점
                    </h3>
                    <ul className="space-y-2">
                      {submission.feedback.feedbacks.map((feedback, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-green-500">•</span>
                          <span className="text-muted-foreground">{feedback}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 중요 개념 */}
                {submission.feedback.keyPoints.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      💡 중요 개념
                    </h3>
                    <ul className="space-y-2">
                      {submission.feedback.keyPoints.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-blue-500">•</span>
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 주의 사항 */}
                {submission.feedback.warnings.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      ⚠️ 주의 사항
                    </h3>
                    <ul className="space-y-2">
                      {submission.feedback.warnings.map((warning, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-yellow-500">•</span>
                          <span className="text-muted-foreground">{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 복잡도 분석 */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    📊 복잡도 분석
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">시간 복잡도</p>
                      <p className="text-lg font-mono font-bold">{submission.feedback.timeComplexity}</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">공간 복잡도</p>
                      <p className="text-lg font-mono font-bold">{submission.feedback.spaceComplexity}</p>
                    </div>
                  </div>
                </div>

                {/* 다른 풀이 방법 보기 버튼 */}
                {submission.feedback.alternativeSolutions && submission.feedback.alternativeSolutions.length > 0 && (
                  <div>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => setShowAlternatives(!showAlternatives)}
                    >
                      <Code2 className="h-4 w-4" />
                      다른 풀이방법 보기 ({submission.feedback.alternativeSolutions.length}개)
                      {showAlternatives ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                    </Button>

                    <AnimatePresence>
                      {showAlternatives && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-4"
                        >
                          {submission.feedback.alternativeSolutions.map((solution, index) => (
                            <Card key={solution.id || index} className="p-4 bg-background/80">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-lg">다른 풀이 #{index + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    navigator.clipboard.writeText(solution.code);
                                    toast({ title: '코드가 복사되었습니다' });
                                  }}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              {solution.comment && (
                                <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                                  <p className="text-sm text-blue-900 dark:text-blue-100">
                                    💡 {solution.comment}
                                  </p>
                                </div>
                              )}

                              <SyntaxHighlighter
                                language={submission.language.toLowerCase()}
                                style={vscDarkPlus}
                                showLineNumbers
                                customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                              >
                                {solution.code}
                              </SyntaxHighlighter>
                            </Card>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* 대안적 접근 */}
                {submission.feedback.alternativeApproach && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      💼 대안적 접근
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {submission.feedback.alternativeApproach}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* 하단 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" asChild className="gap-2">
              <Link to="/history">
                <ArrowLeft className="h-4 w-4" />
                목록으로 돌아가기
              </Link>
            </Button>
            <Button className="gap-2" onClick={handleRetry}>
              <RefreshCw className="h-4 w-4" />
              재도전하기
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
