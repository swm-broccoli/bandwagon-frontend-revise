import React, { useCallback } from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import { bandPortfolioBrief } from './tempTodayPortfolio';
import { TodayPortfolioCarousel } from './TodaysPortfolio';

function MainPage() {
  return (
    <div>
      <GlobalNavBar />
      <section className='w-full h-96 flex flex-col items-center bg-gradient-to-br from-primary to-secondary'>
        <h1 className='text-base-100 text-2xl'>오늘의 밴드 포트폴리오</h1>
        <h2 className='text-base-100 text-lg tracking-[0.5rem]'>PORTFOLIO</h2>
        <TodayPortfolioCarousel todayPortfolios={bandPortfolioBrief} />
      </section>
      <div className='text-3xl text-teal-500'>메인 페이지입니다.</div>
      <div className='text-2xl text-teal-700'>페이지들의 링크는 아래에</div>
      <div className='grid grid-flow-row gap-3 mt-5 w-40'>
        <Link to='/login'>로그인 페이지</Link>
        <Link to='/signup'>회원가입 페이지</Link>
        <Link to='/profile/user'>유저 정보 페이지</Link>
        <Link to='/profile/band'>밴드 정보 페이지</Link>
        <Link to='/edit/account'>계정 정보 변경 페이지</Link>
        <Link to='/edit/password'>비밀번호 변경 페이지</Link>
        <Link to='ui'>임시로 UI들 넣은 페이지</Link>
      </div>
    </div>
  );
}

export default MainPage;
