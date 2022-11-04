import { useLoginStore } from '../../stores/LoginStore';
import NotificationBox from '../NotificationBox';
import NavBarItem from './NavBarItem';
import { Link } from 'react-router-dom';

const loggedInNavBarItems = [
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
    link: '/song',
    label: '음악',
  },
];

function MyPageNavWithBand() {
  return (
    <li className='menu-item dropdown dropdown-end text-[#676767] active:bg-neutral font-sans-kr'>
      <label tabIndex={0}>MY</label>
      <ul
        tabIndex={0}
        className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li>
          <Link to='/my/profile'>내 페이지</Link>
        </li>
        <li>
          <Link to='/band/profile'>밴드 페이지</Link>
        </li>
      </ul>
    </li>
  );
}

function LoginedNavBar() {
  const logOut = useLoginStore((state) => state.logOut);

  return (
    <ul className='menu menu-horizontal flex justify-evenly'>
      {loggedInNavBarItems.map((item) =>
        item.label === '알림' ? (
          <NotificationBox key={item.label} />
        ) : (
          <NavBarItem key={item.label} label={item.label} link={item.link} />
        ),
      )}
      {/* 밴드 있으면 드롭다운, 아니면 그냥 마이페이지로*/}
      <MyPageNavWithBand />
      <li className='menu-item'>
        <Link
          to='/'
          onClick={() => {
            logOut();
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('userID');
            sessionStorage.removeItem('bandID');
            sessionStorage.removeItem('isSocial');
            window.location.href = '/';
          }}
          className='text-[#676767] active:bg-neutral'
        >
          로그아웃
        </Link>
      </li>
    </ul>
  );
}

export default LoginedNavBar;
