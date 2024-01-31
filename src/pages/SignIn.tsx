import React, { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signinImage from "../assets/signin-hero-image.png";
import spinner from "../assets/spinner.svg";
import AuthContext from "../context/AuthContext";
import { Auth } from "../context/AuthContext";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ApiResponseError } from "../components/SignUpForm";
import { Button, Input } from "../components";

interface Errors {
  email?: string;
  password?: string;
  global?: any;
}

const SignIn = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const store = useContext(AuthContext);

  const errorCheck = () => {
    setErrors({});
    if (!emailAddress) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    }

    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password of at least 8 characters is required",
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
          Cookies.remove("user");
          Cookies.set("user", res?.data?.body?.access_token);
          if (
            res?.data?.status === "success" &&
            res?.data?.body?.profile
              ?.toLowerCase()
              ?.includes("accomodation provider")
          ) {
            console.log("ttt", res?.data);
            axios
              .get(`${store.url}/accomodation_provider/profile/me`, {
                headers: {
                  Authorization: `Bearer ${res?.data?.body?.access_token}`,
                },
              })
              .then((accomRres) => {
                console.log("res", res);
                store.setAuth({
                  firstName: res?.data?.body?.first_name,
                  lastName: res?.data?.body?.last_name,
                  email: res?.data?.body?.email,
                  id: res?.data?.body?.id,
                  token: res?.data?.body?.access_token,
                  profilePics: res?.data?.body?.profile_pic,
                  brandName: accomRres?.data?.body?.brand_name,
                  city: accomRres?.data?.body?.city,
                  address: accomRres?.data?.body?.brand_address,
                  phoneNumber: accomRres?.data?.body?.phone_number,
                  state: accomRres?.data?.body?.state,
                });
                navigate("/dashboard");
              });
          } else {
            store.setAuth({
              firstName: res?.data?.body?.first_name,
              lastName: res?.data?.body?.last_name,
              email: res?.data?.body?.email,
              id: res?.data?.body?.id,
              token: res?.data?.body?.access_token,
              profilePics: res?.data?.body?.profile_pic,
            });
            navigate("/");
          }
          return res.data;
        })
        .catch((error) => {
          return Promise.reject(error); // Re-throw the error to be caught by react-query
        }),
  });

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    errorCheck();

    if (Object.keys(errors).length < 1 && emailAddress && password) {
      const data = new URLSearchParams();
      data.append("username", emailAddress);
      data.append("password", password);

      try {
        await signin.mutateAsync(data);
      } catch (error) {
        const err = error as AxiosError<ApiResponseError>;
        console.log(err);
        if (
          err.response?.data.message.includes(
            "User does not exist, Please sign up"
          )
        ) {
          console.log(err.response?.data.message);
          setErrors((prev) => ({
            ...prev,
            email: "User does not exist, Please sign up",
          }));
        } else if (
          err.response?.data.message.includes("password is incorrect")
        ) {
          setErrors((prev) => ({
            ...prev,
            password: "password is incorrect",
          }));
        } else {
          setErrors({ global: err.response?.data.message || err.message });
        }
      }
    } else return;
  };

  return (
    <div className="flex h-screen max-h-screen bg-white">
      {errors.global && (
        <div className="bg-red-100 border w-[80%] mx-auto border-red-400 text-red-700 mt-4 px-4 py-3 rounded-[1rem] animate-shake relative">
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

      <img
        src={signinImage}
        alt="hero image"
        className="object-contain bg-[#0D267D] overflow-hidden object-center max-h-screen  h-screen w-1/2"
      />

      <div className="py-[10vh] bg-white w-1/2 px-[5vw] min-h-screen overflow-auto">
        <form className="flex flex-col justify-center gap-[60px]">
          <div className="flex flex-col gap-[12px]">
            <h3 className="text-black text-[36px] font-bold leading-[40px]">
              Sign In
            </h3>
            <p className="text-black text-[20px] font-normal leading-[24px]">
              Welcome back! Please fill in your details.
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-[32px]">
              <div>
                <Input
                  label="Email Address"
                  placeHolder="Email"
                  type="email"
                  value={emailAddress}
                  onChange={setEmailAddress}
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
            </div>

            <div className="flex justify-between items-center gap-5 mt-[15px]">
              {/* <div className="flex items-center gap-[6px]">
                <Image
                  src={"/assets/svgs/checked.svg"}
                  alt="check"
                  width={25}
                  height={25}
                />
                <p className="text-[16px] font-normal leading-[20.83px] text-[#000000]">
                  Remember me
                </p>
              </div> */}

              <a
                href={"/forgot-password"}
                className="text-[16px] font-normal leading-[20.83px] text-[#0808A6] ml-auto"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-[12px] items-center">
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleSubmit(e)
              }
              disabled={signin.isLoading}
            >
              {signin.isLoading ? (
                <img
                  src={spinner}
                  alt="spinner"
                  className="w-[30px] h-[30px] text-center mx-auto"
                />
              ) : (
                "Log in"
              )}
            </Button>
            <Link to="/SignUp">
              <span className="text-[16px] font-normal text-[#000] leading-[22.13px]">
                Not registered yet?{" "}
                <span className="text-[#0808A6] underline">Sign up now</span>
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
