import axios, { AxiosError } from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { Auth, Role } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import svg from "../assets/Group 36.svg";
import spinner from "../assets/spinner.svg";
import { Button, Input } from ".";
import Cookies from "js-cookie";

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  global?: any;
  company?: string;
  address?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
}

export interface ApiResponseError {
  message: string;
}

export interface Props {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpForm = ({ setSuccess }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [profile, setProfile] = useState<Role | undefined>(Role.seeker);
  const [errors, setErrors] = useState<Errors>({});
  const [clicked, setClicked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const store = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const role = profile as Role;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    console.log("signup form input", store.auth);
  }, [store.auth]);

  const handleProfileClick = (
    value: Role,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setProfile(value);

    setIsOpen(false);
  };

  const errorCheck = () => {
    setErrors({});
    if (!firstName)
      setErrors((prev) => ({ ...prev, firstName: "First Name is required" }));

    if (!lastName)
      setErrors((prev) => ({ ...prev, lastName: "Last Name is required" }));

    if (!email) setErrors((prev) => ({ ...prev, email: "Email is required" }));

    if (password?.length < 8)
      setErrors((prev) => ({
        ...prev,
        password: "Password of at least 8 characters is required",
      }));

    if (profile === Role.accommodationProvider) {
      if (!company)
        setErrors((prev) => ({
          ...prev,
          company: "Company or Brand Name is required",
        }));
      if (!phoneNumber)
        setErrors((prev) => ({
          ...prev,
          phoneNumber: "Phone Number is required",
        }));
      if (!address)
        setErrors((prev) => ({
          ...prev,
          address: "Address is required",
        }));
      if (!city)
        setErrors((prev) => ({
          ...prev,
          city: "City is required",
        }));
      if (!state)
        setErrors((prev) => ({
          ...prev,
          state: "State is required",
        }));
    }
  };

