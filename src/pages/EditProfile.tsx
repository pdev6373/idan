import React, { useContext } from "react";
import { DashboardSidebar } from "../components/DashboardSidebar";
import profileImg from "../assets/profileImg.svg";
import { EditProfileForm } from "../components/EditProfileForm";
import AuthContext from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components";

export const EditProfile = () => {
  const auth = useAuth();

  return (
    <div className="flex w-max-screen h-screen overflow-hidden">
      <DashboardSidebar />

      <div className="flex-grow h-screen max-h-screen overflow-y-auto pb-10">
        <Header />

        <h1 className="text-2xl font-bold text-center">Edit Profile</h1>
        <div className="mt-8 overflow-y-auto px-10">
          <EditProfileForm />
        </div>
      </div>
    </div>
  );
};
