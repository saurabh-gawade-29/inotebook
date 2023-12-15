import React, { useContext, useEffect } from "react";
import Noteitem from "./Noteitem";
import NoteContext from "../context/notes/NoteContext";
import Addnote from "./Addnote";

const Home = () => {
  const noteContext = useContext(NoteContext);
  const { notes, getNotes } = noteContext;

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <div>
      <Addnote />
      <div className="your-notes row">
        {notes.map((note, i) => {
          return (
            <div className="col-12 col-sm-12 col-md-4 cold-lg-4" key={i}>
              <Noteitem data={note} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
