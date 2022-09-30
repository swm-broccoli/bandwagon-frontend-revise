import React, { useState, useCallback, useEffect } from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import { TodayPortfolio } from './TodaysPortfolio/TodaysPortfolio';
import GlobalFooter from '../../components/Footer';
import { recruitMenuList, RecruitMenu } from './RecruitMenu';
import { RecommendedRecruitments } from './RecommendedRecruitments';
import { MainPopularPosts } from './MainPopularPosts';
import { Carousel } from './carousel/Carousel';

function MainPage() {
  return (
    <main>
      <GlobalNavBar />
      <Carousel />
      <RecruitMenu menuList={recruitMenuList} />
      <RecommendedRecruitments />
      <MainPopularPosts />
      <TodayPortfolio />
      <GlobalFooter />
    </main>
  );
}

export default MainPage;
