import React from 'react'
import { BtnRdLight } from './BtnRdLight'
import { BtnSquarePrm } from './BtnSquarePrm'
import { ServiceCard } from './ServiceCard'
import img1 from '../assets/Rectangle 17.png'
import img2 from '../assets/Rectangle 18.png'
import img3 from '../assets/Rectangle 19.png'
import img4 from '../assets/Rectangle 20.png'
import arrow from '../assets/arrow-right.svg'
import { Link } from 'react-router-dom';

export const ServicesSection = () => {
  return (
    <div className='px-20 bg-background pb-16'>
      <header className='flex  pt-16 mt-16 mb-8 dm justify-between items-center'>
        <BtnRdLight text='Explore' />
        <Link to="explore/services">
          <BtnSquarePrm text='See More' />
        </Link>
      </header>

      <h2 className='text-[45px] '>Hire the best fit for you</h2>
      <h4 className='text-base text-faded pb-7 '>Connect with skilled artisans and acquire their services effortlessly.</h4>


      <div className='relative w-full h-full'>
        <div className='hide-scroll flex h-max overflow-x-scroll gap-[60px] items-center'>
          <ServiceCard img={img1} header='David James' subtext='Electrician' />
          <ServiceCard img={img2} header='David James' subtext='Electrician' />
          <ServiceCard img={img3} header='David James' subtext='Electrician' />
          <ServiceCard img={img4} header='David James' subtext='Electrician' />
          <ServiceCard img={img1} header='David James' subtext='Electrician' />
        </div>
        <img className='absolute top-[50%] cursor-pointer -translate-y-[60%] trans hover:translate-x-2 w-16 -right-5 p-4 rounded-full bg-primary' src={arrow} alt="" />
        <img className='absolute top-[50%] cursor-pointer -translate-y-[60%] trans hover:-translate-x-2 rotate-180 w-16 -left-5 p-4 rounded-full bg-primary' src={arrow} alt="" />
      </div>
    </div>
  )
}