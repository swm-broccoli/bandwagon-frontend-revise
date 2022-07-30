import React from 'react';
import { Link } from 'react-router-dom';

function SiteLogo() {
  return (
    <div className='site-logo w-fit font-sans text-2xl text-transparent bg-clip-text bg-gradient-to-r font-extrabold from-primary to-secondary'>
      <Link to='/'>Band:Wagon</Link>
    </div>
  );
}

export default SiteLogo;
