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

export interface QuestionProps {
  useMode: string;
  categoryReroute: string;
  pageNumber: string;
  PageReroute: string;
  tournament_id?: number;
  addQuestionTournament?: (id: number) => void;
  questionList?: number[];
}

export interface SortQeuestions {
  name: string;
  order: string;
}

interface Hint {
  id: number;
  Description: string;
  point: number;
  used: boolean;
}

export interface PaginationProp {
  totalPages: number;
  hasNextPage: boolean;
}

export const UsePage = {
  AllMode: "",
  Tournament: "Tournament",
  Practice: "Practice",
};
export const CategoryReroute = {
  HomePage: "/?page=1",
  Tournament: "?tournamentId=:tournamentId&page=",
};
export const PageReroute = {
  HomePage: "/?page=",
  Tournament: "?page=",
};
