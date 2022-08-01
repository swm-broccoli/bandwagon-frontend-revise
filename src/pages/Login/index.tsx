import React from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import { NaverLoginButton, KaKaoLoginButton } from './styles';
import TextInput from '../../components/TextInput';
import SubmitButton from '../../components/SubmitButton';

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
        <form className='flex flex-col items-center w-full min-w-[200px] mt-10'>
          <TextInput label='아이디' placeholder='이메일' required />
          <TextInput
            label='비밀번호'
            placeholder='비밀번호'
            password
            required
          />
          <SubmitButton label='로그인' />
        </form>
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
