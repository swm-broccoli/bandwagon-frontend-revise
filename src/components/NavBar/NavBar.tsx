import SiteLogo from '../Logo';
import { useLoginStore } from '../../stores/LoginStore';
import LoginedNavBar from './LoginedNavBar';
import NotLoginedNavBar from './NotLoginedNavBar';

function GlobalNavBar() {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  return (
    <div className='grid grid-cols-6 border-b border-[#e2e2e2]'>
      <div className='navbar col-span-full md:col-start-2 md:col-end-6 py-0 min-h-fit bg-base-100 flex flex-col md:flex-row justify-center md:justify-between'>
        <SiteLogo />
        {isLoggedIn ? <LoginedNavBar /> : <NotLoginedNavBar />}
      </div>
    </div>
  );
}

export default GlobalNavBar;
