export interface Letter {
  id: string;
  user_id: string;
  step: number;
  recipient_id: string;
  content: string;
  isLongestPath: boolean;
  created_at: string;
}

export interface LetterDisplay {
  step: number;
  content: string;
  recipient_name: string;
}

export interface LetterResponse {
  message: string;
  statusCode: number;
  content: {
    letters: LetterDisplay[];
    count: number;
  };
}
