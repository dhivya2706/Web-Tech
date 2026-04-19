import React, { useRef } from "react";
import { useNotes } from "./useNotes";
import { useSearch } from "./useSearch";

export default function App() {
  const inputRef = useRef();

  const { notes, addNote, deleteNote } = useNotes();
  const { query, setQuery, filtered } = useSearch(notes);

  const handleAdd = () => {
    const value = inputRef.current.value;
    addNote(value);
    inputRef.current.value = "";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📝 Notes App</h1>

      <input ref={inputRef} placeholder="Write note..." />
      <button onClick={handleAdd}>Add</button>

      <br /><br />
      <input
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <h2>Your Notes</h2>

      <ul>
        {filtered.map(note => (
          <li key={note.id}>
            {note.text}
            <button onClick={() => deleteNote(note.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
