import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginStore } from '../../stores/LoginStore';

function OauthPage() {
  //const { email, accessToken, refreshToken } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const logIn = useLoginStore((state) => state.logIn);

  useEffect(() => {
    const query = new URLSearchParams(search);
    const email = query.get('email');
    const accessToken = query.get('accessToken');
    const refreshToken = query.get('refreshToken');
    console.log(email, accessToken, refreshToken);
    sessionStorage.clear();
    sessionStorage.setItem('accessToken', accessToken || '');
    sessionStorage.setItem('refreshToken', refreshToken || '');
    sessionStorage.setItem('userID', email || '');
    // 소셜 로그인인지 확인하는 변수
    sessionStorage.setItem('isSocial', 'true');
    logIn(email || '');
    alert('로그인 성공');
    navigate('/');
  }, []);

  return <div>Oauth 페이지</div>;
}

export default OauthPage;
