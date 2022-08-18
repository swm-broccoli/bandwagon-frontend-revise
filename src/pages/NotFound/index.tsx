import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';

function NotFoundPage() {
  return (
    <div className='flex flex-col items-center'>
      <GlobalNavBar />
      <h1 className='text-3xl'>Page Not Found</h1>
      <GlobalFooter />
    </div>
  );
}

export default NotFoundPage;
