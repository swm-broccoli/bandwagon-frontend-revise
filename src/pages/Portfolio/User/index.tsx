import MyPageTemplate from '../../../components/MyPageTemplate';
import { Link } from 'react-router-dom';

function UserPortFolioPage() {
  return (
    <MyPageTemplate>
      <Link to='/portfolio/user'>
        <button className='btn btn-primary'>사용자 포트폴리오 만들기</button>
      </Link>
      <Link to='/portfolio/band'>
        <button className='btn btn-primary'>밴드 포트폴리오 만들기</button>
      </Link>
    </MyPageTemplate>
  );
}

export default UserPortFolioPage;
