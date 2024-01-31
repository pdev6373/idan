import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const useAuth = () => {
	const store = useContext(AuthContext);
	return store.auth;
};
