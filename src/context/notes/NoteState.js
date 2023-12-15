import { useState } from "react";
import NoteContext from "./NoteContext";
import {
  serviceCallDelete,
  serviceCallFetchGet,
  serviceCallGet,
  serviceCallPost,
} from "../../Helper/Service";

const NoteState = (props) => {
  const about = {
    name: "Saurabh Gawade",
    title: "iNotebook",
    desc: "Now you can sign up and login and store your notes into cloud",
  };
  const aboutChange = {
    name: "Saurabh Gawade - This page is using react create Context API",
    title: "iNotebook - Enjoy the APP",
    desc: "It's Totally Free to use",
  };

  const notesinit = [];
  const [data, setData] = useState(about);
  const [notes, setNotes] = useState(notesinit);

  //? Add Note
  const getNotes = async () => {
    //! Define the headers for the request
    const url = `api/notes/fetchallnotes`;
    const headers = {
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YzQyOWUzN2E4YjAzOGJhZTkwNmE2In0sImlhdCI6MTcwMjY0NDMxM30.DzfrBH6MgKHBlvI9KStqJvYS3VXKSRRggBNf8S8NKQQ",
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
      "auth-token": "",
    };
    const url = `api/notes/addnote`;
    const postData = { title, description, tag };
    const res = await serviceCallPost(url, postData, headers);
    console.log(res, "Add Note Res");
    const addnote = {
      _id: "7",
      title: title,
      description: description,
      tag: tag,
    };
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
        "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YzQyOWUzN2E4YjAzOGJhZTkwNmE2In0sImlhdCI6MTcwMjY0NDMxM30.DzfrBH6MgKHBlvI9KStqJvYS3VXKSRRggBNf8S8NKQQ",
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
      "auth-token": "",
    };
    const postData = { title, description, tag };
    const url = `api/notes/updatenote/${id}`;
    const res = await serviceCallPost(url, postData, headers);
    console.log(res, "Update res notes");
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
