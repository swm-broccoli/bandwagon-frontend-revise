import { useEffect, useRef } from 'react';
import { BandProfileType, UserProfileType } from '../../../types/types';
import usePortfolioStore from '../PortfolioStore';
import { useReactToPrint } from 'react-to-print';
import { positionToKorean } from '../../../assets/options/positionOptions';
import { PortfolioRecordItem } from '../PortfolioStyles';
import { useNavigate } from 'react-router-dom';

function getAgeFromBirthday(birthday: string) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function UserPortfolio({ portfolio }: { portfolio: UserProfileType }) {
  useEffect(() => {
    console.log(portfolio);
  }, []);

  return (
    <main className='flex flex-col items-start'>
      <h1 className='text-3xl'>저는 {portfolio.name}입니다!</h1>
      <h2 className='text-xl'>
        {getAgeFromBirthday(portfolio.birthday)}살{' '}
        {portfolio.gender ? '여자' : '남자'}입니다.
      </h2>
      <div className='avatar'>
        <div className='w-40 rounded-full border border-base-300'>
          <img src={portfolio.avatarUrl} alt={portfolio.name + '프로필 사진'} />
        </div>
      </div>
      {portfolio.positions.length ? (
        <section>
          <h2>이런 포지션 가능합니다.</h2>
          <div className='flex flex-row items-center'>
            {portfolio.positions.map((position, index) => (
              <div key={index} className='badge badge-secondary'>
                {positionToKorean[position.name]}
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {portfolio.areas.length ? (
        <section>
          <h2>이 지역에서 활동합니다.</h2>
          <div className='flex flex-row items-center'>
            {portfolio.areas.map((area, index) => (
              <div key={index} className='badge badge-secondary'>
                {area.city + ' ' + area.district}
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {portfolio.genres.length ? (
        <section>
          <h2>이런 장르들을 좋아합니다.</h2>
          <div className='flex flex-row items-center'>
            {portfolio.genres.map((genre, index) => (
              <div key={index} className='badge badge-secondary'>
                {genre.name}
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {portfolio.description ? (
        <section>
          <h2>이런 사람입니다.</h2>
          {portfolio.description ? (
            <div className='border border-base-200 rounded-lg p-3'>
              {portfolio.description}
            </div>
          ) : null}
        </section>
      ) : null}
      {portfolio.userPerformances.length ? (
        <section>
          <h2>이런 연주들을 해왔습니다.</h2>
          <div className='flex flex-col items-center'>
            {portfolio.userPerformances.map((performance, index) => (
              <PortfolioRecordItem key={index} record={performance} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function UserPortFolioPage() {
  const portfolio = usePortfolioStore((state) => state.userPortfolio);

  const userPortfolioRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => userPortfolioRef.current,
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(portfolio);
    if (userPortfolioRef.current) {
      handlePrint();
    }
    navigate('/portfolio');
  }, []);
  return (
    <div
      className='flex flex-col justify-center items-center'
      ref={userPortfolioRef}
    >
      <UserPortfolio portfolio={portfolio} />
    </div>
  );
}

export default UserPortFolioPage;
