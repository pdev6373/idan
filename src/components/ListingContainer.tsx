import React, { useEffect, useState } from "react";
import ListedImage from "../assets/listedHostel.svg";
import { ListingComponent } from "./ListingComponent";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../hooks/useStore";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserquery } from "../hooks/useUserquery";
import spinner from "../assets/spinner.svg";

export const ListingContainer = () => {
  //   const [services, setServices] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const store = useStore();
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  useUserquery();

  //   useEffect(() => {
  //     setServices(store.auth.user?.ServiceDetails);
  //     setAccommodations(store.auth.user?.AccommodationDetails);
  //   }, [store.auth]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${store.url}/accomodation_provider/listings/filter`,
          { headers: { Authorization: "Bearer " + store.auth.token } }
        );

        setAccommodations(res?.data?.body);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, [toggle]);

  return (
    <div className="relative w-full h-full grow flex flex-col items-start gap-4 flex-shrink-0 my-3">
      <div
        className="grid items-start self-stretch grow justify-between px-4 py-8 gap-4"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {accommodations?.map((accommodation: any, index) => (
          <>
            <ListingComponent
              key={index}
              img={accommodation?.accom_images[0]}
              name={accommodation?.accomodation_name}
              location={`${accommodation?.accomodation_address}, ${accommodation?.accomodation_city}, ${accommodation?.accomodation_state}`}
              price=""
              id={accommodation?.id}
              setTogle={setToggle}
            />
          </>
        ))}
      </div>

      {!accommodations ||
        (accommodations.length === 0 &&
          (loading ? (
            <img
              src={spinner}
              alt="spinner"
              className="w-[32px] h-[32px] text-center mx-auto absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2"
            />
          ) : (
            <div className="absolute top-[30%] left-[50%]  translate-x-[-50%] text-2xl">
              No listings yet.
            </div>
          )))}
    </div>
  );
};
