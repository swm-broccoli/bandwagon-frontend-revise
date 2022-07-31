import React from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import naverIcon from '../../assets/naver_icon.png';
import KakaoLogin from '../../assets/kakao_login.png';

function TextInput({
  label,
  placeholder,
  password = false,
  required = false,
}: {
  label: string;
  placeholder: string;
  password?: boolean;
  required?: boolean;
}) {
  return (
    <div className='flex flex-col my-2'>
      <label className='text-accent mb-2'>{label}</label>
      <input
        required={required}
        type={password ? 'password' : 'text'}
        placeholder={placeholder}
        className='input input-bordered w-60 md:w-80 focus:outline-none focus:border-primary invalid:border-error text-accent'
      />
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type='submit'
      className='btn btn-primary text-base-100 rounded-lg w-60 md:w-80 mt-7'
    >
      {label}
    </button>
  );
}

function NaverLoginButton() {
  return (
    <button className='btn bg-[#03c75a] pr-12 hover:bg-[#03c75a] rounded-xl text-base-100 w-60 md:w-80 border-none font-normal mt-4'>
      <img className='w-10 h-10 mr-5' src={naverIcon} alt='네이버 로그인' />
      네이버 로그인
    </button>
  );
}

function KaKaoLoginButton() {
  return (
    <button className='btn bg-contain bg-[#FEE500] hover:bg-[#FEE500] rounded-xl text-base-100 w-60 md:w-80 border-none font-normal mt-4'>
      <img src={KakaoLogin} alt='카카오 로그인' className='h-11' />
    </button>
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
