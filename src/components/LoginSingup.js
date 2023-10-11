import React, { useState } from "react";

import user_icon from "../assets/person.png";
import user_password from "../assets/password.png";
import user_email from "../assets/email.png";

const LoginSingup = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="flex flex-col m-auto mt-5 bg-slate-200 pb-7 w-[37.50%]">
      <div className="flex flex-col items-center gap-2 w-[100%] mt-7">
        <div className="text-gray-500 font-bold">{action}</div>
        <div className="w-16 h-2 bg-slate-100 rounded-sm"></div>
      </div>
      <div className="mt-14 flex flex-col gap-6">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="flex items-center m-auto w-96 h-20 bg-slate-300 rounded-md">
            <img className="mt-0 mb-0 ml-7 mr-7" src={user_icon} alt="" />
            <input
              className="h-12 w-96 bg-transparent border-none outline-none bg-slate-300 "
              type="text"
              placeholder="Name"
            />
          </div>
        )}

        <div className="flex items-center m-auto w-96 h-20 bg-slate-300 rounded-md">
          <img className="mt-0 mb-0 ml-7 mr-7" src={user_email} alt="" />
          <input
            className="h-12 w-96 bg-transparent border-none outline-none bg-slate-300 "
            type="email"
            placeholder="Email Id"
          />
        </div>
        <div className="flex items-center m-auto w-96 h-20 bg-slate-300 rounded-md">
          <img className="mt-0 mb-0 ml-7 mr-7" src={user_password} alt="" />
          <input
            className="h-12 w-96 bg-transparent border-none outline-none bg-slate-300 "
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      {action === "Sign Up" ? <div></div> : <div className="pl-[10%] mt-7">
        Lost Password?
        <span className="text-cyan-400 cursor-pointer">Click Here!</span>
      </div>}
      
      <div className="flex gap-7 mt-5 mb-5 ml-auto mr-auto">
        {action === "Login" ? (
          <div
            className="flex justify-center items-center w-52 h-16 bg-slate-500 rounded-md font-medium cursor-pointer"
            onClick={() => {
              setAction("Sign Up");
            }}
          >
            Sign Up
          </div>
        ) : (
          <div
            className="flex justify-center items-center w-52 h-16 bg-blue-300 rounded-md font-medium cursor-pointer"
            onClick={() => {
              setAction("Sign Up");
            }}
          >
            Sign Up
          </div>
        )}
        {action === "Sign Up" ? (
          <div
            className="flex justify-center items-center w-52 h-16 bg-slate-500 rounded-md font-medium cursor-pointer"
            onClick={() => {
              setAction("Login");
            }}
          >
            Login
          </div>
        ) : (
          <div
            className="flex justify-center items-center w-52 h-16 bg-blue-300 rounded-md font-medium cursor-pointer"
            onClick={() => {
              setAction("Login");
            }}
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSingup;
