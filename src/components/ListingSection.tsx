import React, { useContext, useEffect, useState } from "react";
import { ListingCard } from "./ListingCard";
import { useAccommodationsQuery } from "../hooks/useAccommodationsQuery";
import axios from "axios";
import AuthContext from "../context/AuthContext";

interface Accommodation {
  id: string;
  accom_images: string[];
  accomodation_state: string;
  accomodation_city: string;
  accomodation_name: string;
}

export const ListingSection = () => {
  const store = useContext(AuthContext);
  useEffect(() => {
    if (window.location.pathname === "/explore/accommodations") getListings();
  }, [window.location, store.auth]);
  const [currentPage, setCurrentPage] = useState(1);
  const accommodationsPerPage = 9;
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  const getListings = async () => {
    const res = await axios.post(
      `${store.url}/explorer/explore/accomodation_listings`,
      {},
      {
        headers: { Authorization: `Bearer ${store.auth.token}` },
      }
    );

    setAccommodations(res.data);
    console.log("res", res.data);
  };

  const indexOfLastAccommodation = currentPage * accommodationsPerPage;
  const indexOfFirstAccommodation =
    indexOfLastAccommodation - accommodationsPerPage;
  const currentAccommodations = accommodations?.slice(
    indexOfFirstAccommodation,
    indexOfLastAccommodation
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(accommodations.length / accommodationsPerPage))
      setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative w-full h-full flex min-h-screen flex-col items-start gap-4 justify-around flex-shrink-0">
      <div
        className="grid items-start self-stretch justify-between gap-10 flex-wrap px-32 py-8"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {currentAccommodations.length > 0 ? (
          currentAccommodations.map((accommodation) => (
            <ListingCard
              rating="w"
              price="1000/night"
              img={
                (accommodation.accom_images && accommodation.accom_images[0]) ||
                ""
              }
              location={`${accommodation?.accomodation_city}, ${accommodation?.accomodation_state}`}
              name={accommodation.accomodation_name}
              key={accommodation.id}
              id={Number(accommodation.id)}
            />
          ))
        ) : (
          <div className="absolute top-[30%] left-[50%] translate-x-[-50%] text-2xl">
            No accommodations listings yet.
          </div>
        )}
      </div>

      {/* {currentAccommodations.length ? (
        <div className="flex my-6 gap-8 mx-auto">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="text-base py-2 px-8 w-full bg-primary font-semibold text-white rounded-[50px] source-sans border-primary border btn-trans scale-up"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage ===
                Math.ceil(accommodations.length / accommodationsPerPage) ||
              currentAccommodations.length === 0
            }
            className="text-base py-2 px-8 w-full bg-primary font-semibold text-white rounded-[50px] source-sans border-primary border btn-trans scale-up"
          >
            Next
          </button>
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
};
