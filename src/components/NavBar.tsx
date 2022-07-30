import React from 'react';
import { Link } from 'react-router-dom';
import SiteLogo from './Logo';

function GlobalNavBar() {
  return (
    <div className='grid grid-cols-6 border-b border-[#e2e2e2]'>
      <div className='navbar col-span-full md:col-start-2 md:col-end-6 py-0 min-h-fit bg-base-100 flex flex-col md:flex-row justify-center md:justify-between'>
        <SiteLogo />
        <ul className='menu menu-horizontal flex justify-evenly'>
          <li className='menu-item'>
            <Link to='/' className='text-[#676767] active:bg-neutral min-w-min'>
              광장
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/recruit' className='text-[#676767] active:bg-neutral'>
              구인구직
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/' className='text-[#676767] active:bg-neutral'>
              채팅
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/recruit' className='text-[#676767] active:bg-neutral'>
              알림
            </Link>
          </li>
          <li className='menu-item'>
            <Link
              to='/profile/user'
              className='text-[#676767] active:bg-neutral'
            >
              MY
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GlobalNavBar;
