import React from "react";
import locationImg from "../assets/whiteLocay.svg";
import ratingImg from "../assets/whiteStar.svg";
import { DetailsBtn } from "./DetailsBtn";
import { Link } from "react-router-dom";

interface Props {
  img: string;
  name: string;
  location: string;
  price: string;
  id: number;
  rating: string;
}

export const ListingCard = ({
  img,
  name,
  location,
  price,
  id,
  rating,
}: Props) => {
  return (
    <div className="relative rounded-[2rem] w-max border shadow-lg border-background p-[0.75rem] bg-[#EBEFFE]">
      <div className="h-[523px] w-[351px]  relative">
        <img
          src={img}
          alt=""
          className="object-cover h-full w-full bg-cover bg-center rounded-[1.25rem]"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-4 rounded-[1.25rem] bg-black bg-opacity-50 text-white">
          <div className="flex justify-between items-center">
            <h1 className=" text-xl font-medium leading-4 mb-3">{name}</h1>
            {/* <div className="flex items-center gap-1 mb-2">
              <img src={ratingImg} alt="" />
              <p className=" text-lg font-bold leading-3 tracking-tighter">
                {5.0}
              </p>
            </div>{" "} */}
          </div>
          {/* <p className="text-gray-900 text-base font-normal leading-relaxed mb-2">
            {price}
          </p> */}
          <div className="flex items-center gap-1 mb-4">
            <img src={locationImg} alt="" />
            <p className=" text-base font-normal leading-5 capitalize">
              {location}
            </p>
          </div>
          <Link to={`/accommodation/${id}`}>
            <DetailsBtn text="See Details" />
          </Link>
        </div>
      </div>
    </div>
  );
};