  const signin = useMutation({
    mutationFn: (data: any) =>
      axios
        .post(`${store.url}/user/login`, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            withCredentials: true,
          },
        })
        .then((res) => {
          store.setAuth({
            firstName: res?.data?.body?.first_name,
            lastName: res?.data?.body?.last_name,
            email: res?.data?.body?.email,
            id: res?.data?.body?.id,
            token: res?.data?.body?.token,
            profilePics: res?.data?.body?.profile_pic,
          });

          const accommodationData = {
            brand_name: company,
            phone_num: phoneNumber,
            brand_address: address,
            state: state,
            city: city,
          };
          // await signupProvider.mutateAsync(accommodationData);

          Cookies.remove("user");
          Cookies.set("user", res?.data?.body?.token);

          axios
            .post(
              `${store.url}/accomodation_provider/create`,
              accommodationData,
              {
                headers: {
                  Authorization: `Bearer ${res?.data?.body?.toke}`,
                },
              }
            )
            .then((res) => {
              console.log("res", res);
              return res.data;
            })
            .catch((error) => {
              return Promise.reject(error); // Re-throw the error to be caught by react-query
            });

          setSuccess(true);
          navigate("/successsignup");

          return res.data;
        })
        .catch((error) => {
          return Promise.reject(error); // Re-throw the error to be caught by react-query
        }),
  });

  const signup = useMutation((data: any) =>
    axios
      .post(`${store.url}/user/signup`, data)
      .then((res) => {
        console.log("res", res);
        return res.data;
      })
      .catch((error) => {
        return Promise.reject(error); // Re-throw the error to be caught by react-query
      })
  );

  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    errorCheck();

    if (
      Object.keys(errors).length < 1 &&
      firstName &&
      lastName &&
      email &&
      password?.length >= 8 &&
      profile
    ) {
      if (
        profile === Role.accommodationProvider &&
        (!company || !address || !phoneNumber || !city || !state)
      )
        return;

      const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirm_password: password,
        profile:
          profile === "Accommodation Provider"
            ? "Accomodation Provider"
            : profile,
      };

      store.setAuth({
        ...store.auth,
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: profile,
        brandName: company,
        phoneNumber: phoneNumber,
        address: address,
        state: state,
        city: city,
      });
      try {
        await signup.mutateAsync(data);

        if (profile === Role.seeker) {
          setSuccess(true);
          navigate("/successsignup");
        } else {
          const signinData = new URLSearchParams();
          signinData.append("username", email);
          signinData.append("password", password);

          await signin.mutateAsync(signinData);
        }
      } catch (err) {
        const error = err as AxiosError<ApiResponseError>;
        if (error.response?.data.message.includes("User already exists")) {
          console.log(error.response?.data.message);
          setErrors((prev) => ({
            ...prev,
            email: "An account with this email address exists already",
          }));
        } else {
          setErrors({ global: error.response?.data.message || error.message });
        }
      }
    } else return;
  };

  return (
    <>
      {errors.global && (
        <div
          className="bg-red-100 border w-[80%] mx-auto border-red-400 text-red-700 mt-4 px-4 py-3 rounded-[1rem] animate-shake relative"
          onClick={() => setIsOpen(false)}
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            {errors.global.message || errors.global}{" "}
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setErrors({ ...errors, global: null })}
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

      <form className="flex flex-col justify-center gap-[60px]">
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-black text-[36px] font-bold leading-[40px]">
            Sign Up
          </h3>
          <p className="text-black text-[20px] font-normal leading-[24px]">
            Please fill in your details.
          </p>
        </div>

        <div>
          <div className="flex flex-col gap-[32px]">
            <div className="flex gap-6">
              <div className="w-1/2">
                <Input
                  label="First Name"
                  placeHolder="First Name"
                  type="text"
                  value={firstName}
                  onChange={setFirstName}
                  error={!!errors.firstName}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <Input
                  label="Last Name"
                  placeHolder="Last Name"
                  type="text"
                  value={lastName}
                  onChange={setLastName}
                  error={!!errors.lastName}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Input
                label="Email Address"
                placeHolder="Email"
                type="email"
                value={email}
                onChange={setEmail}
                error={!!errors.email}
              />
              {errors.email && (
                <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Password"
                placeHolder="Password"
                type="password"
                value={password}
                onChange={setPassword}
                error={!!errors.password}
              />
              {errors.password && (
                <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-[8px]">
              <p className="text-black text-[16px] font-normal leading-[24.74px]">
                Select Profile{" "}
              </p>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen((prev) => !prev);
                }}
                className={`${
                  isOpen ? "rounded-t-[30px] border-b-0" : "rounded-full"
                } trans cursor-pointer font-medium dropdown w-full relative py-4  px-6 border outline-none  text-gray border-grey bg-transparent flex items-center`}
              >
                <p className="text-lg">
                  {profile === Role.seeker ? "Explorer" : profile}
                </p>

                <img
                  src={svg}
                  alt=""
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
                  className="absolute right-6 top-1/2 z-30 cursor-pointer pl-6 -translate-y-1/2"
                />

                <p
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
                  className={`absolute bg-gray text-white rounded-[15px] font-medium text-[12px] p-3 -top-10 right-12 trans ${
                    !showInfo ? "animate-slideOut" : "animate-slideIn z-30"
                  }`}
                >
                  An explorer is an individual or entity who is solely
                  interested in finding a service or an accommodation. A service
                  provider is an individual or entity that wants to provide a
                  service to another individual or entity. An accommodation
                  provider is an individual or entity that wants to list a
                  property for sale/rent.{" "}
                </p>

                <div
                  className={`absolute top-full left-[-1px] right-[-1px] overflow-hidden z-20 bg-white border border-grey rounded-b-[30px] border-t-0 pb-4 ${
                    isOpen ? "animate-slideDown " : "animate-slideUp"
                  }`}
                >
                  <div
                    className={`hover:bg-grey cursor-pointer px-6 py-1 trans text-lg ${
                      profile === Role.seeker && "bg-grey"
                    }`}
                    onClick={(e) => handleProfileClick(Role.seeker, e)}
                  >
                    Explorer
                  </div>

                  {/* <div
                    className="hover:bg-grey cursor-pointer px-6 py-1 trans text-lg"
                    onClick={(e) => handleProfileClick(Role.serviceProvider, e)}
                  >
                    Service Provider
                  </div> */}

                  <div
                    className={`hover:bg-grey cursor-pointer px-6 py-1 trans text-lg ${
                      profile === Role.accommodationProvider && "bg-grey"
                    }`}
                    onClick={(e) =>
                      handleProfileClick(Role.accommodationProvider, e)
                    }
                  >
                    Accommodation Provider
                  </div>
                </div>
              </div>
            </div>

            <>
              {profile === Role.accommodationProvider ? (
                <>
                  <div>
                    <Input
                      label="Company or Brand Name"
                      placeHolder="Company or Brand Name"
                      type="text"
                      value={company}
                      onChange={setCompany}
                      error={!!errors.company}
                    />
                    {errors.company && (
                      <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      label="Phone Number"
                      placeHolder="Phone Number"
                      type="tel"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      error={!!errors.phoneNumber}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      label="Company or Brand Address"
                      placeHolder="Company or Brand Address"
                      type="text"
                      value={address}
                      onChange={setAddress}
                      error={!!errors.address}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-6">
                    <div className="w-1/2">
                      <Input
                        label="City"
                        placeHolder="City"
                        type="text"
                        value={city}
                        onChange={setCity}
                        error={!!errors.city}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div className="w-1/2">
                      <Input
                        label="State"
                        placeHolder="State"
                        type="text"
                        value={state}
                        onChange={setState}
                        error={!!errors.state}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] items-center">
          <Button
            onClick={(e) => {
              setClicked(true);
              handleSignUp(e);
            }}
            disabled={signup.isLoading}
          >
            {signup.isLoading ? (
              <img
                src={spinner}
                alt="spinner"
                className="w-[30px] h-[30px] text-center mx-auto"
              />
            ) : (
              "Sign Up"
            )}
          </Button>
          <Link to="/SignIn">
            <span className="text-[16px] font-normal text-[#000] leading-[22.13px]">
              Already have an account?{" "}
              <span className="text-[#0808A6] underline">Sign in</span>
            </span>
          </Link>
        </div>
      </form>
    </>
  );

  // return (
  //   <div
  //     className="w-full flex h-full flex-col justify-center"
  //     onClick={() => setIsOpen(false)}
  //   >

  //     <div className="w-1/2 mx-auto">
  //       <h1 className="my-6 text-3xl font-bold">Sign Up</h1>
  //       <h4>Please Fill in your details</h4>
  //       <form>
  //         <div className="my-6 flex">
  //           <div className="w-1/2 mr-2">
  //             <label
  //               htmlFor="firstName"
  //               className="block mb-1 text-sm font-medium text-gray-600"
  //             >
  //               First Name
  //             </label>
  //             <input
  //               type="text"
  //               id="firstName"
  //               name="firstName"
  //               ref={firstnameRef}
  //               required
  //               onChange={() => clicked && errorCheck()}
  //               className={`w-full px-6 py-2 border trans outline-none rounded-full ${
  //                 errors.firstName
  //                   ? "border-red-500 bg-red-50 animate-shake"
  //                   : "border-grey"
  //               }`}
  //             />
  //             {errors.firstName && (
  //               <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
  //                 {errors.firstName}
  //               </p>
  //             )}
  //           </div>
  //           <div className="w-1/2 ml-2">
  //             <label
  //               htmlFor="lastName"
  //               className="block mb-1 text-sm font-medium text-gray-600"
  //             >
  //               Last Name
  //             </label>
  //             <input
  //               type="text"
  //               id="lastName"
  //               name="lastName"
  //               onChange={() => clicked && errorCheck()}
  //               ref={lastnameRef}
  //               required
  //               className={`w-full px-6 py-2 border dm bg-none trans outline-none rounded-full ${
  //                 errors.lastName
  //                   ? "border-red-500 bg-red-50 animate-shake"
  //                   : "border-grey "
  //               }`}
  //             />
  //             {errors.lastName && (
  //               <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
  //                 {errors.lastName}
  //               </p>
  //             )}
  //           </div>
  //         </div>
  //         <div className="my-6">
  //           <label
  //             htmlFor="email"
  //             className="block mb-3 text-sm font-medium text-gray-600"
  //           >
  //             Email Address
  //           </label>
  //           <input
  //             type="email"
  //             id="email"
  //             name="email"
  //             onChange={() => clicked && errorCheck()}
  //             ref={emailRef}
  //             required
  //             className={`w-full px-6 py-2 border trans outline-none rounded-full ${
  //               errors.email
  //                 ? "border-red-500 bg-red-50 animate-shake"
  //                 : "border-grey "
  //             }`}
  //           />
  //           {errors.email && (
  //             <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
  //               {errors.email}
  //             </p>
  //           )}
  //         </div>

  //         <div className="my-6 relative ">
  //           <label
  //             htmlFor="password"
  //             className="block mb-3 text-sm font-medium text-gray-600"
  //           >
  //             Password
  //           </label>
  //           <input
  //             type={showPassword ? "text" : "password"}
  //             id="password"
  //             name="password"
  //             onChange={() => clicked && errorCheck()}
  //             ref={passwordRef}
  //             required
  //             className={`w-full  px-6 py-2 border trans outline-none rounded-full ${
  //               errors.password
  //                 ? "border-red-500 bg-red-50 animate-shake"
  //                 : "border-grey "
  //             }`}
  //           />
  //           {errors.password && (
  //             <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
  //               {errors.password}
  //             </p>
  //           )}
  //           <img
  //             onMouseEnter={toggleShowPassword}
  //             onMouseLeave={toggleShowPassword}
  //             src={peek}
  //             alt=""
  //             className="absolute right-3 top-10 cursor-pointer"
  //           />
  //         </div>

  //         <div className="flex justify-between my-2">
  //           <label htmlFor="remember_me" className="inline-flex items-center">
  //             <input
  //               type="checkbox"
  //               id="remember_me"
  //               className="w-4 h-4 text-primary border-t-grey rounded"
  //             />
  //             <span className="ml-2 text-sm text-gray-600">
  //               I agree to the Terms & Conditions.
  //             </span>
  //           </label>
  //         </div>
  //         <button
  //           onClick={(e) => {
  //             setClicked(true);
  //             handleSignUp(e);
  //           }}
  //           disabled={signup.isLoading}
  //           type="submit"
  //           className="w-full py-2 px-4 bg-primary text-white rounded-full disabled:bg-disabled btn-trans disabled:cursor-not-allowed"
  //         >
  //           Sign Up
  //         </button>

  //         <p className="my-4 text-center text-sm">
  //           Already have an account?
  //           <Link to="/SignIn">
  //             <span className="text-primary"> Sign In.</span>
  //           </Link>
  //         </p>
  //       </form>
  //     </div>
  //   </div>
  // );
};
