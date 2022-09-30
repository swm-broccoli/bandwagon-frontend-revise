import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteLogo from './Logo';
import { useLoginStore } from '../stores/LoginStore';
import RecruitProcessAPI from '../apis/RecruitProcessAPI';
import { NotificationType } from '../types/types';
import NotificationBox from './NotificationBox';

function NavBarItem({ label, link }: { label: string; link: string }) {
  return (
    <li className='menu-item'>
      <Link to={link} className='text-[#676767] active:bg-neutral font-sans-kr'>
        {label}
      </Link>
    </li>
  );
}

function GlobalNavBar() {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const logOut = useLoginStore((state) => state.logOut);

  const loggedInNavBarItems = [
    {
      link: '/',
      label: '광장',
    },
    {
      link: '/recruit/band',
      label: '구인구직',
    },
    {
      link: '/chat',
      label: '채팅',
    },
    {
      link: '/',
      label: '알림',
    },
    {
      link: '/profile/user',
      label: 'MY',
    },
  ];
  const notLoggedInNavBarItems = [
    {
      link: '/',
      label: '광장',
    },
    {
      link: '/login',
      label: '로그인',
    },
  ];

  return (
    <div className='grid grid-cols-6 border-b border-[#e2e2e2]'>
      <div className='navbar col-span-full md:col-start-2 md:col-end-6 py-0 min-h-fit bg-base-100 flex flex-col md:flex-row justify-center md:justify-between'>
        <SiteLogo />
        <ul className='menu menu-horizontal flex justify-evenly'>
          {(isLoggedIn ? loggedInNavBarItems : notLoggedInNavBarItems).map(
            (item) => (
              item.label === '알림' ?
              <NotificationBox key={item.label} /> :
              <NavBarItem
                key={item.label}
                label={item.label}
                link={item.link}
              />
            ),
          )}
          {isLoggedIn ? (
            <li className='menu-item'>
              <Link
                to='/'
                onClick={() => {
                  logOut();
                  localStorage.removeItem('accessToken');
                  localStorage.removeItem('refreshToken');
                  localStorage.removeItem('userID');
                  localStorage.removeItem('isSocial');
                  window.location.href = '/';
                }}
                className='text-[#676767] active:bg-neutral'
              >
                로그아웃
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default GlobalNavBar;
