import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import AboutImg from "../assets/aboutImg.svg";
import AboutImg2 from "../assets/AboutImg2.svg";
import { AboutFeatures } from "../components/AboutFeatures";


export const About = () => {
  return (
    <div>
      <Navbar />
      <div className=" relative mr-24 ml-20 h-max mb-24">
        <div className="right-0 top-0 absolute -z-10">
          <img className="w-[669px] h-[669px] rounded-full" src={AboutImg} />
        </div>
        <div className="pt-48 ">
          <h2 className="left-[75px] top-[264px]  text-black text-5xl font-bold mb-12">
            About Us
          </h2>
          <div className="text-white bg-blue-900 text-lg py-10 px-[26px] max-w-[654px] rounded-[45px]">
            We understand that finding the right place to stay can make all the
            difference in creating memorable experiences, and that's why we're
            here to help. With our dedication to providing exceptional service,
            we strive to connect you with the best options that suit your needs,
            preferences, and budget.
          </div>
        </div>
      </div>


      <div className=" relative mr-24 ml-20 h-max py-32 mb-32">
        <div className="left-0 top-0 absolute -z-10">
          <img className="w-[669px] h-[669px] rounded-full" src={AboutImg2} />
        </div>
        <div className="pt-20 ml-auto w-max mr-0">
          <h2 className="left-[75px] top-[264px]  text-black text-5xl font-bold mb-12 text-right">
            Our Mission
          </h2>
          <div className="text-white bg-blue-900 w-max text-lg py-10 px-[26px] max-w-[654px] rounded-[45px]">
            Our mission is to simplify the process of finding local
            accommodations, and service providers and make it a delightful
            experience for you. With our user-friendly platform and dedication
            to exceptional service, we're here to assist you in finding the
            perfect place to call your temporary home.
          </div>
        </div>
      </div>
      <AboutFeatures />
      <Footer />
    </div>
  );
};
