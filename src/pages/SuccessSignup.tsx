import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/signin-hero-image.png";
import image from "../assets/sucesssImage.svg";
import AuthContext, { Auth } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

export const SuccessSignup = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleClick = () => {
    if (role && role.includes("Provider")) navigate("/onboarding");
    else navigate("/signin");
  };
  return (
    <div className="flex overflow-hidden relative w-full">
      <div className="w-1/2 h-screen bg-primary">
        <img
          src={signupImage}
          alt=""
          className="object-contain h-[101%] left-[7%]  absolute items-center flex justify-center"
        />
      </div>
      <div className="w-1/2 h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div>
            <img
              src={image}
              alt=""
              className="flex flex-col justify-center items-center mx-auto"
            />
            <h1 className="text-center text-black text-2xl font-bold leading-normal mt-5">
              Welcome! 🚀
            </h1>
            <p className="text-center text-gray-700  text-base font-normal leading-normal">
              You are ready to discover your perfect stay and services.
            </p>
            <div className="bg-[#0d267d] rounded-3xl  h-11 relative my-5">
              <button
                onClick={handleClick}
                className="text-white text-center absolute left-0 top-[11px] w-[410px] flex items-center justify-center text-base font-medium leading-5"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
