import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Alert from "@mui/material/Alert";
import Grow from "@mui/material/Grow";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [areaSelected, setAreaSelected] = useState(false);
  const [alertError, setAlertError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setAlertError("");
    setNote((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function submitNote(event) {
    event.preventDefault();
    if (note.title !== "" && note.content !== "") {
      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
    } else {
      setAlertError("Fill in both of the inputs");
    }
  }

  return (
    <div>
      <form className="create-note">
        {areaSelected ? (
          <input
            onChange={handleChange}
            value={note.title}
            name="title"
            placeholder="Title"
          />
        ) : null}

        <textarea
          onChange={handleChange}
          onSelect={() => setAreaSelected(true)}
          value={note.content}
          name="content"
          placeholder="Take a note..."
          rows={areaSelected ? "3" : "1"}
        />

        <Zoom in={areaSelected}>
          <Fab color="primary" onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
        { alertError !== "" ?
          <Grow direction="up" in={alertError !== ""} >
          <Alert  severity="warning">{alertError}</Alert>
        </Grow> : null }
      </form>
    </div>
  );
}

export default CreateArea;
