import React, { useContext } from "react";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { DashboardMain } from "../components/DashboardMain";

import { useAuth } from "../hooks/useAuth";

export const DashboardHome = () => {
	const auth = useAuth();

	return (
		<div className="flex overflow-y-hidden h-screen">
			<DashboardSidebar />
			<DashboardMain />
		</div>
	);
};
