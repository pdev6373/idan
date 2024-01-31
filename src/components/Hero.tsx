import React, { FC, useRef, useEffect } from 'react';
import circle1 from '../assets/Ellipse 1.png';
import circle2 from '../assets/Ellipse 2.png';
import circle3 from '../assets/Ellipse 5.png';
import squiglyArrow from '../assets/Arrow 07.png';
import { SearchSm } from './SearchSm';
import facebook from '../assets/Facebook.svg';
import twitter from '../assets/Twitter.svg';
import instagram from '../assets/Instagram.svg'


export const Hero: FC = () => {
  return (
    <div className=' px-20 mt-[5.5rem]'>
      <div className='flex relative h-[45rem]'>
        <div className='animate-dropdown'>
          <h1 className='max-w-xl text-6xl font-bold '>
            Discover the Perfect
            <span className='text-primary'> Place</span> and
            <span className='text-primary'> Services</span>
            with Ease
          </h1>

          <SearchSm />
        </div>
        <div />

        <div className='absolute -top-16 right-[0rem] w-[30rem] animate-slideIn'>
          <img src={circle1} alt="img" />
        </div>

        <div className='absolute top-[26rem] right-[15rem] w-[15rem] animate-slideIn'>
          <img className='' src={squiglyArrow} alt="img" />
        </div>

        <div className='absolute top-[16rem] right-[30rem] w-[24rem] animate-slideIn'>
          <img src={circle2} alt="img" />
        </div>

        <div className='absolute top-[26rem] right-[57rem] w-[18rem] animate-slideIn'>
          <img src={circle3} alt="img" />
        </div>
      </div>

      <div className='flex gap-3 justify-end mb-4'>
        <img className='w-7 cursor-pointer trans slide-up' src={facebook} alt="" />
        <img className='w-7 cursor-pointer trans slide-up' src={twitter} alt="" />
        <img className='w-7 cursor-pointer trans slide-up' src={instagram} alt="" />
      </div>


    </div>
  )
}
