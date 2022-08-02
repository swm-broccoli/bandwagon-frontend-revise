import React from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <>
      <GlobalNavBar />
      <div>메인 페이지입니다.</div>
      <div className='grid grid-flow-row gap-3 mt-5 w-40'>
        <button className='btn btn-primary'>
          <Link to='/login'>로그인 페이지</Link>
        </button>
        <button className='btn btn-primary'>
          <Link to='/signup'>회원가입 페이지</Link>
        </button>
        <button
          className='btn btn-primary'
          onClick={() => {
            console.log('페이지 이동');
          }}
        >
          <Link to='/edit/password'>비밀번호 변경 페이지</Link>
        </button>
      </div>
    </>
  );
}

export default MainPage;
