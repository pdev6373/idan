import { DashboardSidebar } from "../components/DashboardSidebar";
import { ListingContainer } from "../components/ListingContainer";
import { Header } from "../components";

export const ListingPage = () => {
  return (
    <div className="flex w-max-screen h-screen overflow-hidden">
      <DashboardSidebar />

      <div className="flex-grow flex flex-col h-full overflow-y-auto pb-10">
        <Header />

        <h1 className="text-2xl font-bold text-center">Listing</h1>
        <div className="mt-8 px-10 flex grow">
          <ListingContainer />
        </div>
      </div>
    </div>
  );
};
