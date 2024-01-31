import React, { useState } from "react";
import { ListingSection } from "../components/ListingSection";
import { Footer } from "../components/Footer";
import next from "../assets/Vector.svg";
import arrowUp from "../assets/arrow-up.svg";
import { Navbar } from "../components/Navbar";

export const ResidentScreen = () => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  return (
    <div>
      <Navbar />
      <div className="px-32 py-8 ">
        <div className="flex justify-between ">
          <div>
            <h1 className="text-black text-3xl font-bold leading-10">
              Available Listing
            </h1>
          </div>
          {/* hvh */}

          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
          >
            <p
              className={`${
                isHovered && "text-primary"
              } cursor-pointer trans      && "text-primary"
            } 
          ${"text-primary"}`}
            >
              <div className="flex items-center gap-4">
                <p className="text-base font-medium leading-5">Sort by</p>
                <div className="flex items-center gap-2 rounded-md border border-[#304FFE] shadow-xs px-1 py-1">
                  <p className=" text-base font-medium leading-5">All</p>
                  <img src={arrowUp} alt="" />
                </div>
              </div>
            </p>

            <div className="absolute right-0">
              <div
                className={`bg-[#ffffff] rounded-lg  shadow-md text-center mt-2 w-56 ${
                  isHovered ? "block animate-dropdown" : "hidden"
                }`}
              >
                <p className="cursor-pointer p-2 trans mb-1 hover:bg-[#dfe6fb]">
                  All
                </p>

                <p className="cursor-pointer p-2 trans mb-1 hover:bg-[#dfe6fb]">
                  Self-contained apartment
                </p>
                <p className="cursor-pointer p-2 trans mb-1 hover:bg-[#dfe6fb]">
                  Hostel
                </p>
                <p className="cursor-pointer p-2 trans mb-1 hover:bg-[#dfe6fb]">
                  Hotel
                </p>
                <p className="cursor-pointer p-2 trans mb-1 hover:bg-[#dfe6fb]">
                  Flat Apartment
                </p>
                <p className="cursor-pointer p-2 trans mb-1 hover:bg-[#dfe6fb]">
                  Short let Apartment
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-3">
          <p className="text-gray-600 font-dm-sans text-base font-light leading-5">
            Discover the perfect acccommodation space that matches your taste.
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <form>
              <input
                type="search"
                placeholder="Search accommodation by location or name"
                className="py-3 px-2 w-[400px] outline-none rounded-md border-none bg-white text-gray-600 text-sm font-normal leading-6 "
              />
            </form>
          </div>
          {/* <div className="flex items-center gap-2">
            <p className="text-base font-medium leading-normal">Next </p>
            <img src={next} alt="" className="ml-1" />
          </div> */}
        </div>
      </div>
      <ListingSection />
      <Footer />
    </div>
  );
};
