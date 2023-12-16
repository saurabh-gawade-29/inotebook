import { useState } from "react";
import NoteContext from "./NoteContext";
import {
  serviceCallDelete,
  serviceCallGet,
  serviceCallPost,
  serviceCallPut,
} from "../../Helper/Service";

const NoteState = (props) => {
  const about = {
    name: "CelestialScribe",
    title: "Your Cloud Notes",
    desc: "CelestialScribe can be interpreted as a name that combines elements of the celestial, meaning related to the sky or the heavens, with the concept of a scribe, which traditionally refers to a person who writes or records information. In this context, the name may suggest a tool or platform that allows users to document or write in a way that feels inspired, elevated, or connected to something higher or celestial.",
  };
  const aboutChange = {
    name: "This page is using react create Context API",
    title: "Enjoy the APP",
    desc: "It's Totally Free to use",
  };

  const notesinit = [];
  const [data, setData] = useState(about);
  const [notes, setNotes] = useState(notesinit);

  //? get Note
  const getNotes = async () => {
    //! Define the headers for the request
    const url = `api/notes/fetchallnotes`;
    const headers = {
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YzQyOWUzN2E4YjAzOGJhZTkwNmE2In0sImlhdCI6MTcwMjY1ODA1OX0.kuYkK4hFBbQe4EDjXG5BRrEmHXLEZRC04zE-Hdj757U",
    };
    const res = await serviceCallGet(url, headers);
    console.log(res, "Res from getNotes");
    setNotes(res.data);
  };

  //? Add Note
  const addNote = async (title, description, tag) => {
    //! Define the headers for the request
    const headers = {
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YzQyOWUzN2E4YjAzOGJhZTkwNmE2In0sImlhdCI6MTcwMjY1ODA1OX0.kuYkK4hFBbQe4EDjXG5BRrEmHXLEZRC04zE-Hdj757U",
    };
    const url = `api/notes/addnote`;
    const postData = { title, description, tag };
    const res = await serviceCallPost(url, postData, headers);
    console.log(res, "Add Note Res");
    const addnote = res.data;
    //! We use concat => It's return new Array
    setNotes(notes.concat(addnote));
  };

  //? Delete Note
  const deleteNote = async (id) => {
    debugger;
    //! Define the headers for the request
    const url = `api/notes/deletenote/${id}`;
    console.log("Deleting node with Id", id);
    const headers = {
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YzQyOWUzN2E4YjAzOGJhZTkwNmE2In0sImlhdCI6MTcwMjY1ODA1OX0.kuYkK4hFBbQe4EDjXG5BRrEmHXLEZRC04zE-Hdj757U",
    };
    const res = await serviceCallDelete(url, headers);
    console.log(res, "Res from deleteNotes");
    if (res && res.data.Success) {
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
      alert(res.data.Success);
    } else {
      alert("Somthing Went Wrong");
    }
  };

  //? Edit Note
  const editNote = async (id, title, description, tag) => {
    //! Define the headers for the request
    const headers = {
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YzQyOWUzN2E4YjAzOGJhZTkwNmE2In0sImlhdCI6MTcwMjY1ODA1OX0.kuYkK4hFBbQe4EDjXG5BRrEmHXLEZRC04zE-Hdj757U",
    };
    const postData = { title, description, tag };
    const url = `api/notes/updatenote/${id}`;
    const res = await serviceCallPut(url, postData, headers);
    console.log(res, "Update res notes");

    //TODO: above code only change in backend but not updating in frontend

    //* Make Deep Copy of notes
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  const update = () => {
    setTimeout(() => {
      setData(aboutChange);
    }, 5000);
  };
  return (
    <NoteContext.Provider
      value={{
        data: data,
        update: update,
        notes: notes,
        getNotes,
        addNote,
        editNote,
        deleteNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
