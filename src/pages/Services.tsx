import React from 'react';
import { SkillsSection } from '../components/SkillsSection';
import { Footer } from "../components/Footer";
import next from "../assets/Vector.svg";
import arrowUp from "../assets/arrow-up.svg";
import { Navbar } from '../components/Navbar';

export const ServiceScreen = () => {
  return (
    <>
      <Navbar />
      <div className="px-32 py-8">
        <div className="flex justify-between">
          <div>
            <h1 className="text-black text-3xl font-bold leading-10">
              Skills & Services
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-base font-medium leading-5">Sort by</p>
            <div className="flex items-center gap-2 rounded-md border border-[#304FFE] shadow-xs px-1 py-1">
              <p className=" text-base font-medium leading-5">All</p>
              <img src={arrowUp} alt="" />
            </div>
          </div>
        </div>
        <div className="my-3">
          <p className="text-gray-600 font-dm-sans text-base font-light leading-5">
            Connect with skilled artisans and acquire their services effortlessly.
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <form>
              <input
                type="search"
                placeholder="Search by Service type ,Location or artisan name."
                className="py-3 px-2 w-[400px] outline-none rounded-md border-none bg-white text-gray-600 text-sm font-normal leading-6 "
              />
            </form>
          </div>
     
        </div>
      </div>
      <SkillsSection />
      <Footer />
    </>
  );
}
