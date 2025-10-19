// Mock 데이터 - 백엔드 없이 테스트용
import { Submission, FeedbackDetail } from '@/types';

// Mock 제출 내역 데이터
export const mockSubmissions: Submission[] = [
  {
    id: '1',
    problemSite: '백준',
    problemNumber: '1234',
    problemTitle: 'DFS와 BFS',
    problemType: 'DFS',
    language: 'Java',
    userCode: `import java.util.*;

public class Main {
    static ArrayList<Integer>[] graph;
    static boolean[] visited;
    
    public static void dfs(int node) {
        visited[node] = true;
        System.out.print(node + " ");
        
        for (int next : graph[node]) {
            if (!visited[next]) {
                dfs(next);
            }
        }
    }
    
    public static void bfs(int start) {
        Queue<Integer> queue = new LinkedList<>();
        visited = new boolean[graph.length];
        
        queue.offer(start);
        visited[start] = true;
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");
            
            for (int next : graph[node]) {
                if (!visited[next]) {
                    queue.offer(next);
                    visited[next] = true;
                }
            }
        }
    }
}`,
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2시간 전
    status: 'COMPLETED',
    character: {
      id: 'cody',
      name: '코디봇',
      emoji: '🤖',
      image: '/characters/cody_bot_portrait.jpg'
    },
    feedback: {
      overallFeedback: '전반적으로 잘 작성된 코드입니다. DFS와 BFS를 정확하게 구현했으며, 재귀와 큐를 적절히 활용했습니다.',
      feedbacks: [
        'visited 배열을 활용하여 중복 방문을 방지한 점이 좋습니다',
        '재귀 함수를 사용한 DFS 구현이 명확합니다',
        'BFS에서 큐를 올바르게 사용했습니다',
        '변수명이 명확하여 코드 가독성이 높습니다'
      ],
      keyPoints: [
        'DFS는 스택(재귀) 구조로 깊이 우선 탐색을 수행합니다',
        'BFS는 큐 구조로 너비 우선 탐색을 수행합니다',
        'visited 배열로 방문 체크를 통해 무한 루프를 방지합니다'
      ],
      warnings: [
        '그래프의 크기가 클 경우 재귀 DFS는 스택 오버플로우 위험이 있습니다',
        '메모리 제한을 고려하여 visited 배열 크기를 최적화하세요',
        '연결되지 않은 그래프의 경우 모든 노드를 탐색하려면 추가 로직이 필요합니다'
      ],
      timeComplexity: 'O(V + E) - V는 정점 수, E는 간선 수',
      spaceComplexity: 'O(V) - visited 배열과 재귀/큐에 사용되는 공간',
      alternativeApproach: '큰 그래프의 경우 재귀 DFS 대신 스택을 명시적으로 사용하는 반복문 방식도 고려해보세요.'
    }
  },
  {
    id: '2',
    problemSite: '프로그래머스',
    problemNumber: '42748',
    problemTitle: 'K번째 수',
    problemType: '정렬',
    language: 'Python',
    userCode: `def solution(array, commands):
    answer = []
    for command in commands:
        i, j, k = command
        sliced = array[i-1:j]
        sliced.sort()
        answer.append(sliced[k-1])
    return answer`,
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1일 전
    status: 'COMPLETED',
    character: {
      id: 'coco',
      name: '코코',
      emoji: '🐱',
      image: '/characters/coco_portrait.jpg'
    },
    feedback: {
      overallFeedback: '잘 풀었어요! 간결하고 명확한 코드입니다. Python의 슬라이싱과 정렬을 잘 활용했어요.',
      feedbacks: [
        '리스트 슬라이싱을 정확하게 사용했어요',
        '언패킹을 활용해 command에서 값을 꺼낸 점이 좋아요',
        '코드가 간결하고 읽기 쉬워요'
      ],
      keyPoints: [
        'Python의 슬라이싱은 [start:end] 형태로 사용합니다',
        'sort()는 리스트를 제자리에서 정렬합니다',
        '인덱스는 0부터 시작하므로 -1 보정이 필요합니다'
      ],
      warnings: [
        '매번 정렬하므로 commands가 많으면 비효율적일 수 있어요',
        'sliced 리스트를 매번 새로 생성하여 메모리를 사용해요'
      ],
      timeComplexity: 'O(N * M log M) - N은 commands 개수, M은 슬라이스 길이',
      spaceComplexity: 'O(M) - 슬라이스된 리스트 크기'
    }
  },
  {
    id: '3',
    problemSite: '백준',
    problemNumber: '2579',
    problemTitle: '계단 오르기',
    problemType: 'DP',
    language: 'C++',
    userCode: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int stair[301];
    int dp[301];
    
    for (int i = 1; i <= n; i++) {
        cin >> stair[i];
    }
    
    dp[1] = stair[1];
    dp[2] = stair[1] + stair[2];
    dp[3] = max(stair[1] + stair[3], stair[2] + stair[3]);
    
    for (int i = 4; i <= n; i++) {
        dp[i] = max(dp[i-2] + stair[i], dp[i-3] + stair[i-1] + stair[i]);
    }
    
    cout << dp[n];
    return 0;
}`,
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3일 전
    status: 'COMPLETED',
    character: {
      id: 'owl',
      name: '알고 선생님',
      emoji: '🦉',
      image: '/characters/prof_owl_portrait.jpg'
    },
    feedback: {
      overallFeedback: '동적 프로그래밍의 핵심을 잘 이해하고 계시군요. 점화식을 정확하게 도출했습니다.',
      feedbacks: [
        '문제의 제약 조건을 잘 파악하여 점화식에 반영했습니다',
        '초기값 설정이 올바릅니다',
        'max 함수를 사용하여 최댓값을 선택하는 로직이 명확합니다'
      ],
      keyPoints: [
        'DP는 작은 문제의 해를 저장하여 큰 문제를 해결합니다',
        '계단 오르기는 연속된 3개 계단을 밟을 수 없다는 제약이 핵심입니다',
        '점화식: dp[i] = max(dp[i-2] + stair[i], dp[i-3] + stair[i-1] + stair[i])'
      ],
      warnings: [
        'n이 1 또는 2일 때 배열 인덱스 초과 주의',
        '배열 크기를 충분히 크게 선언했는지 확인하세요'
      ],
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      alternativeApproach: '공간 복잡도를 줄이려면 최근 3개의 값만 변수로 저장하는 방법도 있습니다.'
    }
  },
  {
    id: '4',
    problemSite: 'LeetCode',
    problemNumber: '200',
    problemTitle: 'Number of Islands',
    problemType: 'BFS',
    language: 'JavaScript',
    userCode: `function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    const bfs = (r, c) => {
        const queue = [[r, c]];
        grid[r][c] = '0';
        
        const directions = [[0,1], [1,0], [0,-1], [-1,0]];
        
        while (queue.length > 0) {
            const [row, col] = queue.shift();
            
            for (const [dr, dc] of directions) {
                const newR = row + dr;
                const newC = col + dc;
                
                if (newR >= 0 && newR < rows && 
                    newC >= 0 && newC < cols && 
                    grid[newR][newC] === '1') {
                    queue.push([newR, newC]);
                    grid[newR][newC] = '0';
                }
            }
        }
    };
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                bfs(i, j);
                count++;
            }
        }
    }
    
    return count;
}`,
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5시간 전
    status: 'COMPLETED',
    character: {
      id: 'speedy',
      name: '스피디',
      emoji: '🚀',
      image: '/characters/speedy_portrait.jpg'
    },
    feedback: {
      overallFeedback: '효율적인 BFS 구현입니다! 성능 좋아요!',
      feedbacks: [
        'BFS를 사용한 섬 탐색이 정확합니다',
        '4방향 탐색을 directions 배열로 깔끔하게 처리했어요',
        '방문한 노드를 0으로 마킹하여 추가 공간 사용을 줄였습니다',
        '경계 체크 로직이 완벽합니다'
      ],
      keyPoints: [
        'BFS는 큐를 사용하여 레벨 단위로 탐색합니다',
        '2D 그리드에서 상하좌우 탐색은 directions 배열로 처리',
        '방문 체크를 원본 배열에 하여 공간 절약'
      ],
      warnings: [
        'shift()는 O(N) 시간이 걸립니다. 더 빠른 구현을 원한다면 포인터를 사용하세요',
        '원본 grid를 수정합니다. 원본 보존이 필요하면 visited 배열을 별도로 사용하세요'
      ],
      timeComplexity: 'O(M * N) - 모든 셀을 한 번씩 방문',
      spaceComplexity: 'O(min(M, N)) - 최악의 경우 큐 크기',
      alternativeApproach: 'DFS로도 풀 수 있으며, Union-Find 자료구조를 사용하면 더 최적화할 수 있습니다.'
    }
  },
  {
    id: '5',
    problemSite: '백준',
    problemNumber: '1931',
    problemTitle: '회의실 배정',
    problemType: '그리디',
    language: 'Java',
    userCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        int[][] meetings = new int[n][2];
        for (int i = 0; i < n; i++) {
            meetings[i][0] = sc.nextInt(); // 시작 시간
            meetings[i][1] = sc.nextInt(); // 종료 시간
        }
        
        // 종료 시간 기준 정렬, 같으면 시작 시간 기준
        Arrays.sort(meetings, (a, b) -> {
            if (a[1] == b[1]) return a[0] - b[0];
            return a[1] - b[1];
        });
        
        int count = 0;
        int endTime = 0;
        
        for (int i = 0; i < n; i++) {
            if (meetings[i][0] >= endTime) {
                count++;
                endTime = meetings[i][1];
            }
        }
        
        System.out.println(count);
    }
}`,
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2일 전
    status: 'COMPLETED',
    character: {
      id: 'debuggy',
      name: '디버기',
      emoji: '🐛',
      image: '/characters/debuggy_portrait.jpg'
    },
    feedback: {
      overallFeedback: '훌륭한 그리디 알고리즘 구현입니다! 꼼꼼하게 잘 짰어요!',
      feedbacks: [
        '종료 시간 기준 정렬이 핵심인데 정확히 구현했어요',
        '종료 시간이 같을 때 시작 시간 기준 정렬도 고려했네요',
        '회의 선택 로직이 명확합니다',
        '변수명이 의미가 명확해요'
      ],
      keyPoints: [
        '그리디 알고리즘은 매 순간 최선의 선택을 합니다',
        '회의실 배정은 종료 시간이 빠른 회의부터 선택하는 것이 최적입니다',
        '정렬이 그리디 문제의 핵심인 경우가 많습니다'
      ],
      warnings: [
        '입력이 클 경우 Scanner보다 BufferedReader가 더 빠릅니다',
        '종료 시간이 같을 때의 처리를 빼먹기 쉬우니 주의하세요',
        '시작 시간이 이전 종료 시간과 같아도 선택 가능합니다 (>= 조건)'
      ],
      timeComplexity: 'O(N log N) - 정렬이 지배적',
      spaceComplexity: 'O(N) - 회의 배열',
      alternativeApproach: '우선순위 큐를 사용하여 실시간으로 회의를 추가하면서 풀 수도 있습니다.'
    }
  }
];

