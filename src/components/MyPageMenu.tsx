import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
      className={`flex flex-row mx-3 items-center rounded-lg ${
        active
          ? 'bg-success hover:bg-[#bbf7d0]'
          : 'bg-base-100 hover:bg-base-200'
      }`}
    >
      <Link
        to={to}
        className={`pl-2 py-1 md:py-3 w-full ${
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
