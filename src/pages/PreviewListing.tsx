import React from 'react'
import { DashboardSidebar } from '../components/DashboardSidebar';
import profileImg from "../assets/profileImg.svg";


export const PreviewListing = () => {
  return (
    <div className='flex'> 
      <DashboardSidebar />
      <div className="items-end p-8 flex-grow">
        <div className="flex gap-3 items-center float-right">
        <img src="https://media.istockphoto.com/id/515930999/vector/man-head-silhouette-vector.jpg?s=1024x1024&w=is&k=20&c=EM9-n8coORvu6RBRrWhoyYwYzqzaLesXCmhYtDcYwFA=" alt=""  className="h-10 w-10 bg-black	rounded-[100%]" />
          <h1>Sam Banks</h1>
        </div>
        <div>
          <h1 className="text-center mt-8 text-2xl font-bold">Add Listing</h1>
        </div>
      </div>
    </div>
  );
}