// Mock 통계 데이터
export const mockStatistics = {
  totalSubmissions: 5,
  problemTypeDistribution: [
    { name: 'DFS', value: 20, color: 'hsl(207, 71%, 59%)' },
    { name: 'BFS', value: 20, color: 'hsl(25, 40%, 40%)' },
    { name: 'DP', value: 20, color: 'hsl(0, 79%, 70%)' },
    { name: '정렬', value: 20, color: 'hsl(28, 100%, 50%)' },
    { name: '그리디', value: 20, color: 'hsl(350, 100%, 88%)' }
  ],
  weeklyProgress: [
    { date: '2025-10-09', count: 0 },
    { date: '2025-10-10', count: 1 },
    { date: '2025-10-11', count: 0 },
    { date: '2025-10-12', count: 1 },
    { date: '2025-10-13', count: 1 },
    { date: '2025-10-14', count: 1 },
    { date: '2025-10-15', count: 1 }
  ],
  weakAreas: ['DP', '그리디'],
  characterUsage: {
    'cody': 1,
    'owl': 1,
    'debuggy': 1,
    'speedy': 1,
    'coco': 1,
    'cube': 0
  }
};

// Mock 사용자 데이터
export const mockUser = {
  id: 'mock-user-1',
  email: 'test@example.com',
  name: '테스트 사용자',
  profileImage: 'https://via.placeholder.com/150',
  selectedCharacter: 'cody'
};

// Mock 제출 상태 (로딩 시뮬레이션용)
export const createMockSubmissionStatus = (submissionId: string) => {
  let progress = 0;
  
  return () => {
    progress = Math.min(progress + Math.random() * 15 + 5, 100);
    
    return {
      submissionId,
      status: progress >= 100 ? 'COMPLETED' : 'PROCESSING',
      progress: Math.round(progress)
    };
  };
};

// 새 제출 생성 시뮬레이션
let nextSubmissionId = 6;

export const createMockSubmission = (data: {
  problemSite: string;
  problemNumber: string;
  problemTitle?: string;
  language: string;
  userCode: string;
  characterId: string;
}): { submissionId: string } => {
  const submissionId = `${nextSubmissionId++}`;
  
  // Mock 제출 데이터 생성 (실제로는 저장하지 않음, 시뮬레이션만)
  setTimeout(() => {
    console.log('Mock 제출 완료:', submissionId);
  }, 1000);
  
  return { submissionId };
};

