import axios from "axios";
import type { Note } from "../types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

interface Params{
  page:number;
  search?: string;
}


export const fetchNotes = async (
  query: string,
  page: number
): Promise<NoteResponse> => {
  const token: string = import.meta.env.VITE_NOTEHUB_TOKEN;

  const params:Params = {
    page,
  };

  if (query) {
    params.search = query;
  }

  const response = await axios.get<NoteResponse>(
    `https://notehub-public.goit.study/api/notes?perPage=12&sortBy=created`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response);

  return response.data;
};
