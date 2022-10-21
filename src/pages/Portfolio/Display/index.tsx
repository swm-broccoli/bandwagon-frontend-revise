import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioAPI from '../../../apis/PortfolioAPI';
import { UserProfileType } from '../../../types/types';
import { vacantUserProfile } from '../../UserProfile/initialUserProfile';
import PortfolioAvatar from '../components/PortfolioAvatar';
import PortfolioText from '../components/PortfolioText';

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
      <PortfolioAvatar avatarURL={userProfile.avatarURL} />
      <PortfolioText label='이름' text={userProfile.name} />
      <PortfolioText label='생년월일' text={userProfile.birthday} />
      <PortfolioText label='성별' text={userProfile.gender ? '여자' : '남자'} />
    </div>
  );
}

export default UserPortfolioDisplay;
