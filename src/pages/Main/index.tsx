import React, { useCallback } from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import { bandPortfolioBrief } from './tempTodayPortfolio';
import { TodayPortfolio } from './TodaysPortfolio';
import GlobalFooter from '../../components/Footer';

interface RecommendedRecruitmentItemType {
  image: string;
  region: string;
  title: string;
}

const tempRecommendedRecruitments: RecommendedRecruitmentItemType[] = [
  {
    image: 'https://picsum.photos/200',
    region: '서울',
    title: '서울 마포구 밴드 기타 모집합니다.',
  },
  {
    image: 'https://picsum.photos/200',
    region: '인천',
    title: '인천 부평 밴드 여보컬 모집합니다.',
  },
  {
    image: 'https://picsum.photos/200',
    region: '서울',
    title: '일산 백석 직밴 건반 모십니다.',
  },
];

function RecommendedRecruitmentItem({
  recruitment,
}: {
  recruitment: RecommendedRecruitmentItemType;
}) {
  return (
    <div className='grid grid-flow-row'>
      <img
        className='w-36 h-36 rounded-lg object-fill'
        src={recruitment.image}
      />
      <span className='badge badge-secondary badge-outline'>
        {recruitment.region}
      </span>
      <p>{recruitment.title}</p>
    </div>
  );
}

function RecommendedRecruitments({
  recruitments,
}: {
  recruitments: RecommendedRecruitmentItemType[];
}) {
  return (
    <section className='bg-[#f4f9f9] h-60 grid grid-cols-6'>
      <div className='col-start-2'>
        <h1 className='text-2xl font-bold'>추천 구인글</h1>
        <h2 className='text-neutral'>R E C O M M E N D</h2>
      </div>
      {recruitments.map((recruitment) => (
        <RecommendedRecruitmentItem
          key={recruitment.title}
          recruitment={recruitment}
        />
      ))}
    </section>
  );
}

function MainPage() {
  return (
    <main>
      <GlobalNavBar />
      <RecommendedRecruitments recruitments={tempRecommendedRecruitments} />
      <TodayPortfolio todayPortfolios={bandPortfolioBrief} />
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
      <GlobalFooter />
    </main>
  );
}

export default MainPage;
