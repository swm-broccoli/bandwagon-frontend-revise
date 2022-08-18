import MyPageTemplate from '../../components/MyPageTemplate';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { BandProfileType, PerformanceRecordType } from '../../types/types';
import { vacantBandProfile } from '../BandProfile/initialBandProfile';
import BandProfileAPI from '../../apis/BandProfileAPI';
import {
  UserPortfolioMaker,
  PortfolioAvatar,
  PortfolioText,
  PortfolioMemberList,
  PortfolioAreaList,
  PortfolioSelectList,
  PortfolioDescription,
  PortfolioRecordField,
  PortfolioAlbum,
} from './styles';
import usePortfolioStore from './PortfolioStore';

function BandPortfolioMaker() {
  const [bandProfile, setBandProfile] =
    useState<BandProfileType>(vacantBandProfile);

  const [portfolioProfile, setPortfolioProfile] =
    useState<BandProfileType>(vacantBandProfile);

  const { portfolio, setPortfolio } = usePortfolioStore();

  const onCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    if (checked) {
      //체크박스가 체크됨
      setPortfolio({
        ...portfolio,
        [name]: bandProfile[name],
      });
    } else {
      setPortfolio({
        ...portfolio,
        [name]: vacantBandProfile[name],
      });
    }
    console.log(portfolio);
  };

  const onRecordCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.currentTarget;
    console.log(name, value);
    if (
      checked &&
      portfolio[name].find(
        (record: PerformanceRecordType) => record.id === JSON.parse(value).id,
      ) === undefined
    ) {
      // 체크박스가 체크되었으며 기존에 없던 기록이 추가되었을 경우
      setPortfolio({
        ...portfolio,
        [name]: [...portfolio[name], JSON.parse(value)],
      });
    } else if (!checked) {
      // 체크박스가 체크되지 않음
      setPortfolio({
        ...portfolio,
        [name]: portfolio[name].filter(
          (record: PerformanceRecordType) => record.id !== JSON.parse(value).id,
        ),
      });
    }
    console.log(portfolio);
  };

  useEffect(() => {
    BandProfileAPI.getBandProfileInfo()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setBandProfile(res.data);
          setPortfolio({
            ...portfolio,
            avatarUrl: res.data.avatarUrl,
            name: res.data.name,
            bandMembers: res.data.bandMembers,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <PortfolioAvatar avatarURL={bandProfile.avatarUrl} />
      <PortfolioText label='밴드 이름' text={bandProfile.name} />
      <PortfolioMemberList
        label='밴드 멤버'
        bandMembers={bandProfile.bandMembers}
      />
      <PortfolioAreaList
        label='지역'
        areas={bandProfile.areas}
        name='areas'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioSelectList
        label='활동 요일'
        selections={bandProfile.days}
        name='days'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioSelectList
        label='선호 장르'
        selections={bandProfile.genres}
        name='genres'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioDescription
        label='밴드 소개'
        description={bandProfile.description}
        name='description'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioAlbum
        label='밴드 사진첩'
        photos={bandProfile.bandPhotos}
        name='bandPhotos'
        onRecordCheckboxClick={onRecordCheckboxClick}
      />
      <PortfolioRecordField
        label='연습 기록'
        records={bandProfile.bandPractices}
        name='bandPractices'
        onRecordCheckboxClick={onRecordCheckboxClick}
      />
      <PortfolioRecordField
        label='공연 기록'
        records={bandProfile.bandGigs}
        name='bandGigs'
        onRecordCheckboxClick={onRecordCheckboxClick}
      />
    </div>
  );
}

function PortfolioPage() {
  const [portfolioTarget, setPortfolioTarget] = useState('band');

  return (
    <MyPageTemplate>
      <div className='flex flex-row'>
        <button
          onClick={() => {
            setPortfolioTarget('user');
          }}
          className='btn btn-primary'
        >
          사용자 포트폴리오 만들기
        </button>
        <button
          onClick={() => {
            setPortfolioTarget('band');
          }}
          className='btn btn-primary'
        >
          밴드 포트폴리오 만들기
        </button>
        <button className='btn btn-secondary px-1'>
          <Link to={`/portfolio/${portfolioTarget}`}>
            PDF
            <br />
            다운로드
          </Link>
        </button>
      </div>
      <div>
        {portfolioTarget === 'user' ? (
          <UserPortfolioMaker />
        ) : (
          <BandPortfolioMaker />
        )}
      </div>
    </MyPageTemplate>
  );
}

export default PortfolioPage;
