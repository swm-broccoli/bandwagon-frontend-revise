import MyPageTemplate from '../../../components/MyPageTemplate';
import React, { useState, useEffect } from 'react';
import { PerformanceRecordType, UserProfileType } from '../../../types/types';
import {
  PortfolioMakerAvatar,
  PortfolioMakerText,
  PortfolioMakerSelectList,
  PortfolioMakerAreaList,
  PortfolioMakerDescription,
  PortfolioMakerRecordField,
} from '../PortfolioMakerStyles';
import usePortfolioStore from '../../../stores/PortfolioStore';
import { vacantUserProfile } from '../../UserProfile/initialUserProfile';
import UserProfileAPI from '../../../apis/UserProfileAPI';
import DefaultUserImg from '../../../assets/default/man_no_img.svg';

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
      <PortfolioMakerAvatar
        avatarURL={
          userProfile.avatarUrl ? userProfile.avatarUrl : DefaultUserImg
        }
      />
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

function UserPortfolioPage() {
  return (
    <MyPageTemplate>
      {/*<div className='flex flex-row'>
        <button className='btn btn-secondary px-1'>
          <Link to='/portfolio/user'>PDF 다운로드</Link>
        </button>
  </div>*/}
      <UserPortfolioMaker />
    </MyPageTemplate>
  );
}

export default UserPortfolioPage;
