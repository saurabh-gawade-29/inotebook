import React, { useEffect } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const About = () => {
  const state = useContext(NoteContext);
  const name = state.data.name;
  const title = state.data.title;
  const desc = state.data.desc;

  //! You can Update value using this useEffect
  // useEffect(() => {
  //   state.update();
  // });
  return (
    <div className="">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <h6 className="card-subtitle mb-2 text-body-secondary">- {title}</h6>
          <p className="card-text">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
