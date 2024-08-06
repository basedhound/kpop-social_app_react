import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/authAction";
import authReducer from "./../../reducers/authReducer";

const Auth = () => {
   // Redux config
   const dispatch = useDispatch();

   // Auth page, depending on user's status
   const [isSignUp, setIsSignUp] = useState(false);

   // Form data initial state
   const [data, setData] = useState({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
   });

   // Password confirmation, Form values
   const [confirmPass, setConfirmPass] = useState(true);
   const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
   };

   // // V1. (before Redux) Display "Passwords do not match" on submit
   // const handleSubmit = (e) => {
   //    e.preventDefault();
   //    if (isSignUp) {
   //       if (data.password !== data.confirmpassword) {
   //          setConfirmPass(false);
   //       }
   //    }
   // };

   // V2. Display "Passwords do not match" on submit
   const handleSubmit = (e) => {
      e.preventDefault();
      if (isSignUp) {
         data.password === data.confirmpassword
            ? dispatch(signUp(data))
            : setConfirmPass(false);
      } else {
         dispatch(logIn(data));
      }
   };

   // Reset form to initial state when switching Login/Signup
   const resetForm = () => {
      setConfirmPass(true);
      setData({
         firstname: "",
         lastname: "",
         username: "",
         password: "",
         confirmpassword: "",
      });
   };

   // Loading after clicking button
   const loading = useSelector((state) => state.authReducer.loading);
   console.log(loading)

   return (
      <main className="Auth">
         {/* Left side (Logo) */}
         <section className="AuthLeft">
            <img src={Logo} alt="" />
            <div className="Headings">
               <h1>Social Network</h1>
               <h2>Explore ideas throughout the world</h2>
            </div>
         </section>

         {/* Right side (Form) */}
         <section className="AuthRight">
            <form className="SignForm SignContainer" onSubmit={handleSubmit}>
               <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

               {isSignUp && (
                  <div>
                     <input
                        type="text"
                        placeholder="First Name"
                        className="SignInput"
                        name="firstname"
                        onChange={handleChange}
                        value={data.firstname}
                        required
                     />
                     <input
                        type="text"
                        placeholder="Last Name"
                        className="SignInput"
                        name="lastname"
                        onChange={handleChange}
                        value={data.lastname}
                        required
                     />
                  </div>
               )}

               <div>
                  <input
                     type="text"
                     placeholder="Username"
                     className="SignInput"
                     name="username"
                     onChange={handleChange}
                     value={data.username}
                     required
                     lowercase
                  />
               </div>
               <div>
                  <input
                     type="password"
                     placeholder="Password"
                     className="SignInput"
                     name="password"
                     onChange={handleChange}
                     value={data.password}
                     required
                  />
                  {isSignUp && (
                     <input
                        type="password"
                        placeholder="Confirm Password"
                        className="SignInput"
                        name="confirmpassword"
                        onChange={handleChange}
                        value={data.confirmpassword}
                        required
                     />
                  )}
               </div>
               <span
                  style={{
                     display: confirmPass ? "none" : "block",
                     color: "red",
                     fontSize: "14px",
                     alignSelf: "flex-end",
                     marginRight: "5px",
                  }}>
                  * Passwords do not match
               </span>
               <div>
                  <span
                     className="SignAlt"
                     onClick={() => {
                        setIsSignUp((preValue) => !preValue);
                        resetForm();
                     }}>
                     {isSignUp
                        ? "Already have an account ?"
                        : "Don't have an account yet ?"}
                  </span>
               </div>
               <button className="Button Btn--SignForm" type="submit" disabled={loading}>
                  {loading? "Loading.." : isSignUp ? "Sign Up" : "Log In"}
               </button>
            </form>
         </section>
      </main>
   );
};

export default Auth;
