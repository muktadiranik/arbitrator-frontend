export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  content_type: number;
  app: string;
  model: string;
  object_id: number;
  tags: any;
  author: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
