import NoteList from "../NoteList/NoteList";
import { fetchNotes} from "../servises/noteService";

import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import SearchBox from "./SearchBox/SearchBox";

export default function App() {
  const [query, setQuery] = useState("");
   const [page, setPage] = useState(1);

   const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    // enabled: query !== "",
    // placeholderData: keepPreviousData,
  });

  return (
   
     <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox/>
		{/* Пагінація */}
		<button className={css.button}>Create note +</button>

  </header>
  <NoteList notes={data?data.notes:[]}/>
</div> 
    
  );
}

// export default App;
