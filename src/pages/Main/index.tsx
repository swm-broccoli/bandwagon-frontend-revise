import React, { useState, useCallback, useEffect } from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import { TodayPortfolio } from './TodaysPortfolio/TodaysPortfolio';
import GlobalFooter from '../../components/Footer';
import { recruitMenuList, RecruitMenu } from './RecruitMenu';
import { RecommendedRecruitments } from './RecommendedRecruitments';
import { MainPopularPosts } from './MainPopularPosts';
import { Carousel } from './carousel/Carousel';
import { carouselItemList } from './carousel/carouselItemList';

function MainPage() {
  return (
    <main>
      <GlobalNavBar />
      <Carousel items={carouselItemList} />
      <RecruitMenu menuList={recruitMenuList} />
      <RecommendedRecruitments />
      <MainPopularPosts />
      <TodayPortfolio />
      <div className='text-3xl text-teal-500'>메인 페이지입니다.</div>
      <div className='text-2xl text-teal-700'>페이지들의 링크는 아래에</div>
      <div className='grid grid-flow-col gap-3 mt-5 w-full'>
        <Link to='/login'>로그인 페이지</Link>
        <Link to='/signup'>회원가입 페이지</Link>
        <Link to='/profile/user'>유저 정보 페이지</Link>
        <Link to='/profile/band'>밴드 정보 페이지</Link>
        <Link to='/edit/account'>계정 정보 변경 페이지</Link>
        <Link to='/edit/password'>비밀번호 변경 페이지</Link>
        <Link to='ui'>임시로 UI들 넣은 페이지</Link>
      </div>
      <GlobalFooter />
    </main>
  );
}

export default MainPage;
