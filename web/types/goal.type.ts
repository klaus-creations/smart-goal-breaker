export interface Step {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Goal {
  id: number;
  title: string;
  complexity_score: number;
  steps: string[];
  created_at?: string;
}

export interface PaginatedGoals {
  total: number;
  page: number;
  page_size: number;
  results: Goal[];
}

export interface GoalInput {
  goal_text: string;
}
