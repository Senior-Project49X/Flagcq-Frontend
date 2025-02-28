export interface questions {
  title: string;
  categories_name: string;
  id: number;
  difficulty_id: string;
  point: string;
  type: string;
  solved: boolean;
  is_selected: boolean;
  tournament_id: number;
  submitCount: number;
  canEdit: boolean;
}

export interface Question {
  title: string;
  categories_name: string;
  difficulty_id: string;
  file_path: string;
  description: string;
  solved: boolean;
  id: string;
  point: number;
  hints: Hint[];
}

interface Hint {
  id: number;
  Description: string;
  point: number;
  used: boolean;
}
