import React, { useRef, useState } from "react";
import logo from "../assets/Logo.png";
import { BtnTrans } from "./BtnTrans";
import { BtnRoundedPrm } from "./BtnRoundedPrm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useStore } from "../hooks/useStore";
import { handleSignOut } from "./DashboardMain";
import profileImage from "../assets/picshaw.svg";
import pencil from "../assets/pencil.svg";
import editPencil from "../assets/editPencil.svg";
import { Role } from "../context/AuthContext";
import axios from "axios";

export const Navbar: React.FC = () => {
	const [isHovered, setIsHovered] = React.useState<boolean>(false);
	const [isProfileHovered, setIsProfileHovered] =
		React.useState<boolean>(false);
	const store = useStore();
	const auth = store.auth;
	const path = useLocation().pathname;
	const navigate = useNavigate();
	const queryClient = new QueryClient();

	const [modal, setModal] = useState(false);
	const [editFirstName, setEditFirstName] = useState(false);
	const [editLastName, setEditLastName] = useState(false);
	const [editEmail, setEditEmail] = useState(false);
	const [firstName, setFirstName] = useState(store.auth.firstName);
	const [lastName, setLastName] = useState(store.auth.lastName);
	const [email, setEmail] = useState(store.auth.email);
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewImageUrl] = useState<string | null>(null);
	const profileRef = useRef<HTMLInputElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0]; // Get the first selected file
		if (file) {
			const previewUrl = URL.createObjectURL(file); // Create a preview URL for the selected file
			setFile(file); // Set the selected file
			setPreviewImageUrl(previewUrl); // Set the preview URL
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			console.log("first");
			const formData = new FormData();
			formData.append("firstName", firstName);
			formData.append("lastName", lastName);
			formData.append("media", file as Blob);
			formData.append("email", email);
			formData.append(
				"role",
				profileRef.current
					? (profileRef.current?.value as string)
					: (store.auth.role as string)
			);

			const url = `${store.url}/` + "profile/user";

			const headers = {
				Authorization: "Bearer " + store.auth.token,
				"Content-Type": "multipart/form-data",
			};

			const res = await axios.put(url, formData, { headers });
			console.log(res);
		} catch (err: any) {
			console.log(err);
		}
	};

	const handleDropdown = (
		value: Role,
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.stopPropagation();
		if (profileRef.current) {
			profileRef.current.value = value;
		}
		setIsOpen(false);
	};

	const handleProfileClick = () => {
		if (auth.role && auth.role.includes("Provider")) {
			navigate("/dashboard");
		} else {
			setModal(true);
		}
	};
	// console.log(store.auth.user);
	

	return (
    <div
      className={`pr-24 text-base flex items-center justify-between 
       `}
    >
      <img className="w-56 pl-5" src={logo} alt="img" />

      <div className="flex gap-24 transition-all duration-100 ease-in source-sans text-lg">
        <Link to={"/"}>
          <div
            className={`hover:text-primary cursor-pointer trans ${
              path === "/" && "text-primary"
            }`}
          >
            Home
          </div>
        </Link>
        <Link to="/About">
          <div
            className={`hover:text-primary cursor-pointer trans ${
              path === "/About" && "text-primary"
            }`}
          >
            About
          </div>
        </Link>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          <p
            className={`${isHovered && "text-primary"} cursor-pointer trans ${
              path === "/explore/accommodations" && "text-primary"
            } 
          ${path === "/explore/services" && "text-primary"}`}
          >
            Explore
            <svg
              className={`inline-block ml-[2px] trans ${
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
              className={`bg-[#e9eefd]  shadow-md text-center mt-2 w-56 ${
                isHovered ? "block animate-dropdown" : "hidden"
              }`}
            >
              <Link to={"/explore/accommodations"}>
                <p className="cursor-pointer p-2 trans mb-2 hover:bg-[#dfe6fb]">
                  Accommodations
                </p>
              </Link>
              <Link to={"/explore/services"}>
                <p className="cursor-pointer p-2 trans hover:bg-[#dfe6fb] mb-2">
                  Services
                </p>
              </Link>
            </div>
          </div>
        </div>

        <Link to="/Contact">
          <div
            className={`hover:text-primary cursor-pointer trans ${
              path === "/Contact" && "text-primary"
            }`}
          >
            Contact
          </div>
        </Link>
      </div>
      {!store.auth.email ? (
        <div className="flex gap-16 ">
          <Link to="/SignIn">
            <BtnTrans text="Sign In" />
          </Link>

          <Link to="/SignUp">
            <BtnRoundedPrm text="Sign Up" />
          </Link>
        </div>
      ) : (
        <>
          <div className="flex gap-3 justify-end items-center">
            <img
              src={
                store.auth?.user?.UserProfile?.imageUrl[0] ||
                `https://media.istockphoto.com/id/515930999/vector/man-head-silhouette-vector.jpg?s=1024x1024&w=is&k=20&c=EM9-n8coORvu6RBRrWhoyYwYzqzaLesXCmhYtDcYwFA=`
              }
              alt=""
              className="h-10 w-10 bg-black	rounded-[100%]"
            />

            <div
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
              className="relative "
            >
              <p
                className={`${
                  isProfileHovered && "text-primary"
                } cursor-pointer gap-2 flex items-center trans`}
              >
                <h1>
                  {store.auth.firstName} {store.auth.lastName}
                </h1>
                <svg
                  className={` ml-[2px] trans ${
                    isProfileHovered && "translate-y-[2px]"
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

              <div className="absolute right-0 z-10">
                <div
                  className={`bg-[#e9eefd]  shadow-md text-center mt-2 w-40 ${
                    isProfileHovered ? "block animate-dropdown" : "hidden"
                  }`}
                >
                  <p
                    className="cursor-pointer p-2 trans mb-1 hover:bg-[#dfe6fb]"
                    onClick={handleProfileClick}
                  >
                    {auth.role?.includes("Provider") ? "Dashboard" : "Profile"}
                  </p>

                  <p
                    onClick={() => handleSignOut(store)}
                    className="cursor-pointer p-2 trans hover:bg-[#dfe6fb] mb-1"
                  >
                    Sign out
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {modal && (
        <div
          className="fixed left-0  w-screen  h-[200vh]  flex justify-center z-50 items-center bg-[#F3F7FD] bg-opacity-80 overlay-backdrop"
          onClick={() => setModal(false)}
        >
          <div
            className="bg-white px-11 py-10 rounded-[1.25rem] absolute bottom-[250px]"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <div>
              <h2 className="text-[20px] font-semibold my-4">
                Profile Information
              </h2>
              <div>
                <div className="flex justify-between items-center text-[18px]">
                  <div>
                    {editFirstName ? (
                      <div className="flex items-center justify-between p-2 m-2 gap-16">
                        <div className="">
                          <p className="my-3 text-sm font-normal text-[#737272]">
                            First Name
                          </p>
                          <input
                            type="text"
                            defaultValue={store.auth.firstName}
                            className="w-[200px] border outline-none rounded-full border-solid border-light bg-white py-2 px-4"
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>

                        <div className="flex gap-5 flex-grow">
                          <div className="">
                            <p className="my-3 text-sm font-normal text-[#737272]">
                              Last Name
                            </p>
                            <input
                              type="text"
                              defaultValue={store.auth.lastName}
                              className="w-[300px] border outline-none rounded-full border-solid border-light bg-white py-2 px-4"
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between py-2 px-4 m-2 gap-16">
                        <div className="">
                          <p className="my-3 text-sm font-normal text-[#737272]">
                            First Name
                          </p>
                          <p className="my-3 text-md font-medium">
                            {store.auth.firstName}
                          </p>
                        </div>

                        <div className="flex gap-5 flex-grow">
                          <div className="">
                            <p className="my-3 text-sm font-normal text-[#737272]">
                              Last Name
                            </p>
                            <p className="my-3 text-md font-medium">
                              {store.auth.lastName}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between	 py-2 px-4 m-2 gap-16">
                      {editEmail ? (
                        <div className="w-full">
                          <p className="my-3 text-sm font-normal text-[#737272]">
                            Role
                          </p>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOpen(true);
                            }}
                            className={`${
                              isOpen
                                ? "rounded-t-[30px] border-b-0"
                                : "rounded-full"
                            } trans cursor-pointer font-medium dropdown w-full relative  py-2 border outline-none  text-gray border-grey bg-transparent`}
                          >
                            <p className="h-7 px-6">
                              {profileRef.current?.value ||
                                (store.auth.role as string)}
                            </p>

                            <div
                              className={`absolute overflow-hidden z-20 bg-white w-full  border border-grey rounded-b-[30px] border-t-0 ${
                                isOpen
                                  ? "animate-slideDown "
                                  : "animate-slideUp"
                              }`}
                            >
                              <div
                                className="hover:bg-grey cursor-pointer px-6 trans"
                                onClick={(e) => handleDropdown(Role.seeker, e)}
                              >
                                explorer
                              </div>

                              <div
                                className="hover:bg-grey cursor-pointer px-6 trans"
                                onClick={(e) =>
                                  handleDropdown(Role.serviceProvider, e)
                                }
                              >
                                Service Provider
                              </div>

                              <div
                                className="hover:bg-grey cursor-pointer px-6 trans"
                                onClick={(e) =>
                                  handleDropdown(Role.accommodationProvider, e)
                                }
                              >
                                Accommodation Provider
                              </div>
                            </div>

                            <input
                              ref={profileRef}
                              type="hidden"
                              name="profile"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="">
                          <p className="my-3 text-sm font-normal  text-[#737272]">
                            Role
                          </p>
                          <p className="my-3 text-md font-medium truncate  mx-0">
                            {store.auth.role}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between	 py-2 px-4 m-2 gap-16">
                      {/* <div className="w-[15%] m-0"> */}
                      {editEmail ? (
                        <div className="w-[50%]">
                          <p className="my-3 text-sm font-normal text-[#737272]">
                            Email
                          </p>
                          <input
                            type="email"
                            defaultValue={store.auth.email}
                            className="w-[350px] border outline-none rounded-full border-solid border-light bg-white py-2 px-4"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      ) : (
                        <div className="">
                          <p className="my-3 text-sm font-normal  text-[#737272]">
                            Email
                          </p>
                          <p className="my-3 text-m	d font-medium truncate  mx-0">
                            {store.auth.email}
                          </p>
                        </div>
                      )}
                      {/* <div className="">
                        <p className="my-3 text-sm font-normal text-[#737272]">
                          Phone Number
                        </p>
                        <input
                          type="text"
                          defaultValue={store.auth.user.phoneNumber}
                          className="w-[200px] border outline-none rounded-full border-solid border-light bg-white py-2 px-4"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
											</div> */}
											
											

                      {/* </div> */}

                      {!editFirstName ||
                        !editLastName ||
                        (!editEmail && (
                          <div className="flex gap-5 flex-grow w-[50%]">
                            <div className="">
                              <p className="my-3 text-sm font-normal text-[#737272]">
                                Profile Type
                              </p>
                              <p className="my-3 text-md font-medium">
                                {store.auth.role}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="relative cursor-pointer">
                    <img
                      src={
                        previewUrl ||
                        store.auth?.user?.UserProfile?.imageUrl[0] ||
                        "https://media.istockphoto.com/id/515930999/vector/man-head-silhouette-vector.jpg?s=1024x1024&w=is&k=20&c=EM9-n8coORvu6RBRrWhoyYwYzqzaLesXCmhYtDcYwFA="
                      }
                      alt=""
                      className="h-48 w-48 bg-black	rounded-[100%]"
                    />

                    {editFirstName || editLastName || editEmail ? (
                      <label
                        htmlFor="upload"
                        className="absolute top-0 left-0 right-0 bottom-0 flex items-center rounded-full justify-center"
                        style={{ background: "rgba(0, 0, 0, 0.40)" }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          id="upload"
                          onChange={handleImageChange}
                        />
                        <img src={editPencil} alt="Edit" className="" />
                      </label>
                    ) : null}
                  </div>
                </div>
                {editFirstName || editLastName || editEmail ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-primary px-4 py-2 mt-4 rounded-md text-white flex gap-4 items-center"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="bg-primary px-4 py-2 rounded-md text-white flex gap-4 items-center"
                    onClick={() => {
                      setEditFirstName(true);
                      setEditLastName(true);
                      setEditEmail(true);
                    }}
                  >
                    <img src={pencil} alt="" />
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
