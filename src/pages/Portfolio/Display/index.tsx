import { useParams } from 'react-router-dom';

function UserPortfolioDisplay() {
  const { userEmail } = useParams();
  return <div>{userEmail} 포트폴리오 페이지입니다.</div>;
}

export default UserPortfolioDisplay;
