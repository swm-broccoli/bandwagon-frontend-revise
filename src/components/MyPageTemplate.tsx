import GlobalNavBar from './NavBar';
import MyPageMenu, { myPageMenuItems } from './MyPageMenu';

function MyPageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <GlobalNavBar />
      <div className='grid grid-cols-6'>
        <div className='col-start-2 col-end-6 flex flex-col md:flex-row'>
          <div className='w-full md:w-1/5 md:col-span-1 min-w-[150px] mt-10'>
            <MyPageMenu menuList={myPageMenuItems} />
          </div>
          <div className='md:pl-5 pt-5 md:pt-12 w-full'>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MyPageTemplate;
