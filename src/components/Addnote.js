import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const Addnote = () => {
  //! Context
  const context = useContext(NoteContext);
  const { addNote } = context;

  //! UseState
  let initstate = {
    title: "",
    description: "",
    tag: "",
  };
  const [note, setNote] = useState(initstate);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote(initstate);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Notes</h3>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Note
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add The Details
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
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Title
                  </label>
                  <input
                    value={note.title}
                    name="title"
                    onChange={onChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                  />
                  <div id="emailHelp" className="form-text">
                    Min Length Should be 3
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Desciption
                  </label>
                  <textarea
                    value={note.description}
                    name="description"
                    onChange={onChange}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                  <div id="emailHelp" className="form-text">
                    Min Length Should be 5
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Tag
                  </label>
                  <input
                    value={note.tag}
                    name="tag"
                    onChange={onChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={
                    note.title.length < 3 || note.description.length < 5
                  }
                  type="button"
                  className="btn btn-danger"
                  onClick={handleSubmit}
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addnote;
