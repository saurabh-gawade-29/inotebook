import React, { useState } from "react";
import { serviceCallPost } from "../Helper/Service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //! States
  const [credentials, setCredentials] = useState({ email: "", password: "" });

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
      email: credentials.email,
      password: credentials.password,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const url = `api/auth/login`;
    const res = await serviceCallPost(url, postData, headers);
    //* you will get auth token here
    console.log(res?.data, "You will get auth-token Here");
    //* Need to strore that auth-token in localstorage and resuse by another api call in our context
    let response = res?.data;
    if (response?.success) {
      localStorage.setItem("token", res.data.authToken);
      navigate("/");
      console.log(response.data, "login Success");
    } else {
      alert("Login Failed");
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-sm 12 col-md-5 col-lg-6">
          <h6 className="display-6">Let's Login</h6>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-danger">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
