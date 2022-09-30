import { CarouselNavigation } from './CarouselNavigation';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useLoginStore } from '../../../stores/LoginStore';

export interface CarouselItemType {
  id: number;
  title: string;
  subtitle: string;
  link: string;
}

export interface CarouselIndexType {
  previousIndex: number;
  currentIndex: number;
}

const CarouselItemStates = {
  CURRENT: 'current',
  PREVIOUS: 'previous',
  INACTIVE: 'inactive',
} as const;
type CarouselItemStateType =
  typeof CarouselItemStates[keyof typeof CarouselItemStates];

function CarouselItem({
  item,
  itemState,
}: {
  item: CarouselItemType;
  itemState: CarouselItemStateType;
}) {
  const carouselItemStateConfig = {
    [CarouselItemStates.CURRENT]: 'opacity-100',
    [CarouselItemStates.PREVIOUS]: 'opacity-0 z-10',
    [CarouselItemStates.INACTIVE]: 'hidden',
  };

  return itemState !== CarouselItemStates.INACTIVE ? (
    <Link
      to={item.link}
      className={`bg-base-200 absolute flex flex-col justify-center items-center w-full h-full shrink-0 transition-opacity duration-500 ${carouselItemStateConfig[itemState]}`}
    >
      <h2 className='text-2xl font-sans-kr'>{item.title}</h2>
      <p className='text-base font-sans-kr'>{item.subtitle}</p>
    </Link>
  ) : null;
}

export function Carousel() {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  const [items, setItems] = useState<CarouselItemType[]>([
    {
      id: 1,
      title: '모든 밴드들의 커뮤니티, 밴드웨건입니다.',
      subtitle: '새롭게 함께할 사람들을 찾고 추억을 쌓아가요.',
      link: isLoggedIn ? '/recruit/band' : '/login',
    },
    {
      id: 2,
      title: '당신의 추억을 정리해 드립니다.',
      subtitle: '밴드 활동의 기록을 남겨보세요.',
      link: isLoggedIn ? '/portfolio/user' : '/login',
    },
  ]);

  const [carouselIndex, setCarouselIndex] = useState<CarouselIndexType>({
    previousIndex: items.length - 1,
    currentIndex: 0,
  });

  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchStarted = touchPosition;
    if (touchStarted === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchStarted - currentTouch;

    if (diff > 10) {
      setCarouselIndex((prev) => ({
        previousIndex: prev.currentIndex,
        currentIndex: (prev.currentIndex + 1) % items.length,
      }));
    }
    // 차이가 음수이면 오른쪽으로 스와이프했다는 뜻
    if (diff < -10) {
      setCarouselIndex((prev) => ({
        previousIndex: prev.currentIndex,
        currentIndex: (prev.currentIndex - 1 + items.length) % items.length,
      }));
    }
    setTouchPosition(null);
  };

  // 각 캐로셀 아이템의 상태를 결정하는 함수
  const determineCarouselItemState = useCallback(
    (itemIndex: number) => {
      if (itemIndex === carouselIndex.currentIndex) {
        return CarouselItemStates.CURRENT;
      } else if (itemIndex === carouselIndex.previousIndex) {
        return CarouselItemStates.PREVIOUS;
      } else {
        return CarouselItemStates.INACTIVE;
      }
    },
    [carouselIndex],
  );

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCarouselIndex((prev) => ({
        previousIndex: prev.currentIndex,
        currentIndex: (prev.currentIndex + 1) % items.length,
      }));
    }, 3000);

    return () => {
      clearInterval(carouselTimer);
    };
  }, []);

  return (
    <section>
      <div
        className='relative flex flex-row items-end justify-between w-full h-[30vh]'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* 이 CarouselItem들은 absolute position이기 때문에 레이아웃에서 공간을 차지하지 않는다 */}
        {items.map((item, index) => (
          <CarouselItem
            key={item.id}
            item={item}
            itemState={determineCarouselItemState(index)}
          />
        ))}
        <CarouselNavigation
          items={items}
          carouselIndex={carouselIndex}
          setCarouselIndex={setCarouselIndex}
        />
      </div>
    </section>
  );
}
