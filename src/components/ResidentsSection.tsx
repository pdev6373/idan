import React from 'react'
import { BtnRdLight } from './BtnRdLight'
import { BtnSquarePrm } from './BtnSquarePrm'
import { Carousel } from './Carousel';
import img1 from '../assets/Rectangle 9.png'
import img2 from '../assets/Rectangle 11.png'
import img3 from '../assets/Rectangle 12.png'
import { Link } from 'react-router-dom';


export const ResidentsSection: React.FC = () => {
  return (
    <div className='px-20'>
      <header className='flex  py-2 mt-16 mb-6 dm justify-between items-center'>
        <BtnRdLight text='Explore' />
        <Link to="explore/acccommodations">
          <BtnSquarePrm text='See More' />
        </Link>
      </header>

      <h2 className='text-[45px] '>Our Best - List  Residents</h2>
      <h4 className='text-base text-faded mb-7 '>Discover hundreds of accommodation options to match your taste.</h4>

      <div className='flex gap-5'>
        <div className='w-[70%] relative  h-[490px] '>
          <Carousel img={img1} header='Paradise Hotel' subtext='Ile-Ife, Osun State' small={false} />
        </div>

        <div className='flex flex-col  h-[230px] w-[700px] gap-5'>
          <Carousel img={img2} header='Pelican Chambers' subtext='Wuse, Abuja State' small />
          <Carousel img={img3} header='Amber Suites' subtext=' Ikeja, Lagos State' small />
        </div>

      </div>
    </div>
  )
}
