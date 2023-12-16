import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import NoteContext from "../context/notes/NoteContext";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const noteContext = useContext(NoteContext);
  const { notes, getNotes, editNote } = noteContext;
  let navigate = useNavigate();
  //! Fetch All Notes
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  //! Open And Close Modal
  const modalRef = useRef(null);
  const closeRef = useRef(null);

  //! We Can use Context instead of this state
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  //! Open Modal
  const updateNote = (currentNote) => {
    debugger;
    console.log(currentNote, "CurrentNote");
    modalRef.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  //! on Chnage Handler
  const onChange = (e) => {
    debugger;
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  //! Submit Form
  const handleSubmit = (e) => {
    //! Updating the note
    console.log("Updated Note", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    closeRef.current.click();
    // addNote(note.title, note.description, note.tag);
  };

  return (
    <div>
      {/* Add Note Section */}
      <Addnote />
      {/* Fetch All Note Section */}
      <div className="your-notes row">
        <div className="p">
          {notes.length === 0 &&
            "No Notes To Display - Add new Note using above addNote Button"}
        </div>
        {notes.map((note, i) => {
          return (
            <div className="col-12 col-sm-12 col-md-4 cold-lg-4" key={i}>
              <Noteitem updateNote={updateNote} data={note} />
            </div>
          );
        })}
      </div>
      {/* Edit Note = use modal for that*/}
      <button
        ref={modalRef}
        type="button"
        //! hide this button using d-none bootstrap class and access using ref
        className="btn btn-dark d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
        Add Note
      </button>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit The Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input
                  value={note.etitle}
                  name="etitle"
                  onChange={onChange}
                  type="text"
                  className="form-control"
                  id="etitle"
                />
                <div id="emailHelp" className="form-text">
                  textarea Min Length Should be 3
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Desciption
                </label>
                <textarea
                  value={note.edescription}
                  name="edescription"
                  onChange={onChange}
                  className="form-control"
                  id="edescription"
                  rows="3"
                ></textarea>
                <div id="emailHelp" className="form-text">
                  Min Length Should be 5
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag
                </label>
                <input
                  value={note.etag}
                  name="etag"
                  onChange={onChange}
                  type="text"
                  className="form-control"
                  id="etag"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={closeRef}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-danger"
                onClick={handleSubmit}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
