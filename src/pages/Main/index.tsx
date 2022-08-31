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
import { tempRecentPosts, MainRecentPosts } from './MainRecentPosts';
import carouselImage from '../../assets/carousel-intro.jpg';
import carouselImage2 from '../../assets/carousel-paragon.jpg';

interface CarouselItemType {
  id: number;
  image: string;
  title: string;
  content: string;
  link: string;
}

const carouselItems: CarouselItemType[] = [
  {
    id: 0,
    image: carouselImage,
    title: '안녕하세요',
    content: '전국 모든 밴드의 커뮤니티 밴드웨건입니다.',
    link: '/login',
  },
  {
    id: 1,
    image: carouselImage2,
    title: '안녕하세요 2',
    content: '여기서 당신의 음악의 꿈을 펼치세요.',
    link: '/signup',
  },
  {
    id: 2,
    image: carouselImage,
    title: '안녕하세요 3',
    content: '함께 꿈을 펼칠 사람도 찾아봐요.',
    link: '/login',
  },
  {
    id: 3,
    image: carouselImage2,
    title: '안녕하세요 4',
    content: '여기서 당신의 음악의 꿈을 펼치세요.',
    link: '/signup',
  },
];

function CarouselItem({ item }: { item: CarouselItemType }) {
  return (
    <div className='relative w-full shrink-0 overflow-hidden'>
      <img
        className='w-full h-full shrink-0'
        src={item.image}
        alt={item.title}
      />
      <div className='absolute top-1/3 left-1/3 flex flex-col items-center gap-2'>
        <h3 className='text-base-100 text-3xl font-bold'>{item.title}</h3>
        <p className='text-base-100 text-xl'>{item.content}</p>
        <Link className='text-teal-300' to={item.link}>
          <button className='btn btn-primary btn-outline glass'>
            사용하러 가기
          </button>
        </Link>
      </div>
    </div>
  );
}

function MainCarousel({ items }: { items: CarouselItemType[] }) {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const calculateCarouselTranslation = (index: number) => {
    if (index === 0) {
      return 0;
    }
    return index * 100;
  };

  const handleNextClick = () => {
    if (currentCarouselIndex === items.length - 1) {
      setCurrentCarouselIndex(0);
    } else {
      setCurrentCarouselIndex(currentCarouselIndex + 1);
    }
    console.log(calculateCarouselTranslation(currentCarouselIndex));
  };

  const handlePrevClick = () => {
    if (currentCarouselIndex === 0) {
      setCurrentCarouselIndex((prev) => items.length - 1);
    } else {
      setCurrentCarouselIndex((prev) => prev - 1);
    }
  };

  /*useEffect(() => {
    setInterval(() => {
      handleNextClick();
    }, 1000);
  }, []);*/

  return (
    <div>
      <section className='relative'>
        <div
          className={`flex flex-row h-60 md:h-96 transform -translate-x-[${calculateCarouselTranslation(
            currentCarouselIndex,
          )}%]`}
        >
          {items.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </div>
        <button
          onClick={handlePrevClick}
          className='btn h-60 md:h-96 text-base-100 text-4xl bg-transparent border-none absolute top-0 left-0'
        >
          ←
        </button>
        <button
          onClick={handleNextClick}
          className='btn h-60 md:h-96 text-base-100 text-4xl bg-transparent border-none absolute top-0 right-0'
        >
          →
        </button>
      </section>
    </div>
  );
}

function MainPage() {
  return (
    <main>
      <GlobalNavBar />
      <MainCarousel items={carouselItems} />
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
