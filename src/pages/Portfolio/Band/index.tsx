import { useEffect, useRef } from 'react';
import { BandProfileType } from '../../../types/types';
import usePortfolioStore from '../PortfolioStore';
import { useReactToPrint } from 'react-to-print';
import {
  PortfolioMemberItem,
  PortfolioAlbumItem,
  PortfolioRecordItem,
} from '../PortfolioStyles';
import { useNavigate } from 'react-router-dom';

function BandPortFolio({ portfolio }: { portfolio: BandProfileType }) {
  return (
    <main className='flex flex-col items-start'>
      <h1 className='text-3xl'>우리는 {portfolio.name} 밴드입니다!</h1>
      <div className='avatar'>
        <div className='w-40 rounded-full border border-base-300'>
          <img src={portfolio.avatarUrl} alt={portfolio.name + '프로필 사진'} />
        </div>
      </div>
      <section>
        <div className='flex flex-row items-center'>
          {portfolio.bandMembers.map((member) => (
            <PortfolioMemberItem key={member.id} member={member} />
          ))}
        </div>
      </section>
      <section>
        <h2>우린 여기서 활동해요.</h2>
        <div className='flex flex-row items-center'>
          {portfolio.areas.map((area, index) => (
            <div key={index} className='badge badge-secondary'>
              {area.city + ' ' + area.district}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>우린 이 요일마다 활동해요.</h2>
        <div className='flex flex-row items-center'>
          {portfolio.days.map((day, index) => (
            <div key={index} className='badge badge-secondary'>
              {day.name}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>우린 이런 음악을 해요.</h2>
        <div className='flex flex-row items-center'>
          {portfolio.genres.map((genre, index) => (
            <div key={index} className='badge badge-secondary'>
              {genre.name}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>우린 이런 사람들이에요.</h2>
        {portfolio.description ? (
          <div className='border border-base-200 rounded-lg p-3'>
            {portfolio.description}
          </div>
        ) : null}
      </section>
      <section>
        <h2>우리 밴드의 활동 사진</h2>
        <div className='flex flex-row items-center'>
          {portfolio.bandPhotos.map((photo) => (
            <PortfolioAlbumItem key={photo.id} photo={photo} />
          ))}
        </div>
      </section>
      <section>
        <h2>우리의 연습 기록</h2>
        <div className='flex flex-col items-center'>
          {portfolio.bandPractices.map((practice, index) => (
            <PortfolioRecordItem key={index} record={practice} />
          ))}
        </div>
      </section>
      <section>
        <h2>우리의 공연 기록</h2>
        <div className='flex flex-col items-center'>
          {portfolio.bandGigs.map((gig, index) => (
            <PortfolioRecordItem key={index} record={gig} />
          ))}
        </div>
      </section>
    </main>
  );
}

function BandPortFolioPage() {
  const portfolio = usePortfolioStore((state) => state.bandPortfolio);

  const bandPortfolioRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => bandPortfolioRef.current,
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(portfolio);
    if (bandPortfolioRef.current) {
      handlePrint();
    }
    navigate('/portfolio');
  }, []);

  return (
    <div className='flex justify-center' ref={bandPortfolioRef}>
      <BandPortFolio portfolio={portfolio} />
    </div>
  );
}

export default BandPortFolioPage;
