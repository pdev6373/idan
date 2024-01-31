import React from "react";
import { FeaturesContent } from "./FeaturesContent";
import FeaturedIcon from "../assets/Featured icon.svg";
import Services from "../assets/Featured icon (1).svg";
import BarChart from "../assets/Featured icon (2).svg";
import message from "../assets/Featured icon (3).svg";
import star from "../assets/Featured icon (4).svg";
import zap from "../assets/Featured icon (5).svg";

export const Features = () => {
  return (
    <div className="bg-primary dm">
      <div className="py-12">
        <h1 className="text-center text-white px-8 mb-3 text-[27px] font-bold leading-6">
          Features
        </h1>
        <h2 className="text-center text-white px-8 text-3xl mb-5 inter font-bold leading-10 tracking-tight">
          Services Provided to guarantee your comfort.
        </h2>
        <h5 className="text-center text-white py-2 px-8 font-thin raleway text-base leading-8">
          Open a full-featured account with virtual cards in less than 5
          minutes.
        </h5>
      </div>
      <div className="flex flex-col items-start gap-4 px-16 flex-shrink-0">
        <div className="flex items-start gap-8 self-stretch">
          <FeaturesContent
            src={FeaturedIcon}
            title="Extensive Accommodation Listings"
            description="Access a wide range of hostels and hotels for easy acquisition. "
          />

          <FeaturesContent
            src={Services}
            title="Seamless Service Connections"
            description="Connect with skilled artisans and acquire their services effortlessly. "
          />
          <FeaturesContent
            src={BarChart}
            title="User-Friendly Posting"
            description="Easily post available hotels,hotels or services for maximum visibility. "
          />
        </div>
        <div className="flex items-start gap-8 self-stretch">
          <FeaturesContent
            src={message}
            title="Direct Communication"
            description="Reach out to Providers and artisans directly for quick and efficient communication. "
          />
          <FeaturesContent
            src={star}
            title="Ratings and Review"
            description="Make Informed decisions with user ratings and reviews for accommodations and services. "
          />
          <FeaturesContent
            src={zap}
            title="Personalized Recommendations"
            description="Recommend tailored recommmendations based on your preferences and previous interactions. "
          />
        </div>
      </div>
    </div>
  );
};
