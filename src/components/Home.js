import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Noteitem from "./Noteitem";
import NoteContext from "../context/notes/NoteContext";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  //! Refs
  const etitleRef = createRef(null);
  const edescriptionRef = createRef(null);
  const etagRef = createRef(null);

  //! Open And Close Modal - Refs
  const modalRef = useRef(null);
  const closeRef = useRef(null);

  //! We Can use Context instead of this state
  let initstate = {
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  };
  const [note, setNote] = useState(initstate);

  //! Context
  const noteContext = useContext(NoteContext);
  const { notes, getNotes, editNote } = noteContext;

  //! Use Navigate hook redirection
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

  //! Open Modal
  const updateNote = (currentNote) => {
    debugger;
    modalRef.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    // setTimeout(() => {
    //   etitleRef && etitleRef.current.focus();
    // }, 1000);
  };

  //! on Chnage Handler
  const onChange = (e) => {
    debugger;
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  //! Submit Form
  const handleSubmit = (e) => {
    try {
      if (
        note.etitle.trim() === "" ||
        note.edescription.trim() === "" ||
        note.etag.trim() === ""
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

      if (note.etitle.length < 3) {
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

      if (note.edescription.length < 5) {
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

      editNote(note.id, note.etitle, note.edescription, note.etag);
      closeRef.current.click();
      toast.success("Note Updated Successfully", {
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
    <div>
      {/* Add Note Section */}
      <Addnote />
      {/* Fetch All Note Section */}
      <div className="your-notes row">
        <div className="p">
          {notes.length === 0 &&
            "No Notes To Display - Add new Note using above Add Note Button"}
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
                Edit Note
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
                  ref={etitleRef}
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
                  ref={edescriptionRef}
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
                  ref={etagRef}
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
