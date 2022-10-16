import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioAPI from '../../../apis/PortfolioAPI';

function UserPortfolioDisplay() {
  const { userEmail } = useParams();

  useEffect(() => {
    console.log(userEmail);
    PortfolioAPI.getUserPortfolioInfo(userEmail || '').then((res) => {
      console.log(res);
    });
  }, []);
  return <div>{userEmail} 포트폴리오 페이지입니다.</div>;
}

export default UserPortfolioDisplay;
