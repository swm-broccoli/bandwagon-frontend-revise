import { useState, useCallback, useEffect } from 'react';
import MainPageAPI from '../../../apis/MainPageAPI';
import Wave from './Wave';
import defaultAvatar from '../../../assets/indie-band.jpeg';

export interface bandPortfolioBriefType {
  id: number;
  avatarUrl: string;
  name: string;
  description: string;
  dtype: 'User' | 'Band';
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
        <div className='absolute flex flex-row w-3/5 h-4/5 shrink-0 card card-side bg-base-100 shadow-xl transition-all duration-500 z-30'>
          <img
            className='w-1/2 h-full object-fill'
            src={
              todayPortfolio.avatarUrl
                ? todayPortfolio.avatarUrl
                : defaultAvatar
            }
            alt={`${todayPortfolio.name} 사진`}
          />
          <div className='card-body w-1/2'>
            <h2 className='card-title'>{todayPortfolio.name}</h2>
            <p>{todayPortfolio.description}</p>
          </div>
        </div>
      );
    case 'previous':
    case 'next':
      return (
        <div
          className={`${
            currentState === 'previous' ? 'left-0' : 'right-0'
          } absolute flex flex-row w-3/5 h-4/5 scale-75 shrink-0 card card-side bg-base-100 shadow-xl transition-all z-20`}
        >
          <img
            className='w-1/2 h-full object-fill'
            src={
              todayPortfolio.avatarUrl
                ? todayPortfolio.avatarUrl
                : defaultAvatar
            }
            alt={`${todayPortfolio.name} 사진`}
          />
          <div className='w-1/2 card-body'>
            <h2 className='card-title'>{todayPortfolio.name}</h2>
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

  const handleTransition = (transitionIndex: number) => {
    if (transitionIndex === 0) {
      setIndexes({
        previousIndex: todayPortfolios.length - 1,
        currentIndex: 0,
        nextIndex: 1,
      });
    } else if (transitionIndex === todayPortfolios.length - 1) {
      setIndexes({
        previousIndex: todayPortfolios.length - 2,
        currentIndex: todayPortfolios.length - 1,
        nextIndex: 0,
      });
    } else {
      setIndexes({
        previousIndex: transitionIndex - 1,
        currentIndex: transitionIndex,
        nextIndex: transitionIndex + 1,
      });
    }
  };

  return (
    <div className='relative w-full h-full flex flex-col items-center'>
      <Wave />
      <div className='w-full h-full relative flex flex-row justify-center mx-auto'>
        {todayPortfolios.map((todayPortfolio, index) => (
          <TodaysPortfolioItem
            key={index}
            todayPortfolio={todayPortfolio}
            currentState={determineCardState(index, indexes)}
          />
        ))}
      </div>
      <div className='flex flex-row'>
        {todayPortfolios.map((todayPortfolio, index) => (
          <button
            key={index}
            className={`${
              index === indexes.currentIndex ? 'bg-base-100' : 'bg-base-200'
            } w-32 h-1 mb-5 z-40`}
            onClick={() => {
              handleTransition(index);
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}

// css animation from https://codepen.io/Prachl/pen/XLveVd
// https://www.section.io/engineering-education/pure-css-wave-animations-website/
export function TodayPortfolio() {
  const [todayPortfolios, setTodayPortfolios] = useState<
    bandPortfolioBriefType[]
  >([]);

  useEffect(() => {
    MainPageAPI.getTodayPortfolios().then((res) => {
      console.log(res.data);
      setTodayPortfolios(res.data);
    });
  }, []);

  return (
    <section className='w-full h-[40vh] overflow-hidden flex flex-col items-center bg-gradient-to-br from-primary to-secondary'>
      <h1 className='text-base-100 text-2xl'>오늘의 밴드 포트폴리오</h1>
      <h2 className='text-base-100 text-lg tracking-[0.5rem]'>PORTFOLIO</h2>
      <TodayPortfolioCarousel todayPortfolios={todayPortfolios} />
    </section>
  );
}
