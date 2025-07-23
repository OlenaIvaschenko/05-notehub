import NoteList from "../NoteList/NoteList";
import { fetchNotes } from "../../services/noteService";

import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";

import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bebounceQuery]=useDebounce(query,1000);

  const updateQuery = (query:string) => {
    setQuery(query);
    setPage(1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", bebounceQuery, page],
    queryFn: () => fetchNotes(bebounceQuery, page),

    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

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
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </header>
      {isLoading && <span>Loading...</span>}
      {isError && <span className={css.error}>Error</span>}
      {isSuccess && (
        <NoteList notes={data ? data.notes : []} />
      )}
    </div>
  );
}
