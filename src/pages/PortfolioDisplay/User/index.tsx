import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioAPI from '../../../apis/PortfolioAPI';
import { UserProfileType } from '../../../types/types';
import { vacantUserProfile } from '../../UserProfile/initialUserProfile';
import PortfolioAvatar from '../../PortfolioDisplay/components/PortfolioAvatar';
import PortfolioText from '../../PortfolioDisplay/components/PortfolioText';
import PortfolioSelectList from '../../PortfolioDisplay/components/PortfolioSelectList';
import PortfolioAreaList from '../../PortfolioDisplay/components/PortfolioAreaList';
import PortfolioDescription from '../../PortfolioDisplay/components/PortfolioDescription';
import PortfolioRecordField from '../../PortfolioDisplay/components/PortfolioRecordField';
import DefaultUserImg from '../../../assets/default/man_no_img.svg';

function UserPortfolioDisplay() {
  const { userEmail } = useParams();

  const [userProfile, setUserProfile] =
    useState<UserProfileType>(vacantUserProfile);

  useEffect(() => {
    console.log(userEmail);
    PortfolioAPI.getUserPortfolioInfo(userEmail || '').then((res) => {
      console.log(res.data);
      setUserProfile(res.data);
    });
  }, []);
  return (
    <div>
      <PortfolioAvatar
        avatarURL={
          userProfile.avatarUrl ? userProfile.avatarUrl : DefaultUserImg
        }
      />
      <PortfolioText label='닉네임' text={userProfile.nickname} />
      <PortfolioText label='생년월일' text={userProfile.birthday} />
      <PortfolioText label='성별' text={userProfile.gender ? '여자' : '남자'} />
      <PortfolioSelectList
        label='포지션'
        selections={userProfile.positions}
        name='positions'
      />
      <PortfolioAreaList label='지역' areas={userProfile.areas} name='areas' />
      <PortfolioSelectList
        label='장르'
        selections={userProfile.genres}
        name='genres'
      />
      <PortfolioDescription
        label='자기소개'
        description={userProfile.description || ''}
        name='description'
      />
      <PortfolioRecordField
        label='연주 기록'
        records={userProfile.userPerformances}
        name='userPerformances'
      />
    </div>
  );
}

export default UserPortfolioDisplay;
