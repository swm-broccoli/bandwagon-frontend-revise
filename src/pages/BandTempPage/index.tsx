import BandPageTemplate from '../../components/BandPageTemplate';
import TempPageLogo from '../../assets/temp_page_logo.png';

function BandTempPage() {
  return (
    <BandPageTemplate>
      <div className='flex flex-col items-center'>
        <img className='w-56 md:w-80 mb-5' src={TempPageLogo} />
        <h1 className='text-xl'>
          아직 공사중인 페이지입니다. 조금만 기다려주세요!
        </h1>
      </div>
    </BandPageTemplate>
  );
}

export default BandTempPage;
