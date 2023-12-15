import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import GLoader from "./components/GLoader";

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert />
        <div className="container my-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <GLoader />
      </NoteState>
    </>
  );
}

export default App;
