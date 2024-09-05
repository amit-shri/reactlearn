import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import authContext from "../context/auth/authContext"

const Login = (props) => {

  let declareForm = {
    "email" : "",
    "password" : ""
  };
  
  const [loginForm, setloginForm] = useState(declareForm);  
  const [loginFormError, setloginFormError] = useState(declareForm);  
  const navigate = useNavigate();
  const context = useContext(authContext);

  const validateForm = () => {
    const errors = {};

    errors.email = (loginForm.email.trim() == "" ? "Please enter email address." : "");
    errors.password = (loginForm.password.trim() == "" ? "Please enter password." : "");
    return errors;
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    const errors = validateForm();
    setloginFormError(errors);
    let errorFlag = false;
    for (const key in errors) {
      if (errors.hasOwnProperty(key) && errors[key]!= "") {
        errorFlag = true;
      }
    }

    if (errorFlag) {
      return false;
    }

    const response = await fetch("http://studentws.com/api/user/login" , {
      "method": "POST",
      headers: {        
        "Content-Type": "application/json",
      },
      "body": JSON.stringify(loginForm)
    });

    const json = await response.json();

    if (json.status) {

      let authObj = {
        "token":json.token, 
        "firstname": json.firstname
      };

      localStorage.setItem("auth", JSON.stringify(authObj) );
      navigate('/');

      // const { auth } = context;

      context.setAuth(authObj);

    }
    else {
      props.appendAlert(json.msg, 'warning');
    }

  }

  const onChange = (e) => {
    setloginForm({ ...loginForm, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="row">
        <h2>Login</h2>
      </div>
      <div className="row container d-flex align-items-center justify-content-center">
        <div className="col-md-6 ">
        <form  onSubmit={handleSubmit} className="my-3">
          {/* <!-- Email input --> */}
          <div data-mdb-input-init className="form-group my-2">
            <label className="form-label" htmlFor="emailaddress">
              Email address
            </label><input type="email" id="email"  name="email"  className="form-control" onChange={onChange} />
            {loginFormError.email && <span className="error-required"> {loginFormError.email}</span>}
          </div>

          {/* <!-- Password input --> */}
          <div data-mdb-input-init className="form-group my-2">
            <label className="form-label" htmlFor="password">
              Password
            </label><input type="password"  id="password" name="password" className="form-control" onChange={onChange}  />
            {loginFormError.password && <span className="error-required"> {loginFormError.password}</span>}
          </div>

          {/* <!-- Submit button --> */}
          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-block mb-4"
          >
            Sign in
          </button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Login;
