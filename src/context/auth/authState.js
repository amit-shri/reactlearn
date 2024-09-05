import authContext from "./authContext";
import { useEffect, useState } from "react";

const AuthState = (props) => {

  let authInitial  = {}
  const [auth, setAuth] = useState(authInitial);

  const checkUserAccess = async () => {
    
    if (localStorage.hasOwnProperty("auth") ) {

      const jsonObject = JSON.parse(localStorage.auth);

      if (jsonObject.token != "" && jsonObject.token != undefined) {

        let headersList = {
          "Accept": "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Authorization": "Bearer " + jsonObject.token
        }

        const response = await fetch("http://studentws.com/api/user/verify" , {
          "method" : "POST",
          "headers" : headersList
        });
        const json = await response.json();

        if (json.status) {

          return {
            "auth" : json,
            "status" : true
          };
        }

      }
    }

    return {
      "auth" : {},
      "status" : false
    };
  };

  

  useEffect(() => {
    // Call checkUserAccess only once when the component mounts
    checkUserAccess().then(result => {
      // console.log(result); // Output: Data fetched successfully
      
      if (result.status) { 
          // authInitial = JSON.parse(localStorage.auth);
          setAuth(JSON.parse(localStorage.auth));
      } 
  
  
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []); // Empty dependency array ensures this runs only once

  // const verifyAccess = checkUserAccess();
  // // console.log(verifyAccess);
  // if (verifyAccess.status) {
  //   authInitial = verifyAccess.auth;
  // }
  // console.log(authInitial);
  // const [auth, setAuth] = useState(authInitial)

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </authContext.Provider>
  )

}
export default AuthState;