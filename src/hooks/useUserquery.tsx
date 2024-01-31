import React from "react";
import axios from "axios";
import { useStore } from "./useStore";
import { updateAuthState } from "../utils";
import { useAuth } from "./useAuth";

export const useUserquery = async () => {
  const auth = useAuth();
  const store = useStore();


	const getAllUserData = async () => {
		try {
			if (auth.email) {
				const res = await axios.get(`${store.url}/auth/${auth.email}`, {
					withCredentials: true,
					headers: { Authorization: "Password secret" },
				});
				updateAuthState(
					{ ...auth, ...res.data.data, user: { ...res.data.data } },
					store
				);
			}
		} catch (error) {
			console.log(error);
		}
	};


  return getAllUserData();
};
