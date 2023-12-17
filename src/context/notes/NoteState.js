import { useState } from "react";
import NoteContext from "./NoteContext";
import {
  serviceCallDelete,
  serviceCallGet,
  serviceCallPost,
  serviceCallPut,
} from "../../Helper/Service";
import { toast } from "react-toastify";

const NoteState = (props) => {
  //! Basic Demonstration of use Context hook = about page -> useContext
  const about = {
    name: "CelestialScribe",
    title: "Your Cloud Notes",
    desc: "Welcome to CelestialScribe, where inspiration meets organization in the celestial realm of note-taking. CelestialScribe can be interpreted as a name that combines elements of the celestial, meaning related to the sky or the heavens, with the concept of a scribe, which traditionally refers to a person who writes or records information. In this context, the name may suggest a tool or platform that allows users to document or write in a way that feels inspired, elevated, or connected to something higher or celestial.",
  };
  const aboutChange = {
    name: "This page is using react create Context API",
    title: "Enjoy the APP",
    desc: "It's Totally Free to use",
  };

  //! States
  const notesinit = [];
  const [data, setData] = useState(about);
  const [notes, setNotes] = useState(notesinit);

  //? get Note
  const getNotes = async () => {
    try {
      //! Define the headers for the request
      const url = `api/notes/fetchallnotes`;
      const headers = {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      };
      const res = await serviceCallGet(url, headers);
      setNotes(res.data);
    } catch (error) {
      toast.error("Somthing Went Wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //? Add Note
  const addNote = async (title, description, tag) => {
    try {
      //! Define the headers for the request
      const headers = {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      };
      const url = `api/notes/addnote`;
      const postData = { title, description, tag };
      const res = await serviceCallPost(url, postData, headers);
      const addnote = res.data;
      //! We use concat => It's return new Array
      setNotes(notes.concat(addnote));
    } catch (error) {
      toast.error("Somthing Went Wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //? Delete Note
  const deleteNote = async (id) => {
    try {
      //! Define the headers for the request
      const url = `api/notes/deletenote/${id}`;
      const headers = {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      };
      const res = await serviceCallDelete(url, headers);
      if (res && res.data.Success) {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
        toast.success(res.data.Success, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Somthing Went Wrong", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Somthing Went Wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //? Edit Note
  const editNote = async (id, title, description, tag) => {
    //! Define the headers for the request
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    };
    const postData = { title, description, tag };
    const url = `api/notes/updatenote/${id}`;
    const res = await serviceCallPut(url, postData, headers);

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
