import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import GLoader from "./components/GLoader";
import Login from "./components/Login";
import Signup from "./components/Signup";
//! Toastify css import
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <div className="container my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <ToastContainer />
        <GLoader />
      </NoteState>
    </>
  );
}

export default App;
