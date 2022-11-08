import { useState } from 'react';
import GlobalNavBar from '../../components/NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { NaverLoginButton, KaKaoLoginButton } from './styles';
import TextInput from '../../components/TextInput';
import { useLoginStore } from '../../stores/LoginStore';
import AuthAPI from '../../apis/AuthAPI';
import BandProfileAPI from '../../apis/BandProfileAPI';
import logoImage from '../../assets/logo.png';

function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const logIn = useLoginStore((state) => state.logIn);

  const navigate = useNavigate();

  const signInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id === '' || password === '') {
      window.alert('아이디 또는 비밀번호가 공란입니다.');
      return;
    }

    AuthAPI.signIn({ email: id, password: password })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem('accessToken', res.data.accessToken);
        sessionStorage.setItem('refreshToken', res.data.refreshToken);
        sessionStorage.setItem('userID', id);
        // 소셜 로그인인지 확인하는 변수
        sessionStorage.setItem('isSocial', 'false');
        // 밴드 id 설정
        sessionStorage.setItem('bandID', 'None');
        BandProfileAPI.getBandProfileInfo().then((res) => {
          if (res.status === 200) {
            // 제대로 응답을 받았을 경우에는 응답으로 온 프로필을 밴드 프로필로
            console.log('밴드 ID', res.data.id);
            sessionStorage.setItem('bandID', res.data.id);
          }
          //아닌 경우 밴드가 없거나 뭔가 오류가 발생했다는 뜻이므로 빈 프로필을 보여준다
        });
        logIn(id);
        alert('로그인 성공');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setId('');
        setPassword('');
      });
  };

  return (
    <form
      onSubmit={signInSubmit}
      className='flex flex-col items-center w-full min-w-[200px] mt-4'
    >
      <TextInput label='이메일' value={id} setValue={setId} required />
      <TextInput
        label='비밀번호'
        value={password}
        setValue={setPassword}
        password
        required
      />
      <button
        type='submit'
        className='btn btn-primary text-base-100 rounded-lg w-60 md:w-80 mt-7'
      >
        로그인
      </button>
    </form>
  );
}

function LoginPage() {
  return (
    <>
      <GlobalNavBar />
      <div className='flex flex-col items-center mt-10'>
        <img className='w-72' src={logoImage} />
        <div className='text-neutral mt-2'>
          안녕하세요. 전국 모든 밴드의 커뮤니티 밴드웨건입니다.
        </div>
        <LoginForm />
        <div className='border mt-4 w-60 md:w-80' />
        <NaverLoginButton />
        <KaKaoLoginButton />
        <div className='flex flex-row mt-5'>
          <Link to='/find/email' className='px-5'>
            아이디 찾기
          </Link>
          <Link to='/find/password' className='px-5 border-x'>
            비밀번호 찾기
          </Link>
          <Link to='/signup' className='px-5'>
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
