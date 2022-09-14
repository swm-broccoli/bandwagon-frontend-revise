import React, { useState, useCallback, useEffect } from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import { bandPortfolioBrief } from './tempTodayPortfolio';
import { TodayPortfolio } from './TodaysPortfolio';
import GlobalFooter from '../../components/Footer';
import { recruitMenuList, RecruitMenu } from './RecruitMenu';
import {
  tempRecommendedRecruitments,
  RecommendedRecruitments,
} from './RecommendedRecruitments';
import { MainPopularPosts, PopularPostItemType } from './MainPopularPosts';
import { Carousel } from './carousel/Carousel';
import { carouselItemList } from './carousel/carouselItemList';
import MainPageAPI from '../../apis/MainPageAPI';
import defaultPopularPostImage from '../../assets/carousel-paragon.jpg';
import defauleProfileImage from '../../assets/band-default-pic.png';

function extractImageFromHtml(html: string): string {
  const img = new DOMParser()
    .parseFromString(html, 'text/html')
    .querySelector('img');
  return img ? img.src : '';
}

function MainPage() {
  const [popularPosts, setPopularPosts] = useState<PopularPostItemType[]>([]);

  useEffect(() => {
    MainPageAPI.getPopularPosts().then((res) => {
      setPopularPosts(
        res.data.posts.map((post: any): PopularPostItemType => {
          if (post.dtype === 'Band') {
            return {
              image:
                extractImageFromHtml(post.body) === ''
                  ? defaultPopularPostImage
                  : extractImageFromHtml(post.body),
              title: post.title,
              content: post.body,
              author: post.bandName,
              authorProfileImage: post.bandAvatarUrl
                ? post.bandAvatarUrl
                : defauleProfileImage,
              likeCount: post.likeCount,
              link: `/recruit/${post.id}`,
            };
          } else {
            return {
              image:
                extractImageFromHtml(post.body) === ''
                  ? defaultPopularPostImage
                  : extractImageFromHtml(post.body),
              title: post.title,
              content: post.body,
              author: post.nickname,
              authorProfileImage: post.userAvatarUrl
                ? post.userAvatarUrl
                : defauleProfileImage,
              likeCount: post.likeCount,
              link: `/recruit/${post.id}`,
            };
          }
        }),
      );
    });
  }, []);

  return (
    <main>
      <GlobalNavBar />
      <Carousel items={carouselItemList} />
      <RecruitMenu menuList={recruitMenuList} />
      <RecommendedRecruitments recruitments={tempRecommendedRecruitments} />
      <MainPopularPosts recentPosts={popularPosts} />
      <TodayPortfolio todayPortfolios={bandPortfolioBrief} />
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
