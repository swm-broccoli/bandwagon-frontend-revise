import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyInfoIcon from '../assets/ico_my1@2x.png';
import MyInfoActiveIcon from '../assets/ico_my1_on@2x.png';
import BandInfoIcon from '../assets/live_music.png';
import BandInfoActiveIcon from '../assets/live_music_on.png';
import BandRequestIcon from '../assets/ico_request.svg';
import BandRequestActiveIcon from '../assets/ico_request_on.svg';
import PortfolioIcon from '../assets/research.png';
import PortfolioActiveIcon from '../assets/research_on.png';
import AccountInfoIcon from '../assets/ico_my2@2x.png';
import AccountInfoActiveIcon from '../assets/ico_my2_on@2x.png';
import PasswordChangeIcon from '../assets/ico_my3@2x.png';
import PasswordChangeActiveIcon from '../assets/ico_my3_on@2x.png';
import MyPostIcon from '../assets/ico_my4@2x.png';
import MyPostActiveIcon from '../assets/ico_my4_on@2x.png';
import MyLikeIcon from '../assets/ico_my6@2x.png';
import MyLikeActiveIcon from '../assets/ico_my6_on@2x.png';

export const myPageMenuItems = [
  {
    label: '내 정보',
    to: '/my/profile',
    icon: MyInfoIcon,
    activeIcon: MyInfoActiveIcon,
  },
  {
    label: '내 포트폴리오',
    to: '/my/portfolio',
    icon: PortfolioIcon,
    activeIcon: PortfolioActiveIcon,
  },
  {
    label: '계정 정보',
    to: '/my/account',
    icon: AccountInfoIcon,
    activeIcon: AccountInfoActiveIcon,
  },
  {
    label: '비밀번호 변경',
    to: '/my/password',
    icon: PasswordChangeIcon,
    activeIcon: PasswordChangeActiveIcon,
  },
  {
    label: '지원 현황',
    to: '/my/apply',
    icon: BandRequestIcon,
    activeIcon: BandRequestActiveIcon,
  },
  {
    label: '내 글',
    to: '/my/post',
    icon: MyPostIcon,
    activeIcon: MyPostActiveIcon,
  },
  {
    label: '찜한 글',
    to: '/my/liked',
    icon: MyLikeIcon,
    activeIcon: MyLikeActiveIcon,
  },
];

interface MyPageMenuItemProps {
  label: string;
  to: string;
  icon: string;
  activeIcon: string;
  active?: boolean;
}

function MyPageMenuItem({
  label,
  to,
  icon,
  activeIcon,
  active,
}: MyPageMenuItemProps) {
  return (
    <li
      className={`flex flex-row mx-2 items-center rounded-lg ${
        active
          ? 'bg-success hover:bg-[#bbf7d0]'
          : 'bg-base-100 hover:bg-base-200'
      }`}
    >
      <Link
        to={to}
        className={`pl-1 pr-1.5 py-1 md:py-2 w-full ${
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
          className={` ${
            active ? 'text-primary' : 'text-neutral'
          } text-center text-sm`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}

function MyPageMenu({ menuList }: { menuList: MyPageMenuItemProps[] }) {
  let location = useLocation();

  return (
    <ul className='menu rounded-box border border-base-200 p-1'>
      {menuList.map((item, index) => (
        <MyPageMenuItem
          key={index}
          label={item.label}
          to={item.to}
          icon={item.icon}
          activeIcon={item.activeIcon}
          active={item.to === location.pathname}
        />
      ))}
    </ul>
  );
}

export default MyPageMenu;
