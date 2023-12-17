import React, { createRef, useEffect, useState } from "react";
import { serviceCallPost } from "../Helper/Service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  //! Refs
  const emailRef = createRef(null);
  const passwordRef = createRef(null);

  //! States
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  //! UseEffect
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  });

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
    //? Check for blanks
    if (credentials.email.trim() === "" || credentials.password.trim() === "") {
      toast.error("Please Enter Valid Credentials", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      emailRef.current.focus();
      return;
    }

    //? Check for password length
    if (credentials.password.length < 5) {
      toast.error("Your password is too short", {
        position: "top-center",
        autoClose: 5000,
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

    try {
      const postData = {
        email: credentials.email,
        password: credentials.password,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const url = `api/auth/login`;
      const res = await serviceCallPost(url, postData, headers);
      //* Need to strore that auth-token in localstorage and resuse by another api call in our context
      let response = await res?.data;
      if (response?.success) {
        toast.success("Welcome to CelestialScribe", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("token", res.data.authToken);
        navigate("/");
      } else {
        toast.error("Please Enter Valid Credentials", {
          position: "top-center",
          autoClose: 5000,
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
        position: "top-right",
        autoClose: 5000,
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
      <div className="row">
        <div className="col-12 col-sm 12 col-md-6 col-lg-6">
          <div className="">
            <div className="display-4 fw-bold">
              Welcome back to CelestialScribe
            </div>
            <div className="my-2 fs-5">
              Unlock the celestial wonders that await you! Log in to your
              CelestialScribe account and embark on a journey where your
              thoughts become constellations in the vast universe of creativity.
            </div>
          </div>
        </div>
        <div className="col-12 col-sm 12 col-md-6 col-lg-6">
          <div className="card gBorderRadius p-4 shadow">
            <div className="card-body">
              <h6 className="display-6">Let's Login</h6>
              <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-outline-dark log-btn">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

//? Check for Email - Currently using browser email Validations
// Regular expression for basic email validation
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const isValidEmail = emailRegex.test(credentials.email);
// if (credentials.email.length < 5) {
//   toast.error("Please Enter Valid Email", {
//     position: "top-center",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
//   return;
// }
