import { Pencil, Trash2 } from "lucide-react";
import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  debugger;
  const { data, updateNote } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="my-2">
      <div className="card card-style shadow">
        <div className="card-body">
          <div className="wrap-title-icon d-flex justify-content-between">
            <h5 className="card-title">{data.title}</h5>
            <div className="wrap-icon">
              <Trash2
                className="ms-1 cursor-pointer"
                color="#ee5253"
                onClick={() => deleteNote(data._id)}
              />
              <Pencil
                className="ms-1 cursor-pointer"
                color="#222f3e"
                onClick={() => updateNote(data)}
              />
            </div>
          </div>
          <p className="card-text">{data.description}</p>
          <footer className="blockquote-footer mb-0">{data.tag}</footer>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
