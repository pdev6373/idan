import React, { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { useUserquery } from "../hooks/useUserquery";
import { useNavigate } from "react-router-dom";
import { Input } from ".";
import axios from "axios";
import spinner from "../assets/spinner.svg";
import NaijaStates from "naija-state-local-government";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    store.auth?.user?.ServiceProfile && setUser(store.auth.user.ServiceProfile);
    store.auth?.user?.AccommodationProfile &&
      setUser(store.auth.user.AccommodationProfile);
    console.log(user);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("brand_name", brand);
      formData.append("phone_number", phoneNumber);
      formData.append("brand_address", address);
      formData.append("state", state.toUpperCase());
      formData.append("city", city);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);

      const response = await axios.patch(
        `${store.url}/accomodation_provider/profile/me/update`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + store.auth.token,
          },
        }
      );

      store.setAuth({
        ...store.auth,
        // firstName: response?.data?.body?.firstName,
        // lastName: lastName,
        // email: email,
        // role: profile,
        brandName: response?.data?.body?.brand_name,
        phoneNumber: response?.data?.body?.phone_number,
        address: response?.data?.body?.brand_address,
        state: response?.data?.body?.state,
        city: response?.data?.body?.city,
      });

      navigate("/dashboard/profile");
      console.log("response", response);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleFormSubmit}>
        {/* <div className="flex p-2 m-2 gap-16 w-full">
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
        </div> */}

        {/* <div className="flex p-2 m-2 gap-16 w-full">
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
        </div> */}

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
              label="State"
              placeHolder="State"
              value={state}
              onChange={setState}
              error={false}
              dropdown={NaijaStates.states()}
            />
          </div>

          <div className="w-1/2">
            <Input
              type="text"
              label="City"
              placeHolder="City"
              value={city}
              onChange={setCity}
              error={false}
              dropdown={state ? NaijaStates.lgas(state)?.lgas : []}
            />
          </div>
        </div>

        <div className="flex p-2 m-2 gap-16 w-full">
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

        <div className="mt-8">
          <button
            className="bg-primary text-white rounded-3xl py-2 px-6 w-[120px] float-right"
            type="submit"
          >
            {loading ? (
              <img
                src={spinner}
                alt="spinner"
                className="w-[24px] h-[24px] text-center mx-auto"
              />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
