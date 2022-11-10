import GlobalNavBar from '../../components/NavBar/NavBar';
import GlobalFooter from '../../components/Footer';
import TempPageLogo from '../../assets/temp_page_logo.png';

function TempPage() {
  return (
    <div>
      <GlobalNavBar />
      <div className='grid grid-cols-6'>
        <div className='col-span-full mx-4 md:mx-0 md:col-start-2 md:col-end-6 flex flex-col md:flex-row'>
          <div className='flex flex-col items-center'>
            <img className='w-56 md:w-80 my-5' src={TempPageLogo} />
            <h1 className='text-xl'>
              아직 공사중인 페이지입니다. 조금만 기다려주세요!
            </h1>
          </div>
        </div>
      </div>
      <GlobalFooter />
    </div>
  );
}

export default TempPage;
