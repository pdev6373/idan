import React from 'react'
import { BtnSquarepurp } from './BtnSquarepurp'
import copy from '../assets/copyright.svg'

export const Footer = () => {
  return (
    <div className='bg-primary text-whitish py-16 px-[140px] dm'>
      <div className='flex justify-between mb-16'>
        <div>
          <h2 className='font-bold text-xl'>Sign Up to our newsletter</h2>
          <h2 className='text-lg'>Stay up to date with the latest announcements and updates.</h2>
        </div>

        <div className='flex gap-4'>
          <input className='w-[255px] px-[14px] py-[10px] outline-none text-gray rounded-lg' type="text" placeholder='Enter your email ' />
          <BtnSquarepurp text='Subscribe' />
        </div>
      </div>

      <div className='w-full border-[1px] border-grayDark mb-3' />

      <p className='text-[15px] font-medium flex items-center gap-1' >
        <img className='mb-1' src={copy} /> <span>2023 Company Name. All rights reserved.</span>
      </p>
    </div>
  )
}
