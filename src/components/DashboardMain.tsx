import React, { useContext, useEffect } from "react";
import { DashboardStat } from "./DashboardStat";
import AuthContext from "../context/AuthContext";
import { BtnRoundedPrm } from "./BtnRoundedPrm";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export const DashboardMain = () => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const path = useLocation().pathname;
  const store = useContext(AuthContext);
  const auth = store.auth;

  useEffect(() => {
    console.log(store.auth);
  }, [auth]);

  return (
    <div className="flex flex-col p-10 py-14 w-full">
      <div className="flex  items-start justify-between">
        <div className="flex gap-6 items-center">
          <img
            src="https://media.istockphoto.com/id/515930999/vector/man-head-silhouette-vector.jpg?s=1024x1024&w=is&k=20&c=EM9-n8coORvu6RBRrWhoyYwYzqzaLesXCmhYtDcYwFA="
            alt=""
            className="h-14 w-14 bg-black	rounded-[100%]"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold ">
              Welcome Back, {store.auth.firstName}!
            </h1>
            <p className="text-lg font-light text-gray">
              Here’s what’s happening within your dashboard.
            </p>
          </div>
        </div>

        <div className="flex gap-8 pl-14">
          <Link to={"/explore/accommodations"}>
            <BtnRoundedPrm text="Explore" />
          </Link>

          <div className="flex gap-3 items-center">
            <img
              src="https://media.istockphoto.com/id/515930999/vector/man-head-silhouette-vector.jpg?s=1024x1024&w=is&k=20&c=EM9-n8coORvu6RBRrWhoyYwYzqzaLesXCmhYtDcYwFA="
              alt=""
              className="h-10 w-10 bg-black	rounded-[100%]"
            />

            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative "
            >
              <p
                className={`${
                  isHovered && "text-primary"
                } cursor-pointer gap-2 flex items-center trans ${
                  path === "/" && "text-primary"
                } 
                  ${path === "/" && "text-primary"}`}
              >
                <h1>
                  {store.auth.firstName} {store.auth.lastName}
                </h1>
                <svg
                  className={` ml-[2px] trans ${
                    isHovered && "translate-y-[2px]"
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Iconly/Light/Arrow - Down 2">
                    <g id="Arrow - Down 2">
                      <path
                        id="Stroke 1"
                        d="M12.6666 5.66669L7.99992 10.3334L3.33325 5.66669"
                        stroke={isHovered ? "#0D267D" : "#000"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                </svg>
              </p>

              <div className="absolute right-0">
                <div
                  className={`bg-[#90a4ee5d]  shadow-md text-center mt-2 w-40 ${
                    isHovered ? "block animate-dropdown" : "hidden"
                  } rounded-lg overflow-hidden`}
                >
                  <Link to={"/dashboard/profile"}>
                    <p className="cursor-pointer p-2 trans mb-1 hover:bg-[#95A8EE29]">
                      Profile
                    </p>
                  </Link>

                  <p
                    onClick={() => handleSignOut(store)}
                    className="cursor-pointer p-2 trans hover:bg-[#95A8EE29] mb-1"
                  >
                    Sign out
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DashboardStat />
    </div>
  );
};

export const handleSignOut = (store: any) => {
  Cookies.remove("user");
  store.setAuth({
    email: "",
    firstName: "",
    lastName: "",
    token: "",
  });
  window.location.href = "/";
};
