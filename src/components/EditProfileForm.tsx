import React, { useContext, useEffect, useState, useRef } from "react";
import { useStore } from "../hooks/useStore";
import AuthContext from "../context/AuthContext";
import { useUserquery } from "../hooks/useUserquery";
import { useNavigate } from "react-router-dom";
import { Input } from ".";

export const EditProfileForm = () => {
  const store = useStore();
  useUserquery();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(store?.auth?.firstName || "");
  const [lastName, setLastName] = useState(store?.auth?.lastName || "");
  const [email, setEmail] = useState(store?.auth?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    store?.auth?.phoneNumber || ""
  );
  const [brand, setBrand] = useState(store?.auth?.brandName || "");
  const [address, setAddress] = useState(store?.auth?.address || "");
  const [city, setCity] = useState(store?.auth?.city || "");
  const [state, setState] = useState(store?.auth?.state || "");

  useEffect(() => {
    store.auth?.user?.ServiceProfile && setUser(store.auth.user.ServiceProfile);
    store.auth?.user?.AccommodationProfile &&
      setUser(store.auth.user.AccommodationProfile);
    console.log(user);
  }, []);

  const handleInputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${store.url}/profile/${
      store.auth.role && store.auth?.role.toLowerCase().split(" ")[0]
    }`;

    try {
      const formData = new FormData();

      formData.append("brand_name", brand);
      formData.append("phone_number", phoneNumber);
      formData.append("brand_address", address);
      formData.append("state", state);
      formData.append("city", city);

      formData.append("profile_picture", "");

      formData.append("first_name", firstName);
      formData.append("last_name", lastName);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + store.auth.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col"
        method="PUT"
        encType="multipart/form-data"
        onSubmit={handleFormSubmit}
      >
        <div className="flex p-2 m-2 gap-16 w-full">
          <div className="w-1/2">
            <Input
              type="text"
              label="First Name"
              placeHolder="First Name"
              value={firstName}
              onChange={setFirstName}
              error={false}
            />
          </div>

          <div className="w-1/2">
            <Input
              type="text"
              label="Last Name"
              placeHolder="Last Name"
              value={lastName}
              onChange={setLastName}
              error={false}
            />
          </div>
        </div>

        <div className="flex p-2 m-2 gap-16 w-full">
          <div className="w-1/2">
            <Input
              type="email"
              label="Email Address"
              placeHolder="Email Address"
              value={email}
              onChange={setEmail}
              error={false}
              disabled
            />
          </div>

          <div className="w-1/2">
            <Input
              type="tel"
              label="Phone Number"
              placeHolder="Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              error={false}
            />
          </div>
        </div>

        <div className="flex p-2 m-2 gap-16 w-full">
          <div className="w-1/2">
            <Input
              type="text"
              label="Company/Brand Address"
              placeHolder="Company/Brand Address"
              value={address}
              onChange={setAddress}
              error={false}
            />
          </div>

          <div className="w-1/2">
            <Input
              type="text"
              label="Brand Name"
              placeHolder="Brand Name"
              value={brand}
              onChange={setBrand}
              error={false}
            />
          </div>
        </div>

        <div className="flex p-2 m-2 gap-16 w-full">
          <div className="w-1/2">
            <Input
              type="text"
              label="City"
              placeHolder="City"
              value={city}
              onChange={setCity}
              error={false}
            />
          </div>

          <div className="w-1/2">
            <Input
              type="text"
              label="State"
              placeHolder="State"
              value={state}
              onChange={setState}
              error={false}
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            className="bg-primary text-white rounded-3xl py-2 px-6 w-[120px] float-right"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
