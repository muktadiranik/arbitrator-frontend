export interface Jobs {
  id: number;
  title: string;
  description: string;
  position: string;
  employment_type: string;
  details: {
    id: number;
    text: string;
    type: string;
    created_at: Date;
    updated_at?: Date;
  }[];
  created_at: Date;
  updated_at?: Date;
}
