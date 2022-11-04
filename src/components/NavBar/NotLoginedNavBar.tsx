import NavBarItem from './NavBarItem';

const notLoggedInNavBarItems = [
  {
    link: '/login',
    label: '로그인',
  },
  {
    link: '/signup',
    label: '회원가입',
  },
];

function NotLoginedNavBar() {
  return (
    <ul className='menu menu-horizontal flex justify-evenly'>
      {notLoggedInNavBarItems.map((item) => (
        <NavBarItem key={item.label} label={item.label} link={item.link} />
      ))}
    </ul>
  );
}

export default NotLoginedNavBar;
