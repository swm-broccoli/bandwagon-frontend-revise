import React from 'react';
import SiteLogo from '../../components/Logo';
import GlobalNavBar from '../../components/NavBar';

function UIPage() {
  return (
    <>
      <GlobalNavBar />
      <div>임시로 UI들을 만들어 넣어 놓는 페이지입니다.</div>
      <h1 className='text-4xl underline'>Vite + React</h1>
      <button
        className='
        btn-primary
       text-white
        rounded
        w-80
        h-12
       '
      >
        기본버튼
      </button>
      <SiteLogo />
    </>
  );
}

export default UIPage;
