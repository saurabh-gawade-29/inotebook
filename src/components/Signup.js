import React, { useState, createRef, useEffect } from "react";
import { serviceCallPost } from "../Helper/Service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  //! Refs
  const nameRef = createRef(null);
  const emailRef = createRef(null);
  const passwordRef = createRef(null);
  const cpasswordRef = createRef(null);

  //! States
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  //! UseEffect
  useEffect(() => {
    nameRef.current.focus();
    // eslint-disable-next-line
  }, []);

  //! Global Onchange
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  //! We use Use History hook for navigation
  const navigate = useNavigate();

  //! Form Submit
  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    try {
      //? Check for blanks
      if (
        credentials.name.trim() === "" ||
        credentials.email.trim() === "" ||
        credentials.password.trim() === "" ||
        credentials.cpassword.trim() === ""
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

      //? Check for password length
      if (credentials.password.length < 5 || credentials.cpassword.length < 5) {
        toast.error("Your password is too short", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        passwordRef.current.focus();
        return;
      }

      if (credentials.password !== credentials.cpassword) {
        toast.error("Password did not match", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        passwordRef.current.focus();
        return;
      }

      const postData = {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const url = `api/auth/createuser`;
      const res = await serviceCallPost(url, postData, headers);
      let response = res?.data;
      if (response?.success) {
        toast.success("Account Created Successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/login");
      } else {
        toast.success("Please Try Again", {
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
      <div className="row justify-content-center">
        <div className="col-12 col-sm 12 col-md-6 col-lg-6">
          <div className="">
            <div className="display-4 fw-bold">
              Join CelestialScribe Illuminate Your Imagination
            </div>
            <div className="my-2 fs-5">
              Unleash the power of creativity and embark on a celestial journey
              with CelestialScribe. Sign up now to turn your ideas into
              constellations in the cosmic canvas of note-taking.
            </div>
          </div>
        </div>
        <div className="col-12 col-sm 12 col-md-6 col-lg-6">
          <div className="card gBorderRadius p-4 shadow">
            <div className="card-body">
              <h6 className="display-6">Let's Create Your Account</h6>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    value={credentials.name}
                    onChange={onChange}
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    ref={emailRef}
                    value={credentials.email}
                    onChange={onChange}
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    ref={passwordRef}
                    value={credentials.password}
                    onChange={onChange}
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    ref={cpasswordRef}
                    value={credentials.cpassword}
                    onChange={onChange}
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-outline-dark">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
