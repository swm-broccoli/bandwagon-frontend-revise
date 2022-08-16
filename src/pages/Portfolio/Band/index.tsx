import MyPageTemplate from '../../../components/MyPageTemplate';
import { useState, useEffect } from 'react';
import BandProfileAPI from '../../../apis/BandProfileAPI';
import { Link } from 'react-router-dom';
import { vacantBandProfile } from '../../BandProfile/initialBandProfile';
import { BandMemberType, BandProfileType } from '../../../types/types';
import BandMemberDefaultPic from '../../../assets/band-default-pic.png';
import { positionToKorean } from '../../../assets/options/positionOptions';
import { PictureType } from '../../../types/types';

// TODO : 먼저 밴드 포트폴리오 형식을 구성한다. 그리고 나서 거기 들어갈 내용을 고르는 기능을 만든다.
function PortfolioMemberItem({ member }: { member: BandMemberType }) {
  return (
    <div className='border border-base-200 rounded-lg p-2 mr-2'>
      <div className='flex flex-row items-center mr-3'>
        <div className='avatar mr-2 w-10 h-10 rounded-full'>
          <div className='w-10 h-10 rounded-full'>
            <img
              src={member.avatarUrl || BandMemberDefaultPic}
              alt={member.name}
            />
          </div>
        </div>
        <div>
          <div className='badge badge-secondary badge-outline'>
            {member.name}
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center'>
        {member.positions.map((position, index) => (
          <div key={index} className='badge badge-secondary'>
            {positionToKorean[position.name]}
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioAlbumItem({ photo }: { photo: PictureType }) {
  return (
    <div className='flex flex-row shrink-0 mr-4 items-start'>
      <img
        className='w-32 h-32 rounded-xl mr-1'
        src={photo.name || BandMemberDefaultPic}
        alt={`밴드 사진`}
      />
    </div>
  );
}

function BandPortFolio({ portfolio }: { portfolio: BandProfileType }) {
  return (
    <main className='flex flex-col items-center'>
      <h1 className='text-3xl'>우리는 {portfolio.name} 밴드입니다!</h1>
      <div className='avatar'>
        <div className='w-40 rounded-full'>
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
        <div className='border border-base-200 rounded-lg p-3'>
          {portfolio.description}
        </div>
      </section>
      <section>
        <h2>우리 밴드의 활동 사진</h2>
        <div className='flex flex-row items-center'>
          {portfolio.bandPhotos.map((photo) => (
            <PortfolioAlbumItem key={photo.id} photo={photo} />
          ))}
        </div>
      </section>
    </main>
  );
}

function BandPortFolioPage() {
  const [chosenProfile, setChosenProfile] = useState(vacantBandProfile);

  useEffect(() => {
    BandProfileAPI.getBandProfileInfo()
      .then((res) => {
        if (res.status === 200) {
          // 제대로 응답을 받았을 경우에는 응답으로 온 프로필을 밴드 프로필로
          console.log(res.data);
          setChosenProfile(res.data);
        }
        //아닌 경우 밴드가 없거나 뭔가 오류가 발생했다는 뜻이므로 빈 프로필을 보여준다
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MyPageTemplate>
      <div>
        <Link to='/portfolio/user'>
          <button className='btn btn-primary'>사용자 포트폴리오 만들기</button>
        </Link>
        <Link to='/portfolio/band'>
          <button className='btn btn-primary'>밴드 포트폴리오 만들기</button>
        </Link>
      </div>
      <BandPortFolio portfolio={chosenProfile} />
    </MyPageTemplate>
  );
}

export default BandPortFolioPage;
