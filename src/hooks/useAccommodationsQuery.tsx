// useUserQuery.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Skill } from "../types/Skill";

export function useAccommodationsQuery() {
	const store = useContext(AuthContext);
	const queryClient = useQueryClient();
	const auth = store.auth;

	return useQuery({
		queryKey: ["acccommodations"],
		queryFn: () =>
			axios
				.get(`${store.url}/accommodation  `, {
					withCredentials: true,
					headers: { Authorization: `Bearer ${auth.token}` },
				})
				.then((res: any) => {
        
					return res.data;
				})
				.catch((error) => {
					console.log(error); // Re-throw the error to be caught by react-query
					return error;
				}),
		enabled: !!auth.token,
		onSuccess: (data) => {
			queryClient.setQueryData(["acccommodations"], data);
		},
	});
}
