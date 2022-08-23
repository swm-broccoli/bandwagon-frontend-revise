import React, { useCallback } from 'react';
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

interface RecentPostItemType {
  image: string;
  avatar: string;
  title: string;
  date: string;
  content: string;
  likes: number;
  link: string;
}

const tempRecentPosts: RecentPostItemType[] = [
  {
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/50/50',
    title: '그레이트 서울 인베이전 방송',
    date: '2020-01-01',
    content: '서울 인베이전 방송',
    likes: 10911,
    link: '/post/1',
  },
  {
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/50/50',
    title: '일렉기타 셋업 온라인 강좌',
    date: '2020-01-01',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    likes: 16384,
    link: '/post/2',
  },
  {
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/50/50',
    title: '오랜만에 해본 기타 커버 영상',
    date: '2020-01-01',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    likes: 998244353,
    link: '/post/2',
  },
  {
    image: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/50/50',
    title: '일렉기타 셋업 온라인 강좌',
    date: '2020-01-01',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    likes: 16384,
    link: '/post/2',
  },
];

function MainRecentPostItem({
  recentPost,
}: {
  recentPost: RecentPostItemType;
}) {
  return (
    <div className='card aspect-[4/5] card-compact w-full bg-base-100 shadow-xl mx-3'>
      <img className='h-3/5' src={recentPost.image} alt='Shoes' />
      <div className='p-3'>
        <h2 className='truncate text-xl font-bold'>{recentPost.title}</h2>
        <p className='truncate'>{recentPost.content}</p>
      </div>
    </div>
  );
}

function MainRecentPosts({
  recentPosts,
}: {
  recentPosts: RecentPostItemType[];
}) {
  return (
    <section className='grid grid-flow-row grid-cols-6 items-center my-10'>
      <div className='col-span-full md:col-start-2 md:col-end-6 flex flex-col items-center'>
        <h1 className='text-2xl font-bold'>최근 인기글</h1>
        <h2 className='text-neutral tracking-[0.2rem] mb-5'>P O P U L A R</h2>
        <div className='w-full flex flex-row justify-between'>
          {recentPosts.slice(0, 3).map((recentPost) => (
            <MainRecentPostItem recentPost={recentPost} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MainPage() {
  return (
    <main>
      <GlobalNavBar />
      <RecruitMenu menuList={recruitMenuList} />
      <RecommendedRecruitments recruitments={tempRecommendedRecruitments} />
      <MainRecentPosts recentPosts={tempRecentPosts} />
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
