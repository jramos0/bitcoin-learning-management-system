// @generated
// This file is automatically generated from our schemas by the command `pnpm types:generate`. Do not modify manually.

export interface CourseProgress {
  uid: string;
  courseId: string;
  completedChaptersCount: number;
  lastUpdated: Date;
  progressPercentage: number;
}

export interface CoursePayment {
  uid: string;
  courseId: string;
  format: 'online' | 'inperson';
  paymentStatus: string;
  amount: number;
  paymentId: string;
  invoiceUrl: string | null;
  couponCode: string | null;
  lastUpdated: Date;
}

export interface CourseUserChapter {
  uid: string;
  courseId: string;
  chapterId: string;
  completedAt: Date;
  booked: boolean | null;
}

export interface CourseQuizAttempts {
  uid: string;
  chapterId: string;
  questionsCount: number;
  correctAnswersCount: number;
  doneAt: Date;
}

export interface CourseReview {
  uid: string;
  courseId: string;
  general: number;
  length: number;
  difficulty: number;
  quality: number;
  faithful: number;
  recommand: number;
  publicComment: string | null;
  teacherComment: string | null;
  adminComment: string | null;
  createdAt: Date;
}

export interface CourseExamAttempt {
  id: string;
  uid: string;
  courseId: string;
  language: string;
  finalized: boolean;
  score: number | null;
  succeeded: boolean;
  startedAt: Date;
  finishedAt: Date | null;
}

export interface CourseExamQuestion {
  id: string;
  examId: string;
  questionId: string;
}

export interface CourseProgressExtended {
  uid: string;
  courseId: string;
  completedChaptersCount: number;
  lastUpdated: Date;
  progressPercentage: number;
  totalChapters: number;
  chapters: {
    chapterId: string;
    completedAt: Date;
  }[];
  nextChapter?:
    | {
        chapterIndex: number;
        chapterId: string;
        courseId: string;
      }
    | undefined;
  lastCompletedChapter?:
    | {
        chapterId: string;
        completedAt: Date;
      }
    | undefined;
}

export interface GetUserChapterResponse {
  courseId: string;
  chapterId: string;
  completedAt: Date;
  booked: boolean | null;
}

export interface PartialExamQuestion {
  id: string;
  text: string;
  answers: {
    order: number;
    text: string;
  }[];
}

export interface CourseExamResults {
  score: number | null;
  finalized: boolean;
  succeeded: boolean;
  startedAt: Date;
  finishedAt: Date | null;
  questions: {
    text: string;
    explanation: string;
    chapterName: string;
    chapterPart: number;
    chapterIndex: number;
    chapterLink: string;
    userAnswer: number | null;
    answers: {
      text: string;
      order: number;
      correctAnswer: boolean;
    }[];
  }[];
}

export interface CourseSuccededExam {
  score: number | null;
  finalized: boolean;
  succeeded: boolean;
  startedAt: Date;
  finishedAt: Date | null;
  courseId: string;
  courseName: string;
}
