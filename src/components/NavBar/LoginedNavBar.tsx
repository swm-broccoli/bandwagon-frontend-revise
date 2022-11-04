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
  {
    link: '/my/profile',
    label: 'MY',
  },
];

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
