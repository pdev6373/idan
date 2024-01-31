import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import { handleSignOut } from "./DashboardMain";

export default function Header() {
  const store = useStore();
  const path = useLocation().pathname;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-end sticky top-0 z-40 pt-10 pb-5 mb-3 px-10 bg-[#F3F7FD]">
      <div className="flex gap-2.5 justify-end items-center">
        <img
          src="https://media.istockphoto.com/id/515930999/vector/man-head-silhouette-vector.jpg?s=1024x1024&w=is&k=20&c=EM9-n8coORvu6RBRrWhoyYwYzqzaLesXCmhYtDcYwFA="
          alt=""
          className="h-9 w-9 bg-black	rounded-[100%]"
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
              className={` ml-[2px] trans ${isHovered && "translate-y-[2px]"}`}
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
              className={`bg-[#A6B9FF29]  shadow-md text-center mt-2 w-40 ${
                isHovered ? "block animate-dropdown" : "hidden"
              }`}
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
  );
}
