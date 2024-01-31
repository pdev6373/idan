import { useEffect, useState } from "react";
import reviews from "../assets/reviews.svg";
import listed from "../assets/listed.svg";
import badge from "../assets/🦆 icon _badge_.svg";
import { useStore } from "../hooks/useStore";
import axios from "axios";

export const DashboardStat = () => {
  const [rating, setRating] = useState<any>();
  const store = useStore();

  const getListerDetails = async () => {
    try {
      const res = await axios.get(
        `${store.url}/accomodation_provider/home
`,
        {
          headers: { Authorization: `Bearer ${store.auth.token}` },
        }
      );

      console.log(res);
      if (!res) {
        console.log("something went wrong");
        return null;
      }
      setRating(res.data.body);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getListerDetails();
  }, [store]);

  return (
    <div>
      <div className="bg-primary text-white flex gap-10 w-full rounded-3xl px-12 py-8 my-12">
        <div className="flex gap-6 justify-center items-center w-1/2">
          <img src={listed} alt="" width={60} />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[70px] leading-none font-black">
              {rating?.no_listings}
            </h1>
            <p className="text-xl font-normal">Accommodation Listed</p>
          </div>
        </div>

        <div className="flex gap-6 justify-center items-center w-1/2">
          <img src={reviews} alt="" width={60} />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[70px] leading-none font-black">
              {rating?.no_reviews}
            </h1>
            <p className="text-xl font-normal">Reviews</p>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white flex justify-center items-center rounded-3xl py-8 px-12 gap-6 w-1/3">
        <img src={badge} alt="" width={38} />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[70px] leading-none font-black">
            {rating?.no_likes}
          </h1>
          <p className="text-xl font-normal">Likes</p>
        </div>
      </div>
    </div>
  );
};
