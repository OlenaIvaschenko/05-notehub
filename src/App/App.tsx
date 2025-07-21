import NoteList from "../NoteList/NoteList";
import { addNote, deleteNote, fetchNotes } from "../servises/noteService";

import css from "./App.module.css";
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";

import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import type { NewNoteData } from "../types/note";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const updateQuery = useDebouncedCallback((query) => {
    setQuery(query);
    setPage(1);
  }, 1000);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),

    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const deleteNoteMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteNote(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", query, page] });
    },
  });

  const handleDeleteNote = (id: number) => {
    deleteNoteMutation.mutate(id);
  };

  const addNoteMutation = useMutation({
    mutationFn: (newNote: NewNoteData) => {
      return addNote(newNote);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", query, page] });
    },
  });

  const handleCreateNote = (note: NewNoteData) => {
    addNoteMutation.mutate(note);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={updateQuery} />
        {data && data.totalPages > 1 && (
          <Pagination page={page} total={data.totalPages} onChange={setPage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm createNote={handleCreateNote} onClose={closeModal} />
          </Modal>
        )}
      </header>
      {isLoading && <span>Loading...</span>}
      {isError && <span className={css.error}>Error</span>}
      {isSuccess && (
        <NoteList onDelete={handleDeleteNote} notes={data ? data.notes : []} />
      )}
    </div>
  );
}
