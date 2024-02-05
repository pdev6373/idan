import { DashboardSidebar } from "./DashboardSidebar";
import profileImg from "../assets/profileImg.svg";
import { ListingForm } from "./ListingForm";
import { useAuth } from "../hooks/useAuth";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import { handleSignOut } from "./DashboardMain";
import { EditListingForm } from "./EditListingForm";
import { Header } from ".";

export const EditListing = () => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const path = useLocation().pathname;
  const store = useStore();

  return (
    <div className="flex w-max-screen h-screen overflow-hidden">
      <DashboardSidebar />

      <div className="flex-grow h-screen max-h-screen overflow-y-auto pb-10">
        <Header />

        <h1 className="text-2xl font-bold text-center">Edit Listing</h1>
        <div className="mt-8 overflow-y-auto px-10">
          <ListingForm listingType="edit" />
        </div>
      </div>
    </div>
  );
};
