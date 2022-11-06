import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/navbar_symbol_logo.png';

function SiteLogo() {
  return (
    <div className='mt-3 md:mt-0 site-logo h-16 md:h-10 text-transparent bg-clip-text bg-gradient-to-r font-extrabold from-primary to-secondary'>
      <Link className='h-full' to='/'>
        <img className='h-full object-contain' src={logoImage} />
      </Link>
    </div>
  );
}

export default SiteLogo;
