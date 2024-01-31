import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/signin-hero-image.png";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { useStore } from "../hooks/useStore";
import { useAuth } from "../hooks/useAuth";
import Cookies from "js-cookie";
import { useUserquery } from "../hooks/useUserquery";

interface Profile {
  brandName: string;
  phoneNumber: string;
  address: string;
  areaOfSpecialization: string;
}

export const Onboarding = () => {
  const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
  const [isStateOpen, setIsStateOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const formDetails = useRef<HTMLInputElement[]>([]);
  const store = useStore();

  const user = store.auth;

  const handleCloseDropdown = () => {
    isCityOpen && setIsCityOpen(false);
    isStateOpen && setIsStateOpen(false);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const formData = {
      brandName: formDetails.current[0]?.value,
      areaOfSpecialization:
        (store.auth.role?.toLowerCase().includes("service") &&
          formDetails.current[1]?.value) ||
        "",
      phoneNumber: formDetails.current[2]?.value,
      address: formDetails.current[3]?.value,
    };

    try {
      console.log(
        store.auth.token,
        store.auth.role?.split(" ")[0].toLocaleLowerCase()
      );
      store.auth.role &&
        (await axios.put(
          `${store.url}/profile/${store.auth.role
            .split(" ")[0]
            .toLocaleLowerCase()}`,
          formData,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${store.auth.token}` },
          }
        ));
      store.auth.role && navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex overflow-hidden relative w-full"
      onClick={handleCloseDropdown}
    >
      <div className="w-1/2 h-screen bg-primary">
        <img
          src={signupImage}
          alt=""
          className="object-contain h-[101%] left-[7%] absolute"
        />
      </div>
      <div className="w-1/2 h-screen bg-white overflow-hidden">
        <div className="w-full flex h-full flex-col justify-center">
          <div className="w-1/2 mx-auto">
            <h1 className="text-3xl font-bold mb-2">
              Welcome, you're almost there!
            </h1>
            <h4 className="mb-5">
              Please fill in your profile details before you continue.
            </h4>
            <form>
              <div className="my-6">
                <label className="block mb-1 text-sm font- text-gray-600">
                  Company or brand name
                </label>
                <input
                  ref={(input) => {
                    if (input) formDetails.current[0] = input;
                  }}
                  type="text"
                  className={`w-full px-6 py-2 border border-grey trans outline-none rounded-full`}
                />
              </div>

              {store.auth.role?.includes("Service") && (
                <div className="my-6">
                  <label className="block mb-1 text-sm font- text-gray-600">
                    Area of Specialization
                  </label>
                  <input
                    type="text"
                    ref={(input) => {
                      if (input) formDetails.current[1] = input;
                    }}
                    className={`w-full px-6 py-2 border border-grey trans outline-none rounded-full`}
                  />
                </div>
              )}
              <div className="my-6">
                <label className="block mb-1 text-sm font- text-gray-600">
                  Phone number
                </label>
                <input
                  ref={(input) => {
                    if (input) formDetails.current[2] = input;
                  }}
                  type="tel"
                  required
                  className={`w-full px-6 py-2 border-grey dm bg-none trans outline-none rounded-full border border-grey-gray`}
                />
              </div>
              <div className="my-6">
                <label
                  htmlFor="company"
                  className="block mb-3 text-sm font- text-gray-600"
                >
                  Company Address
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  ref={(input) => {
                    if (input) formDetails.current[3] = input;
                  }}
                  required
                  className={`w-full px-6 py-2 border border-grey trans outline-none rounded-full`}
                />
              </div>

              <div className="flex my-6 gap-4">
                <section className="w-1/2">
                  <p className="block mb-3 text-sm font- text-gray-600">City</p>
                  <div className=" flex">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseDropdown();
                        setIsCityOpen(true);
                      }}
                      className={`${
                        isCityOpen
                          ? "rounded-t-[30px] border-b-0"
                          : "rounded-full"
                      } trans cursor-pointer font- dropdown w-full relative  py-2 border outline-none  text-gray border-grey bg-transparent`}
                    >
                      <p className="h-7 px-6">{"Ife"}</p>
                      {/* Dropdown */}
                      <div
                        className={`absolute overflow-hidden z-20 bg-white w-full  border border-grey rounded-b-[30px] border-t-0 ${
                          isCityOpen ? "animate-slideDown " : "animate-slideUp"
                        }`}
                      >
                        <div className="hover:bg-grey cursor-pointer px-6 trans">
                          Lagos
                        </div>
                        <div className="hover:bg-grey cursor-pointer px-6 trans">
                          Ife
                        </div>
                        <div className="hover:bg-grey cursor-pointer px-6 trans">
                          Ibadan
                        </div>
                      </div>
                      {/* <input ref={profileRef} type="hidden" name="profile" /> */}
                    </div>
                  </div>
                </section>

                {/* flex 2 w-1/2 */}
                <section className="w-1/2">
                  <p className="block mb-3 text-sm font- text-gray-600">
                    State
                  </p>
                  <div className="flex">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseDropdown();
                        setIsStateOpen(true);
                      }}
                      className={`${
                        isStateOpen
                          ? "rounded-t-[30px] border-b-0"
                          : "rounded-full"
                      } trans cursor-pointer font- dropdown w-full relative  py-2 border outline-none  text-gray border-grey bg-transparent`}
                    >
                      <p className="h-7 px-6">{"Osun"}</p>
                      {/* Dropdown */}
                      <div
                        className={`absolute overflow-hidden z-20 bg-white w-full  border border-grey rounded-b-[30px] border-t-0 ${
                          isStateOpen ? "animate-slideDown " : "animate-slideUp"
                        }`}
                      >
                        <div className="hover:bg-grey cursor-pointer px-6 trans">
                          Lagos
                        </div>
                        <div className="hover:bg-grey cursor-pointer px-6 trans">
                          Osun
                        </div>
                        <div className="hover:bg-grey cursor-pointer px-6 trans">
                          Oyo
                        </div>
                      </div>
                      {/* <input ref={profileRef} type="hidden" name="profile" /> */}
                    </div>
                  </div>
                </section>
              </div>

              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="w-full py-2 px-4 bg-primary text-white rounded-full disabled:bg-disabled btn-trans scale-up disabled:cursor-not-allowed"
              >
                Continue
              </button>

              <Link to="/signin">
                <p className="mx-auto w-max mt-3 cursor-pointer underline text-primary btn-trans scale-up">
                  skip for now
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
