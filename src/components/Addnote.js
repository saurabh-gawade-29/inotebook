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
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Notes</h3>
        <button
          type="button"
          className="btn btn-dark"
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
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Fill The Details
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
                    name="title"
                    onChange={onChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Desciption
                  </label>
                  <textarea
                    name="description"
                    onChange={onChange}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Tag
                  </label>
                  <input
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
                  type="button"
                  className="btn btn-dark"
                  onClick={handleSubmit}
                >
                  Save changes
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
