import React from 'react'
import { BtnRdLight } from './BtnRdLight'
import { BtnSquarePrm } from './BtnSquarePrm'
import { Review } from './Review'
import arrow from '../assets/arrow-right.svg'

export const Reviews = () => {
  return (
    <div className='px-20 pb-24 '>
      <header className='flex  pt-16 mb-24 dm justify-between items-center'>
        <BtnRdLight text='Reviews' />
        <BtnSquarePrm text='See More' />
      </header>


      <div className='relative w-full h-full'>
        <div className='hide-scroll flex h-max overflow-x-scroll gap-[60px] items-center'>
          <Review text='“This platform is a game-changer for travelers like me! Finding the perfect hostel and accessing skilled services has never been easier. Highly recommended!”' />
        </div>
        <img className='absolute top-[50%] cursor-pointer -translate-y-[50%] trans hover:translate-x-2 w-16 -right-5 p-4 rounded-full bg-primary' src={arrow} alt="" />
        <img className='absolute top-[50%] cursor-pointer -translate-y-[50%] trans hover:-translate-x-2 rotate-180 w-16 -left-5 p-4 rounded-full bg-primary' src={arrow} alt="" />
      </div>
    </div>

  )
}
