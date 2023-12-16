import React, { useState } from "react";
import { serviceCallPost } from "../Helper/Service";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  //! States
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
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
    //* you will get auth token here
    console.log(res?.data, "You will get auth-token Here");
    //* Need to strore that auth-token in localstorage and resuse by another api call in our context
    let response = res?.data;
    if (response?.success) {
      // localStorage.setItem("token", res.data.authToken);
      navigate("/login");
      console.log(response.data, "login Success");
    } else {
      alert("Login Failed");
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
                    Confrim Password
                  </label>
                  <input
                    value={credentials.Cpassword}
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
