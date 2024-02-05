import React, { useEffect, useRef, useState } from "react";
import uploadImgIcon from "../assets/Cloud upload.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useStore } from "../hooks/useStore";
import { useAuth } from "../hooks/useAuth";
import { ApiResponseError } from "./SignUpForm";
import { Input } from ".";
const NaijaStates = require("naija-state-local-government");
import spinner from "../assets/spinner.svg";

export const ListingForm = ({
  listingType = "add",
}: {
  listingType?: "add" | "edit";
}) => {
  const inputRefs = useRef<
    HTMLInputElement[] | HTMLSelectElement[] | HTMLTextAreaElement[]
  >([]);
  const store = useStore();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [bathroom, setbathroom] = useState("");
  const [description, setDescription] = useState("");

  const [selectedImage, setSelectedImage] = useState<File[] | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string[] | null>(null);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { listingId } = useParams();

  useEffect(() => {
    const getListingDetails = async () => {
      try {
        // if (!store.auth.role) return;
        const res = await axios.get(
          // `${store.url}/accomodation_provider/listing/update/${listingId}`,
          `${store.url}/accomodation_provider/listing/filter/${listingId}`,
          { headers: { Authorization: "Bearer " + store.auth.token } }
        );
        const data = res?.data?.body;

        setName(data?.accomodation_name);
        setAddress(data?.accomodation_address);
        setCity(data?.accomodation_city);
        setState(data?.accomodation_state);
        setType(data?.accomodation_type);
        setRooms(data?.number_of_rooms);
        setKitchen(data?.number_of_kitchens);
        setbathroom(data?.number_of_bathrooms);
        setDescription(data?.accomodation_description);
      } catch (error) {
        console.log(error);
      }
    };

    if (listingType === "edit") getListingDetails();
  }, []);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("accomodation_name", name);
      formData.append("description", description);
      formData.append("accomodation_address", address);
      formData.append("accomodation_type", type);
      formData.append("number_of_rooms", rooms);
      formData.append("number_of_kitchen", kitchen);
      formData.append("number_of_bathrooms", bathroom);
      formData.append("state", state.toUpperCase());
      formData.append("city", city);

      if (selectedImage)
        for (let i = 0; i < selectedImage.length; i++) {
          formData.append("accom_images", selectedImage[i]);
        }

      if (listingType === "add") {
        const res = await axios.post(
          `${store.url}/accomodation_provider/listing/create`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + store.auth.token,
              "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            },
          }
        );
      } else {
        const res = await axios.patch(
          `${store.url}/accomodation_provider/listing/update/${listingId}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + store.auth.token,
              "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            },
          }
        );
      }

      navigate("/dashboard/listings");
    } catch (err: any) {
      console.log("err", err);
      const error: AxiosError<ApiResponseError> = err;
      setError(error.response?.data?.message || error.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles =
        listingType === "add" ? Array.from(files) : Array.from(files).reverse();
      setSelectedImage(selectedFiles);

      // Create preview URLs for each selected file
      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImageUrl((prev: any) => {
        if (prev)
          return listingType === "add"
            ? [...prev, previewUrls]
            : [previewUrls, ...prev];
        else return previewUrls;
      });
    }
  };

  return (
    <div>
      <form
        method="POST"
        encType="multipart/form-data"
        className="flex flex-col"
        onSubmit={handlePost}
      >
        <div className="flex items-center p-2 m-2 gap-16 w-full">
          <div className="w-1/2">
            <Input
              label="Accommodation name"
              placeHolder="Accommodation name"
              value={name}
              onChange={setName}
              type="text"
              error={false}
            />
          </div>

          <div className="w-1/2">
            <Input
              label="Accommodation Address"
              placeHolder="Accommodation Address"
              value={address}
              onChange={setAddress}
              type="text"
              error={false}
            />
          </div>
        </div>

        <div className="flex items-center p-2 m-2 gap-16 w-full">
          <div className="w-1/2">
            <Input
              label="Accommodation Type"
              placeHolder="Accommodation Type"
              value={type}
              onChange={setType}
              type="text"
              error={false}
              dropdown={[
                "HOSTEL",
                "GUEST HOUSE",
                "LODGE",
                "SELF-CON",
                "SINGLE ROOM",
                "FLAT",
                "OTHERS",
              ]}
            />
          </div>

          <div className="w-1/2">
            <Input
              label="Number of Rooms"
              placeHolder="Number of Rooms"
              value={rooms}
              onChange={setRooms}
              type="text"
              error={false}
            />
          </div>
        </div>

        <div className="flex items-center p-2 m-2 gap-16 w-full">
          <div className="w-1/2">
            <Input
              label="Number of Kitchen"
              placeHolder="Number of Kitchen"
              value={kitchen}
              onChange={setKitchen}
              type="text"
              error={false}
            />
          </div>

          <div className="w-1/2">
            <Input
              label="Number of Bathroom"
              placeHolder="Number of Bathroom"
              value={bathroom}
              onChange={setbathroom}
              type="text"
              error={false}
            />
          </div>
        </div>

        <div className="flex items-center p-2 m-2 gap-16 w-full">
          <div className="w-1/2">
            <Input
              label="State"
              placeHolder="State"
              value={state}
              onChange={setState}
              type="text"
              error={false}
              dropdown={NaijaStates.states()}
            />
          </div>

          <div className="w-1/2">
            <Input
              label="City"
              placeHolder="City"
              value={city}
              onChange={setCity}
              type="text"
              error={false}
              dropdown={state ? NaijaStates.lgas(state)?.lgas : []}
            />
          </div>
        </div>

        <div className="flex gap-16">
          <div className="w-1/2 flex flex-col gap-2 mt-3">
            <label
              htmlFor="Description"
              className="text-black text-[16px] font-normal leading-[24.74px]"
            >
              Description
            </label>
            <textarea
              id="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="Description"
              className="w-full h-[150px] max-h-[150px] min-h-[150px] border outline-none rounded-[1.4rem] border-solid border-light bg-white p-2 px-4"
            />
          </div>

          <div className="w-1/2 flex flex-col gap-2 mt-3">
            <label className="text-black text-[16px] font-normal leading-[24.74px]">
              Image
            </label>

            <div className="w-full h-[150px] border outline-none rounded-[1.4rem] border-solid border-light bg-white p-2 px-4 flex flex-col justify-center items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                name="media"
                id="upload"
                ref={(el) => (inputRefs.current[5] = el!)}
              />
              <div className="flex gap-1">
                {Array.isArray(previewImageUrl) &&
                  previewImageUrl.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      className="cursor-pointer h-[70px] w-[70px]"
                      alt={`Preview ${index}`}
                    />
                  ))}
              </div>
              <label htmlFor="upload">
                <img
                  src={uploadImgIcon}
                  onClick={() => inputRefs.current[5]?.click()}
                  className="cursor-pointer"
                  alt="Upload"
                />
              </label>

              <p className="text-center text-xs font-thin">
                Drag or Upload Images
              </p>
            </div>
            <p className="text-xs font-thin max-w-[430px] mt-4">
              At least 3 images of the accommodation being listed is required,
              each of different views. Images asttached should be under the size
              of 10MB each.
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border animate-shake border-red-400 text-red-700 mt-4 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error.message || error} </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => setError(null)}
              >
                <title>Close</title>
                <path
                  fillRule="evenodd"
                  d="M14.95 5.879l-4.95 4.95-4.95-4.95a.9.9 0 10-1.272 1.272l4.95 4.95-4.95 4.95a.9.9 0 101.272 1.272l4.95-4.95 4.95 4.95a.9.9 0 101.272-1.272l-4.95-4.95 4.95-4.95a.9.9 0 00-1.272-1.272z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        )}

        <div className="mt-10 ml-auto">
          <button
            type="submit"
            className={`bg-primary text-white rounded-3xl py-2 px-14 flex items-center gap-4 disabled:bg-blue-300 disabled:cursor-not-allowed`}
            disabled={!selectedImage}
          >
            {loading ? (
              <img
                src={spinner}
                alt="spinner"
                className="w-[24px] h-[24px] text-center mx-auto"
              />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
