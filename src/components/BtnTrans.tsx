import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  text: string
}

export const BtnTrans: React.FC<Props> = ({ text }) => {
  return (

      <button className='text-base py-2 px-8 rounded-[50px] font-semibold border-primary border btn-trans scale-up source-sans'>
        {text}
      </button>
    
  )
}
