import { Link } from 'react-router-dom';

function NavBarItem({ label, link }: { label: string; link: string }) {
  return (
    <li className='menu-item'>
      <Link
        to={link}
        className='text-[#676767] active:bg-neutral font-sans-kr px-2 md:px-4'
      >
        {label}
      </Link>
    </li>
  );
}

export default NavBarItem;
