import { useState } from "react";
import React from "react";
import {  useNavigate } from "react-router-dom";

const SignUp = (props) => {

  let declareForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    agree_condition: "",
  };

  const [signupForm, setsignupForm] = useState(declareForm);
  const [signupFormError, setsignupFormError] = useState(declareForm);

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    errors.firstname = (signupForm.firstname.trim() == "" ? "Please enter first name." : "");
    errors.lastname = (signupForm.lastname.trim() == "" ? "Please enter last name." : "");
    errors.email = (signupForm.email.trim() == "" ? "Please enter email." : "");
    errors.password = (signupForm.password.trim() == "" ? "Please enter password." : "");
    errors.agree_condition = (signupForm.agree_condition.trim() == "" ? "Check the checkbox to accept the term and condition." : "");
    return errors;
  }


  const handleSubmit = async (e) => {

    e.preventDefault();
    const errors = validateForm();
    setsignupFormError(errors);
    let errorFlag = false;
    for (const key in errors) {
      if (errors.hasOwnProperty(key) && errors[key]!= "") {
        errorFlag = true;
      }
    }

    if (errorFlag) {
      return false;
    }

    const response = await fetch("http://studentws.com/api/user/register", {
      method: "POST",
      headers: {        
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupForm),
    });

    const json = await response.json();
    let msg = json.msg;

    if (json.status) {
      if (msg == "") {
        msg = "User is registered successfully.";
      }
      props.appendAlert(msg, 'success'); 
      setsignupForm(declareForm);
      
      navigate('/login');
    } else {
      if (msg == "") {
        msg = "Unable to register the user.";
      }
      // console.log(msg);
      props.appendAlert(msg, 'warning');
    }
  };

  const onChange = (e) => {
    setsignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const onChangeCheckbox = (e) => {
    if (e.target.checked) {
      setsignupForm({ ...signupForm, [e.target.name]: e.target.value });
    } else {
      setsignupForm({ ...signupForm, [e.target.name]: "" });
    }
  };

  return (
    <>
      <div className="row">
        <h2>Sign Up</h2>
      </div>
      <div className="row container d-flex align-items-center justify-content-center">
        <div className="col-md-6 ">
          <form onSubmit={handleSubmit} className="my-3">
            <div className="form-group my-2">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                placeholder="Enter firstname"
                onChange={onChange}
                value={signupForm.firstname}
              />
              {signupFormError.firstname && <span className="error-required"> {signupFormError.firstname} </span>}
            </div>

            <div className="form-group my-2">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Enter lastname"
                onChange={onChange}
                value={signupForm.lastname}
              />
              {signupFormError.lastname && <span className="error-required"> {signupFormError.lastname}</span>}
            </div>

            <div className="form-group my-2">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                onChange={onChange}
                value={signupForm.email}
              />
              {signupFormError.email && <span className="error-required"> {signupFormError.email}</span>}
            </div>

            <div className="form-group my-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
                value={signupForm.password}
              />
              {signupFormError.password && <span className="error-required">{signupFormError.password}</span>}
            </div>

            <div className="form-group form-check my-2">
              <input
                type="checkbox"
                className="form-check-input"
                name="agree_condition"
                id="agree_condition"
                value="1"
                onChange={onChangeCheckbox}
                checked={signupForm.agree_condition != ""}
              />
              <label className="form-check-label" htmlFor="agree_condition">
                Agree to terms and conditions
              </label>
              
              {signupFormError.agree_condition && <><br/><span style={{'marginLeft':'-1.5em'}} className="error-required">{signupFormError.agree_condition}</span></>}
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
