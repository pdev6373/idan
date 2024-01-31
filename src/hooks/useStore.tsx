import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const useStore = () => {
  const store = useContext(AuthContext);
  store.url = "https://accom-services-app.onrender.com";
  return store;
};
