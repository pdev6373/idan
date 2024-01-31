import React, { FC } from 'react'
import img from '../assets/Vector.svg'
import search from '../assets/Search.svg'

export const SearchSm: FC = () => {
  return (
    <div className='relative mt-8 inter'>
      <button className='flex items-center gap-2 rounded-[50px] bg-whitish px-4 py-5'>
        <img src={img} alt="img" className='px-[10px] w-full py-2 bg-[#0D267D30] rounded-[100%]' />
        <select className='cursor-pointer outline-none pr-1 bg-inherit text-sm font-medium ' defaultValue={"SELECT A LOCATION"} >
          <option value="SELECT A LOCATION" hidden >SELECT A LOCATION</option>
          <option value="ILE-IFE">ILE-IFE</option>
          <option value="OSHOGBO">OSHOGBO</option>
        </select>
      </button>

      <button className='flex justify-end w-[190px] -z-10 left-[120px] absolute top-0 items-center gap-2 rounded-[60px] bg-primary px-4 py-[21px]'>
        <img className='pr-2' src={search} alt="img" />
      </button>

    </div>
  )
}
