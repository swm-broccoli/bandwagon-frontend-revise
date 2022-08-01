import React from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import MyInfoIcon from '../../assets/ico_my1@2x.png';
import MyInfoActiveIcon from '../../assets/ico_my1_on@2x.png';
import BandInfoIcon from '../../assets/live_music.png';
import BandInfoActiveIcon from '../../assets/live_music_on.png';
import AccountInfoIcon from '../../assets/ico_my2@2x.png';
import AccountInfoActiveIcon from '../../assets/ico_my2_on@2x.png';
import PasswordChangeIcon from '../../assets/ico_my3@2x.png';
import PasswordChangeActiveIcon from '../../assets/ico_my3_on@2x.png';
import MyPostIcon from '../../assets/ico_my4@2x.png';
import MyPostActiveIcon from '../../assets/ico_my4_on@2x.png';
import MyCommentIcon from '../../assets/ico_my5@2x.png';
import MyCommentActiveIcon from '../../assets/ico_my5_on@2x.png';
import MyLikeIcon from '../../assets/ico_my6@2x.png';
import MyLikeActiveIcon from '../../assets/ico_my6_on@2x.png';

function MyPageMenuItem({
  label,
  to,
  icon,
  activeIcon,
  active,
}: {
  label: string;
  to: string;
  icon: string;
  activeIcon: string;
  active: boolean;
}) {
  return (
    <li
      className={`flex flex-row mx-3 items-center rounded-lg ${
        active
          ? 'bg-success hover:bg-[#bbf7d0]'
          : 'bg-base-100 hover:bg-base-200'
      }`}
    >
      <Link
        to={to}
        className={`pl-2 w-full ${
          active
            ? 'bg-success hover:bg-[#bbf7d0]'
            : 'bg-base-100 hover:bg-base-200'
        }`}
      >
        <img
          src={active ? activeIcon : icon}
          alt={label}
          className='w-5 h-5 rounded-none'
        />
        <span
          className={`${active ? 'text-primary' : 'text-neutral'} text-center`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}

function MyPageMenu() {
  const menuItems = [
    {
      label: '내 정보',
      to: '/profile/user',
      icon: MyInfoIcon,
      activeIcon: MyInfoActiveIcon,
      active: true,
    },
    {
      label: '밴드 정보',
      to: '/profile/band',
      icon: BandInfoIcon,
      activeIcon: BandInfoActiveIcon,
      active: false,
    },
    {
      label: '계정 정보',
      to: '/edit/account',
      icon: AccountInfoIcon,
      activeIcon: AccountInfoActiveIcon,
      active: false,
    },
    {
      label: '비밀번호 변경',
      to: '/edit/password',
      icon: PasswordChangeIcon,
      activeIcon: PasswordChangeActiveIcon,
      active: false,
    },
    {
      label: '내 글',
      to: '/profile/mypost',
      icon: MyPostIcon,
      activeIcon: MyPostActiveIcon,
      active: false,
    },
    {
      label: '내 댓글',
      to: '/profile/mycomment',
      icon: MyCommentIcon,
      activeIcon: MyCommentActiveIcon,
      active: false,
    },
    {
      label: '찜한 글',
      to: '/profile/mylike',
      icon: MyLikeIcon,
      activeIcon: MyLikeActiveIcon,
      active: false,
    },
  ];

  return (
    <ul className='menu rounded-box border border-base-200 p-1'>
      {menuItems.map((item, index) => (
        <MyPageMenuItem
          key={index}
          label={item.label}
          to={item.to}
          icon={item.icon}
          activeIcon={item.activeIcon}
          active={item.active}
        />
      ))}
    </ul>
  );
}

function PasswordEditPage() {
  return (
    <div>
      <GlobalNavBar />
      <div className='grid grid-cols-6'>
        <div className='col-start-2 col-end-6 grid grid-cols-5'>
          <div className='col-span-full md:col-start-1 md:col-span-1 min-w-[150px]'>
            <MyPageMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordEditPage;
