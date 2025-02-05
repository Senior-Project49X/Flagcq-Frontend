export interface questions {
    title: string;
    categories_name: string;
    id: number;
    difficultys_id: string;
    point: string;
    type: string;
    solved: boolean;
  }

  export interface Question {
    title: string;
    categories_name: string;
    difficultys_id: string;
    file_path: string;
    description: string;
    solved: boolean;
    id: string;
    point: string;
    hints: Hint[];
}

interface Hint {
  id: number;
  Description: string;
  point: number;
  used: boolean;
}