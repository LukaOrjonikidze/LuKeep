import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let localNotes = localStorage.getItem("notes");
    if (localNotes){
      localNotes = JSON.parse(localStorage.getItem("notes"));
    } else {
      localNotes = [];
    }
    setNotes(localNotes);
  }, [])
  useEffect( () => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function addNote(note) {
    setNotes((prevValue) => [...prevValue, note]);
  }
  function deleteNote(id) {
    setNotes((prevValue) => prevValue.filter((e, i) => i !== id));
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => (
        <Note
          onDelete={deleteNote}
          key={index}
          id={index}
          title={note.title}
          content={note.content}
        />
      ))}
      <Footer />
    </div>
  );
}
export default App;
