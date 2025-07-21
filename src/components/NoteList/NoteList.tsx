import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}
export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <>
      {notes.length === 0 && <span>Not found</span>}
      {notes.length > 0 && (
        <ul className={css.list}>
          {notes.map((note) => {
            return (
              <li key={note.id} className={css.listItem}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                  <span className={css.tag}>{note.tag}</span>
                  <button
                    onClick={() => onDelete(note.id)}
                    className={css.button}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
