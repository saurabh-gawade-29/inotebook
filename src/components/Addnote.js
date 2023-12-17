import React, { createRef, useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import { toast } from "react-toastify";

const Addnote = () => {
  const titleRef = createRef(null);
  const descriptionRef = createRef(null);
  const tagRef = createRef(null);

  //! Context
  const context = useContext(NoteContext);
  const { addNote } = context;

  //! States
  let initstate = {
    title: "",
    description: "",
    tag: "Personal",
  };
  const [note, setNote] = useState(initstate);

  //! OnChange Handler
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  //! Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        note.title.trim() === "" ||
        note.description.trim() === "" ||
        note.tag.trim() === ""
      ) {
        toast.error("Please Enter Valid Details", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      if (note.title.length < 3) {
        toast.error("Please Enter Valid Title", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      if (note.description.length < 5) {
        toast.error("Please Enter Valid Description", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      addNote(note.title, note.description, note.tag);
      setNote(initstate);
      toast.success("Note Added Successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error + "", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Your Notations</h3>
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
                  Add Note
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
                    ref={titleRef}
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
                    ref={descriptionRef}
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
                    ref={tagRef}
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
                  className="btn btn-outline-dark"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success"
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
