import React, { createContext, useEffect, useState, Dispatch } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useStore } from "../hooks/useStore";
import axios, { AxiosError } from "axios";
import { ApiResponseError } from "../components/SignUpForm";
import { handleSignOut } from "../components/DashboardMain";

export interface Auth {
  firstName: string;
  lastName: string;
  email: string;
  role?: Role;
  token: string;
  id?: number;
  user?: any;
  profilePics?: string;
  brandName?: string;
  phoneNumber?: string;
  address?: string;
  state?: string;
  city?: string;
}

export enum Role {
  seeker = "Explorer",
  // serviceProvider = "Service Provider",
  accommodationProvider = "Accommodation Provider",
}

interface Store {
  auth: Auth;
  setAuth: Dispatch<React.SetStateAction<Auth>>;
  url: string;
}

export const autInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  token: "",
};

const AuthContext = createContext<Store>({
  auth: autInitialValues,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuth: () => {},
  url: "https://accom-services-app.onrender.com",
});

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuth] = useState<Auth>(autInitialValues);
  const store = useStore();

  const url = "https://accom-services-app.onrender.com";
  const getAllUserData = async (email: string) => {
    try {
      const res = await axios.get(`${url}/auth/${email}`, {
        withCredentials: true,
        headers: { Authorization: "Password secret" },
      });
      setAuth({ ...auth, ...res.data.data, user: { ...res.data.data }, token });
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<ApiResponseError>;
      if (
        err.response?.data?.message === "No user with this email" &&
        !auth.email
      ) {
        console.log("no user found");
        handleSignOut(store);
        //route to homepage
        window.location.href = "/";
      }
    }
  };

  const [token, setToken] = useState(Cookies.get("user") || "");

  const decodeUser = async (token: string) => {
    try {
      const temp = (await jwtDecode(token)) as any;
      // console.log("temp", temp);
      setAuth({ ...auth, email: temp.userEmail, token });
      getAllUserData(temp.userEmail);
      // console.log("updated", auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("token", token);
    if (token) decodeUser(token);
  }, [token]);

  // useUserquery();

  const contextValue = {
    auth,
    setAuth,
    url,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
