import { useState, useCallback } from 'react';

export interface bandPortfolioBriefType {
  title: string;
  description: string;
  image: string;
}

interface CarouselIndexes {
  previousIndex: number;
  currentIndex: number;
  nextIndex: number;
}

function determineCardState(cardIndex: number, indexes: CarouselIndexes) {
  switch (cardIndex) {
    case indexes.previousIndex:
      return 'previous';
    case indexes.currentIndex:
      return 'current';
    case indexes.nextIndex:
      return 'next';
    default:
      return 'inactive';
  }
}

function TodaysPortfolioItem({
  todayPortfolio,
  currentState,
}: {
  todayPortfolio: bandPortfolioBriefType;
  currentState: string;
  // 현재 상태가 active인지 등등을 나타냄
}) {
  switch (currentState) {
    case 'current':
      return (
        <div className='absolute flex flex-row w-3/5 h-4/5 shrink-0 card card-side bg-base-100 shadow-xl transition-all delay-500 z-20'>
          <img
            className='w-1/2 h-full object-fill'
            src={todayPortfolio.image}
            alt={`${todayPortfolio.title} 사진`}
          />
          <div className='card-body w-1/2'>
            <h2 className='card-title'>{todayPortfolio.title}</h2>
            <p>{todayPortfolio.description}</p>
          </div>
        </div>
      );
    case 'previous':
    case 'next':
      return (
        <div
          className={`${
            currentState === 'previous' ? '-translate-x-40' : 'translate-x-40'
          } absolute flex flex-row w-3/5 h-4/5 scale-75 opacity-50 shrink-0 card card-side bg-base-100 shadow-xl transition-all`}
        >
          <img
            className='w-1/2 h-full object-fill'
            src={todayPortfolio.image}
            alt={`${todayPortfolio.title} 사진`}
          />
          <div className='w-1/2 card-body'>
            <h2 className='card-title'>{todayPortfolio.title}</h2>
            <p>{todayPortfolio.description}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function TodayPortfolioCarousel({
  todayPortfolios,
}: {
  todayPortfolios: bandPortfolioBriefType[];
}) {
  const [indexes, setIndexes] = useState<CarouselIndexes>({
    previousIndex: 0,
    currentIndex: 1,
    nextIndex: 2,
  });

  const handleCardTransition = useCallback(() => {
    // useCallback 을 이용해서 indexes.currentIndex 가 변할 때만 이 함수가 새로 생성되도록 한다
    if (indexes.currentIndex >= todayPortfolios.length - 1) {
      setIndexes((prevState) => ({
        previousIndex: todayPortfolios.length - 1,
        currentIndex: 0,
        nextIndex: 1,
      }));
    } else {
      setIndexes((prevState) => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === todayPortfolios.length
            ? 0
            : prevState.currentIndex + 2,
      }));
    }
  }, [indexes.currentIndex]);

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <button className='mb-10' onClick={handleCardTransition}>
        Transition to Next
      </button>
      <div className='w-full h-full relative flex flex-row justify-center mx-auto'>
        {todayPortfolios.map((todayPortfolio, index) => (
          <TodaysPortfolioItem
            key={index}
            todayPortfolio={todayPortfolio}
            currentState={determineCardState(index, indexes)}
          />
        ))}
      </div>
    </div>
  );
}

export function TodayPortfolio({
  todayPortfolios,
}: {
  todayPortfolios: bandPortfolioBriefType[];
}) {
  return (
    <section className='w-full h-96 flex flex-col items-center bg-gradient-to-br from-primary to-secondary'>
      <h1 className='text-base-100 text-2xl'>오늘의 밴드 포트폴리오</h1>
      <h2 className='text-base-100 text-lg tracking-[0.5rem]'>PORTFOLIO</h2>
      <TodayPortfolioCarousel todayPortfolios={todayPortfolios} />
    </section>
  );
}
