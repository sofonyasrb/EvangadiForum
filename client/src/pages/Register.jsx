import React from 'react'
import {useRef} from "react"
import axios from "../utilitis/AxiosConfig"

function Register() {

  const userNameDom=useRef(null)
   const firstnameDom = useRef(null);
    const lastnameDom = useRef(null);
     const emailDom = useRef(null);
      const passwordDom = useRef(null);

  async function handlesubmit(e){
    e.preventDefault()
     const usernamevalue= userNameDom.current.value
      const firstvalue=firstnameDom.current.value 
     const secondvalue=lastnameDom.current.value 
      const emailvalue= emailDom.current.value 
     const passwordvalue = passwordDom.current.value; 
     if (
      !usernamevalue || !firstvalue||!secondvalue||!emailvalue||!passwordvalue
    ){
      alert("please provide all the required information")
      return;
    }
       try {
         await axios.post("/users/register", {
           username: "usernamevalue",
           firstname: "firstvalue",
           lastname: "secondvalue",
           email: "emailvalue",
           password: "passwordvalue",
         });
          alert("successfully register please log in ");
       
       } catch (error) {
         console.log(error);
       }
  }
  return (
    <>
      <section>
        <form onSubmit={handlesubmit}>
          <span>Username:-</span>

          <input
            ref={userNameDom}
            type="text"
            id="username"
            name="username"
            placeholder="user name"
          />
          <br />
          <br />

          <span>First Name:-</span>

          <input
            ref={firstnameDom}
            type="text"
            id="firstname"
            name="firstname"
            placeholder="first name"
          />
          <br />
          <br />

          <span>Last Name:-</span>

          <input
            ref={lastnameDom}
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last name"
          />
          <br />
          <br />
          <span>Email:-</span>

          <input
            ref={emailDom}
            type="text"
            id="Email"
            name="Email"
            placeholder="Email"
          />
          <br />
          <br />
          <span>Password:-</span>

          <input
            ref={passwordDom}
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
          <br />
          <br />

          <button type="submit">Register</button>
        </form>
      </section>
    </>
  );
}

export default Register