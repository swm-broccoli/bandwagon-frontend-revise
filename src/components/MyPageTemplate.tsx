import GlobalNavBar from './NavBar/NavBar';
import MyPageMenu, { myPageMenuItems } from './MyPageMenu';
import GlobalFooter from './Footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../apis/AuthAPI';

function MyPageTemplate({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    AuthAPI.loadUserInfo()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert('로그인을 해야 이용할 수 있습니다.');
        navigate('/login');
      });
  }, []);

  return (
    <div>
      <GlobalNavBar />
      <div className='grid grid-cols-6'>
        <div className='col-span-full mx-4 md:mx-0 md:col-start-2 md:col-end-6 flex flex-col md:flex-row'>
          <div className='w-full md:w-1/5 md:col-span-1 min-w-[150px] mt-10'>
            <MyPageMenu menuList={myPageMenuItems} />
          </div>
          <div className='md:pl-10 pt-5 md:pt-12 w-full'>{children}</div>
        </div>
      </div>
      <GlobalFooter />
    </div>
  );
}

export default MyPageTemplate;
