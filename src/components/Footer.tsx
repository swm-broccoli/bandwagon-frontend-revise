import React from 'react';
import { Link } from 'react-router-dom';

function GlobalFooter() {
  return (
    <footer className='footer bottom-0 mt-10 bg-base-200 flex flex-row items-center justify-center'>
      <div>
        <span className='footer-title'>Services</span>
        <Link to='/'>메인 페이지</Link>
        <Link to='/login'>로그인 페이지</Link>
        <Link to='/signup'>회원가입 페이지</Link>
        <Link to='/profile/user'>내 정보 페이지</Link>
      </div>
      <div>
        <p className='text-base-300'>
          Copyright © 2022 - All right reserved by ACME Industries Ltd
        </p>
      </div>
    </footer>
  );
}

export default GlobalFooter;
