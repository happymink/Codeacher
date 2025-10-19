export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  selectedCharacter?: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  emoji: string;
  image?: string; // 캐릭터 이미지 경로 추가
  description: string;
  specialty: string;
  colorTheme: string;
  personality: string;
  dialogues: {
    loading: string[];
    analyzing: string[];
    complete: string[];
  };
}

export interface Submission {
  id: string;
  problemSite: string;
  problemNumber: string;
  problemTitle?: string;
  problemType?: string;
  language: string;
  userCode: string;
  submittedAt: string;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
  characterId: string;
  character: {
    id: string;
    name: string;
    emoji: string;
    image?: string;
  };
  feedback?: FeedbackDetail;
}

export interface AlternativeSolution {
  id?: number;
  code: string;
  comment: string;
  displayOrder?: number;
}

export interface FeedbackDetail {
  overallFeedback: string;
  feedbacks: string[];
  keyPoints: string[];
  warnings: string[];
  timeComplexity: string;
  spaceComplexity: string;
  alternativeApproach?: string;
  alternativeSolutions?: AlternativeSolution[];
}

export interface SubmissionStatus {
  submissionId: string;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number;
}
