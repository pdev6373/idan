import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import { handleSignOut } from "./DashboardMain";

export const DashboardSidebar = () => {
  const location = useLocation();

  const isLinkActive = (pathname: string) => {
    return location.pathname === pathname;
  };

  //  active state class
  const activeClass = "bg-primary text-white";

  return (
    <>
      <div className="flex flex-col gap-9 max-h-screen h-screen overflow-hidden border-r-[#54545430] border-r items-center flex-shrink-0 min-w-[240px]">
        <Link to="/" className="-ml-11">
          <img src={logo} alt="logo" className="w-52" />
        </Link>

        <ul className="flex flex-col gap-7 w-full px-6">
          <Link to="/dashboard">
            <li
              className={`flex gap-4 w-full rounded-[0.65rem] ${
                isLinkActive("/DashboardHome") || isLinkActive("/dashboard")
                  ? activeClass
                  : ""
              } py-3 px-4 items-center`}
            >
              <div className="shrink-0 flex items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1232_4399)">
                    <path
                      d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
                      fill={
                        isLinkActive("/DashboardHome") ||
                        isLinkActive("/dashboard")
                          ? "white"
                          : "black"
                      }
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1232_4399">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <p
                className={`text-center text-lg font-medium ${
                  isLinkActive("/DashboardHome") || isLinkActive("/dashboard")
                    ? activeClass
                    : ""
                }`}
              >
                Home
              </p>
            </li>
          </Link>

          <Link to="/dashboard/add-listing">
            <li
              className={`flex gap-4 w-full rounded-[0.65rem] ${
                isLinkActive("/dashboard/add-listing") ? activeClass : ""
              } py-3 px-4 items-center`}
            >
              <div className="shrink-0 flex justify-center items-center mt-[3px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z"
                    fill={
                      isLinkActive("/dashboard/add-listing") ? "white" : "black"
                    }
                  />
                </svg>
              </div>

              <p
                className={`text-center text-lg font-medium ${
                  isLinkActive("/dashboard/add-listing") ? activeClass : ""
                } shrink-0`}
              >
                Add Listing
              </p>
            </li>
          </Link>

          <Link to="/dashboard/listings">
            <li
              className={`flex gap-4 w-full items-center rounded-[0.65rem] ${
                isLinkActive("/dashboard/listings") ? activeClass : ""
              } py-3 px-4`}
            >
              <div className="shrink-0 flex justify-center items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1232_4412)">
                    <path
                      d="M4 14H8V10H4V14ZM4 19H8V15H4V19ZM4 9H8V5H4V9ZM9 14H21V10H9V14ZM9 19H21V15H9V19ZM9 5V9H21V5H9Z"
                      fill={
                        isLinkActive("/dashboard/listings") ? "white" : "black"
                      }
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1232_4412">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <p
                className={`text-center text-lg font-medium ${
                  isLinkActive("/dashboard/listings") ? activeClass : ""
                }`}
              >
                Listings
              </p>
            </li>
          </Link>

          <Link to="/dashboard/profile">
            <li
              className={`flex gap-3 w-full items-center rounded-[0.65rem] ${
                isLinkActive("/dashboard/profile") ||
                isLinkActive("/dashboard/editProfile")
                  ? activeClass
                  : ""
              } py-3 px-4`}
            >
              <div className="shrink-0 flex justify-center items-center">
                <svg
                  width="29"
                  height="24"
                  className="pl-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                    fill={
                      isLinkActive("/dashboard/profile") ||
                      isLinkActive("/dashboard/editProfile")
                        ? "white"
                        : "black"
                    }
                  />
                  <path
                    d="M16 15.5C16 17.9853 16 20 8 20C0 20 0 17.9853 0 15.5C0 13.0147 3.58172 11 8 11C12.4183 11 16 13.0147 16 15.5Z"
                    fill={
                      isLinkActive("/dashboard/profile") ||
                      isLinkActive("/dashboard/editProfile")
                        ? "white"
                        : "black"
                    }
                  />
                </svg>
              </div>

              <p
                className={`text-center text-lg font-medium ${
                  isLinkActive("/dashboard/profile") ||
                  isLinkActive("/dashboard/editProfile")
                    ? activeClass
                    : ""
                }`}
              >
                Profile
              </p>
            </li>
          </Link>
        </ul>

        <div className="flex flex-grow w-full items-end px-8 mb-8">
          <div
            className="text cursor-pointer text-xl font-medium flex gap-4 items-center justify-start"
            onClick={handleSignOut}
          >
            <svg
              width="22"
              height="24"
              viewBox="0 0 27 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 5.33333L18.12 7.21333L21.56 10.6667H8V13.3333H21.56L18.12 16.7733L20 18.6667L26.6667 12L20 5.33333ZM2.66667 2.66667H13.3333V0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H13.3333V21.3333H2.66667V2.66667Z"
                fill="black"
              />
            </svg>

            <p className="text-center text-lg font-medium">Sign Out</p>
          </div>
        </div>
      </div>
    </>
  );
};
