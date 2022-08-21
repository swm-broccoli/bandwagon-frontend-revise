import React from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';

interface bandPortfolioBriefType {
  title: string;
  description: string;
  image: string;
}

const bandPortfolioBrief: bandPortfolioBriefType[] = [
  {
    title: '브로콜리 소마저',
    description: '브로콜리 소마저를 소개합니다.',
    image:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: '극동아시아타이거즈',
    description: '극동아시아타이거즈를 소개합니다.',
    image: 'https://picsum.photos/200',
  },
  {
    title: '이디어츠밴드',
    description: '이디어츠밴드를 소개합니다.',
    image: 'https://picsum.photos/200',
  },
];

function TodaysPortfolioItem({
  todayPortfolio,
}: {
  todayPortfolio: bandPortfolioBriefType;
}) {
  return (
    <div className='w-96 card card-side bg-base-100 shadow-xl'>
      <figure className='h-full'>
        <img
          className='h-full'
          src={todayPortfolio.image}
          alt={`${todayPortfolio.title} 사진`}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{todayPortfolio.title}</h2>
        <p>{todayPortfolio.description}</p>
      </div>
    </div>
  );
}

function TodaysPortfolio({
  todayPortfolios,
}: {
  todayPortfolios: bandPortfolioBriefType[];
}) {
  return (
    <div className='flex flex-row gap-3 mt-5'>
      {todayPortfolios.map((todayPortfolio) => (
        <TodaysPortfolioItem todayPortfolio={todayPortfolio} />
      ))}
    </div>
  );
}

function MainPage() {
  return (
    <div>
      <GlobalNavBar />
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
      <section className='flex flex-col items-center pb-20 bg-gradient-to-br from-primary to-secondary'>
        <h1 className='text-base-100 text-2xl'>오늘의 밴드 포트폴리오</h1>
        <h2 className='text-base-100 text-lg tracking-[0.5rem]'>PORTFOLIO</h2>
        <TodaysPortfolio todayPortfolios={bandPortfolioBrief} />
      </section>
    </div>
  );
}

export default MainPage;
