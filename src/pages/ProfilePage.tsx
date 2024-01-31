import React, { useEffect, useState } from "react";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { useUserquery } from "../hooks/useUserquery";
import { useStore } from "../hooks/useStore";
import pencil from "../assets/pencil.svg";
import upload from "../assets/upload.svg";

import { Link, useLocation } from "react-router-dom";
import { Header } from "../components";

export const ProfilePage = () => {
  useUserquery();
  const store = useStore();
  const [user, setUser] = useState<any>({});
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const showOverlay = () => setOverlayVisible(true);

  const hideOverlay = (e: any) => {
    if (isOverlayVisible && e.target.classList.contains("overlay-backdrop"))
      setOverlayVisible(false);
  };

  useEffect(() => {
    store.auth?.user?.ServiceProfile && setUser(store.auth.user.ServiceProfile);
    store.auth?.user?.AccommodationProfile &&
      setUser(store.auth.user.AccommodationProfile);
  }, [store]);

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />

      <div className="flex-grow h-screen max-h-screen overflow-y-auto pb-10">
        <Header />

        <h1 className="text-2xl font-bold text-center">Profile</h1>

        <div className="mt-8 overflow-y-auto px-10">
          <div className="flex items-center">
            <img
              src="https://media.istockphoto.com/id/515930999/vector/man-head-silhouette-vector.jpg?s=1024x1024&w=is&k=20&c=EM9-n8coORvu6RBRrWhoyYwYzqzaLesXCmhYtDcYwFA="
              alt=""
              className="h-10 w-10 bg-black cursor-pointer rounded-[100%]"
              onClick={showOverlay}
            />

            <div className="ml-4">
              <h1 className="text-lg font-bold">
                {store.auth.firstName} {store.auth.lastName}
              </h1>
              <h1 className="text-base font-bold text-[#797979]">
                {store.auth?.brandName}
              </h1>
            </div>
          </div>
          <section className="px-11 py-11 mt-6 rounded-[20px] border-2 border-[#DEDBDB]">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Profile Information</h1>

              <Link to="/dashboard/editProfile">
                <button className="bg-[#0D267D] px-6 py-2 rounded-[10px] text-white flex gap-3 items-center">
                  <img src={pencil} alt="" />
                  <p className="text-[17px] font-bold">Edit</p>
                </button>
              </Link>
            </div>

            <div className="flex justify-between items-center mt-9 w-full">
              <div className="w-1/2">
                <h1 className="text-lg font-semibold text-[#797979] mb-1">
                  First name
                </h1>
                <h1 className="text-lg font-bold">{store.auth.firstName}</h1>
              </div>

              <div className="w-1/2">
                <h1 className="text-lg font-semibold text-[#797979] mb-1">
                  Last name
                </h1>
                <h1 className="text-lg font-bold">{store.auth.lastName}</h1>
              </div>
            </div>

            {/* section b */}
            <div className="flex justify-between items-center mt-9 w-full">
              <div className="w-1/2">
                <h1 className="text-lg font-semibold text-[#797979] mb-1">
                  Email Address
                </h1>
                <h1 className="text-lg font-bold">{store.auth?.email}</h1>
              </div>

              <div className="w-1/2">
                <h1 className="text-lg font-semibold text-[#797979] mb-1">
                  Phone Number
                </h1>
                <h1 className="text-lg font-bold">{store.auth?.phoneNumber}</h1>
              </div>
            </div>
            {/* section c */}
            <div className="flex justify-between items-center mt-9 w-full">
              <div className="w-1/2">
                <h1 className="text-lg font-semibold text-[#797979] mb-1">
                  Company/Brand name
                </h1>
                <h1 className="text-lg font-bold">{store.auth?.brandName}</h1>
              </div>
              <div className="w-1/2">
                <h1 className="text-lg font-semibold text-[#797979] mb-1">
                  Company Address
                </h1>
                <h1 className="text-lg font-bold">{store.auth?.address}</h1>
              </div>
            </div>
          </section>
        </div>
      </div>

      {isOverlayVisible && (
        <div
          className="fixed inset-0 w-full h-full flex justify-center items-center bg-[#F3F7FD] bg-opacity-80 overlay-backdrop cursor-pointer z-50"
          onClick={hideOverlay}
        >
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-sm font-semibold my-4 text-center">
              Upload Profile Image
            </h2>
            <div className="flex gap-8 items-center">
              <img
                src="https://media.istockphoto.com/id/515930999/vector/man-head-silhouette-vector.jpg?s=1024x1024&w=is&k=20&c=EM9-n8coORvu6RBRrWhoyYwYzqzaLesXCmhYtDcYwFA="
                alt=""
                className="w-[200px] h-[200px] rounded-full mx-auto"
              />
              <div>
                <div className="bg-[#E6E9FF] w-[460px] h-[165px] rounded-lg flex justify-center items-center flex-col">
                  <img src={upload} alt="" />
                  <p className="text-sm font-medium">
                    Drag or{" "}
                    <span className="text-[#0D267D] underline">upload</span>{" "}
                    Image
                  </p>
                </div>
              </div>{" "}
            </div>
            <p className="w-[460px] text-xs mt-2 font-normal float-right">
              *Dimension of image uploaded must not be less than 200 by 200
              pixels. Size of image uploaded must not exceed 10 MB. Only .jpg
              images can be uploaded, any other format is unsupported.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
