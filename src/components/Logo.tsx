import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.png';

function SiteLogo() {
  return (
    <div className='mt-3 md:mt-0 site-logo w-fit h-10 md:h-6 self-center font-sans text-4xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r font-extrabold from-primary to-secondary'>
      <Link className='h-full' to='/'>
        <img className='h-full object-contain' src={logoImage} />
      </Link>
    </div>
  );
}

export default SiteLogo;
