export interface questions {
    title: string;
    categories_name: string;
    id: string;
    difficultys_id: string;
    point: string;
    type: string;
    solved: boolean;
  }

  export interface question {
    title: string;
    categories_name: string;
    difficultys_id: string;
    file_path: string;
    description: string;
    solved: boolean;
    id: string;
    point: string;
}
