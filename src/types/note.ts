export interface Note {
  title: string;
  content: string;
  tag: string;
  id: number;
  createdAt:string;
  updatedAt:string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}
