import React, { useEffect } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const About = () => {
  //! Understand Basic example of useContext Hook
  const state = useContext(NoteContext);
  const name = state.data.name;
  const title = state.data.title;
  const desc = state.data.desc;

  //! You can Update value using this useEffect
  //TODO: It's Just a small demonstration of updating a state using use context
  // useEffect(() => {
  //   state.update();
  // });
  return (
    <div className="">
      <div className="card shadow p-4 rounded-3">
        <div className="card-body p-4">
          <h2 className="fw-bold display-3">{name}</h2>
          <h4 className="mb-2 text-danger">- {title}</h4>
          <p className="card-text">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
