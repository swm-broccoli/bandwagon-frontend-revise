import React from 'react';
import { Link } from 'react-router-dom';
import SiteLogo from './Logo';

function GlobalFooter() {
  return (
    <footer className='p-4 footer bottom-0 bg-base-200 flex justify-center'>
      <div className='w-full flex flex-col md:flex-row items-center justify-center md:justify-evenly'>
        <SiteLogo />
        <p className='text-neutral'>
          copyright 2022 ⓒ band:wagon All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default GlobalFooter;
