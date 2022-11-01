import MyPageTemplate from '../../components/MyPageTemplate';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  BandProfileType,
  PerformanceRecordType,
  UserProfileType,
} from '../../types/types';
import {
  PortfolioMakerAvatar,
  PortfolioMakerText,
  PortfolioMakerSelectList,
  PortfolioMakerAreaList,
  PortfolioMakerDescription,
  PortfolioMakerRecordField,
  PortfolioMakerAlbum,
  PortfolioMakerMemberList,
} from './PortfolioMakerStyles';
import { vacantBandProfile } from '../BandProfile/initialBandProfile';
import BandProfileAPI from '../../apis/BandProfileAPI';
import usePortfolioStore from './PortfolioStore';
import { vacantUserProfile } from '../UserProfile/initialUserProfile';
import UserProfileAPI from '../../apis/UserProfileAPI';
import EmptyBandProfile from '../BandProfile/EmptyBandProfile';
import DefaultUserImg from '../../assets/default/man_no_img.svg';
import DefaultBandImg from '../../assets/default/band_no_img.svg';

function UserPortfolioMaker() {
  const [userProfile, setUserProfile] =
    useState<UserProfileType>(vacantUserProfile);

  const { userPortfolio, setUserPortfolio } = usePortfolioStore();

  const onCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    if (checked) {
      //체크박스가 체크됨
      setUserPortfolio({
        ...userPortfolio,
        [name]: userProfile[name],
      });
    } else {
      setUserPortfolio({
        ...userPortfolio,
        [name]: vacantUserProfile[name],
      });
    }
    console.log(userPortfolio);
  };

  const onRecordCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.currentTarget;
    console.log(name, value);
    if (
      checked &&
      userPortfolio[name].find(
        (record: PerformanceRecordType) => record.id === JSON.parse(value).id,
      ) === undefined
    ) {
      //console.log(JSON.parse(value));
      // 체크박스가 체크되었으며 기존에 없던 기록이 추가되었을 경우
      setUserPortfolio({
        ...userPortfolio,
        [name]: [...userPortfolio[name], JSON.parse(value)],
      });
    } else if (!checked) {
      // 체크박스가 체크되지 않음
      setUserPortfolio({
        ...userPortfolio,
        [name]: userPortfolio[name].filter(
          (record: PerformanceRecordType) => record.id !== JSON.parse(value).id,
        ),
      });
    }
    console.log(userPortfolio);
  };

  useEffect(() => {
    UserProfileAPI.getUserProfileInfo()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setUserProfile(res.data);
          setUserPortfolio(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <PortfolioMakerAvatar avatarURL={userProfile.avatarUrl ? userProfile.avatarUrl : DefaultUserImg} />
      <PortfolioMakerText label='이름' text={userProfile.name} />
      <PortfolioMakerText label='생년월일' text={userProfile.birthday} />
      <PortfolioMakerText
        label='성별'
        text={
          // false가 남자, true가 여자
          userProfile.gender ? '여자' : '남자'
        }
      />
      <PortfolioMakerSelectList
        label='포지션'
        selections={userProfile.positions}
        name='positions'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioMakerAreaList
        label='지역'
        areas={userProfile.areas}
        name='areas'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioMakerSelectList
        label='장르'
        selections={userProfile.genres}
        name='genres'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioMakerDescription
        label='자기소개'
        description={userProfile.description ? userProfile.description : ''}
        name='description'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioMakerRecordField
        label='연주 기록'
        records={userProfile.userPerformances}
        name='userPerformances'
        onRecordCheckboxClick={onRecordCheckboxClick}
      />
    </div>
  );
}

function BandPortfolioMaker() {
  const [bandProfile, setBandProfile] =
    useState<BandProfileType>(vacantBandProfile);

  const { bandPortfolio, setBandPortfolio } = usePortfolioStore();

  const onCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    if (checked) {
      //체크박스가 체크됨
      setBandPortfolio({
        ...bandPortfolio,
        [name]: bandProfile[name],
      });
    } else {
      setBandPortfolio({
        ...bandPortfolio,
        [name]: vacantBandProfile[name],
      });
    }
    console.log(bandPortfolio);
  };

  const onRecordCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.currentTarget;
    console.log(name, value);
    if (
      checked &&
      bandPortfolio[name].find(
        (record: PerformanceRecordType) => record.id === JSON.parse(value).id,
      ) === undefined
    ) {
      //console.log(JSON.parse(value));
      // 체크박스가 체크되었으며 기존에 없던 기록이 추가되었을 경우
      setBandPortfolio({
        ...bandPortfolio,
        [name]: [...bandPortfolio[name], JSON.parse(value)],
      });
    } else if (!checked) {
      // 체크박스가 체크되지 않음
      setBandPortfolio({
        ...bandPortfolio,
        [name]: bandPortfolio[name].filter(
          (record: PerformanceRecordType) => record.id !== JSON.parse(value).id,
        ),
      });
    }
    console.log(bandPortfolio);
  };

  useEffect(() => {
    BandProfileAPI.getBandProfileInfo()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setBandProfile(res.data);
          setBandPortfolio(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (bandProfile.id === -1) {
    return <EmptyBandProfile />;
  }
  return (
    <div>
      <PortfolioMakerAvatar avatarURL={bandProfile.avatarUrl ? bandProfile.avatarUrl : DefaultBandImg} />
      <PortfolioMakerText label='밴드 이름' text={bandProfile.name} />
      <PortfolioMakerMemberList
        label='밴드 멤버'
        bandMembers={bandProfile.bandMembers}
      />
      <PortfolioMakerAreaList
        label='지역'
        areas={bandProfile.areas}
        name='areas'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioMakerSelectList
        label='활동 요일'
        selections={bandProfile.days}
        name='days'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioMakerSelectList
        label='선호 장르'
        selections={bandProfile.genres}
        name='genres'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioMakerDescription
        label='밴드 소개'
        description={bandProfile.description}
        name='description'
        onCheckboxClick={onCheckboxClick}
      />
      <PortfolioMakerAlbum
        label='밴드 사진첩'
        photos={bandProfile.bandPhotos}
        name='bandPhotos'
        onRecordCheckboxClick={onRecordCheckboxClick}
      />
      <PortfolioMakerRecordField
        label='연습 기록'
        records={bandProfile.bandPractices}
        name='bandPractices'
        onRecordCheckboxClick={onRecordCheckboxClick}
      />
      <PortfolioMakerRecordField
        label='공연 기록'
        records={bandProfile.bandGigs}
        name='bandGigs'
        onRecordCheckboxClick={onRecordCheckboxClick}
      />
    </div>
  );
}

function MyPortfolioPage() {
  const [portfolioTarget, setPortfolioTarget] = useState('user');

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

export default MyPortfolioPage;
