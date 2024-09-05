import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../context/auth/authContext"

const Logout = () => {

  const navigate = useNavigate();    
  const context = useContext(authContext);

  useEffect(() => {

    localStorage.removeItem("auth");
    
    context.setAuth({});
    navigate("/");
  }, []);

  return (
    <>
      {/* I am logout page. */}
    </>
  );
};

export default Logout;