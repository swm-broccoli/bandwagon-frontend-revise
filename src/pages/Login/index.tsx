import { useState } from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { NaverLoginButton, KaKaoLoginButton } from './styles';
import TextInput from '../../components/TextInput';
import SubmitButton from '../../components/SubmitButton';
import { useLoginStore } from '../../stores/LoginStore';
import AuthAPI from '../../apis/AuthAPI';

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
    console.log(id);
    console.log(password);

    AuthAPI.signIn({ email: id, password: password })
      .then((res) => {
        console.log(res);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('userID', id);
        // 소셜 로그인인지 확인하는 변수
        localStorage.setItem('isSocial', 'false');
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
      className='flex flex-col items-center w-full min-w-[200px] mt-10'
    >
      <TextInput
        label='아이디'
        value={id}
        setValue={setId}
        placeholder='이메일'
        required
      />
      <TextInput
        label='비밀번호'
        value={password}
        setValue={setPassword}
        placeholder='비밀번호'
        password
        required
      />
      <SubmitButton label='로그인' />
    </form>
  );
}

function LoginPage() {
  return (
    <>
      <GlobalNavBar />
      <div className='flex flex-col items-center mt-10'>
        <div className='site-logo w-fit leading-normal font-sans text-5xl text-transparent bg-clip-text bg-gradient-to-r font-extrabold from-primary to-secondary'>
          Band:Wagon
        </div>
        <div className='text-neutral'>
          안녕하세요. 전국 모든 밴드의 커뮤니티 밴드웨건입니다.
        </div>
        <LoginForm />
        <div className='flex flex-row mt-5'>
          <Link to='/' className='px-5'>
            아이디 찾기
          </Link>
          <Link to='/' className='px-5 border-x'>
            비밀번호 찾기
          </Link>
          <Link to='/signup' className='px-5'>
            회원가입
          </Link>
        </div>
        <NaverLoginButton />
        <KaKaoLoginButton />
      </div>
    </>
  );
}

export default LoginPage;
