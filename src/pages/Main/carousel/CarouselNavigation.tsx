import { CarouselItemType } from './carouselItemList';
import { CarouselIndexType } from './Carousel';
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowUp,
} from 'react-icons/io';

function CarouselNavigationItem({
  item,
  itemState,
  onItemClick,
}: {
  item: CarouselItemType;
  itemState: string;
  onItemClick: () => void;
}) {
  // active는 현재 캐로셀에서 보이고 있는 아이템에 해당하는 버튼의 상태
  // pending은 화면에는 보이지만 활성화되어 있지 않은 버튼의 상태
  const carouselItemConfig: { [key: string]: string } = {
    active: 'text-base-100',
    pending: 'brightness-50 text-gray-500',
    inactive: 'hidden',
  };

  return (
    <button
      onClick={onItemClick}
      className={`flex-1 flex flex-row mx-1 items-center transition-all duration-700 ${carouselItemConfig[itemState]}`}
    >
      <dt
        className={`hidden md:block flex-1 w-full h-full ${
          itemState === 'active' ? 'py-1.5 px-1' : 'p-2'
        }`}
      >
        <img
          className={`object-fill w-full h-full ${
            itemState === 'active' ? 'border-2 border-primary' : ''
          }`}
          src={item.image}
          alt={`carousel-item-${item.id}`}
        />
      </dt>
      <dd className='flex-1 text-sm'>{item.title}</dd>
    </button>
  );
}

//버튼의 상태를 결정하는 함수
function determineCarouselItemState(
  itemIndex: number,
  carouselCurrentIndex: number,
  carouselTotalLength: number,
) {
  if (itemIndex === carouselCurrentIndex) {
    return 'active';
  } else if (carouselCurrentIndex === 0 || carouselCurrentIndex === 1) {
    return itemIndex < 5 ? 'pending' : 'inactive';
  } else if (
    carouselCurrentIndex === carouselTotalLength - 1 ||
    carouselCurrentIndex === carouselTotalLength - 2
  ) {
    return itemIndex >= carouselTotalLength - 5 ? 'pending' : 'inactive';
  } else {
    return carouselCurrentIndex - 2 <= itemIndex &&
      itemIndex <= carouselCurrentIndex + 2
      ? 'pending'
      : 'inactive';
  }
}

export function CarouselNavigation({
  items,
  carouselIndex,
  setCarouselIndex,
}: {
  items: CarouselItemType[];
  // 현재 캐로셀이 보여주고 있는 인덱스
  carouselIndex: CarouselIndexType;
  setCarouselIndex: React.Dispatch<React.SetStateAction<CarouselIndexType>>;
}) {
  // 특정 인덱스의 페이지로 이동하는 함수
  const onCarouselNavigationItemClick = (itemIndex: number) => {
    setCarouselIndex((prev) => {
      if (prev.currentIndex === itemIndex) {
        return prev;
      } else {
        return {
          previousIndex: prev.currentIndex,
          currentIndex: itemIndex,
        };
      }
    });
  };

  const handlePrevClick = () => {
    setCarouselIndex((prev) => ({
      previousIndex: prev.currentIndex,
      currentIndex: (prev.currentIndex - 1 + items.length) % items.length,
    }));
  };

  const handleNextClick = () => {
    setCarouselIndex((prev) => ({
      previousIndex: prev.currentIndex,
      currentIndex: (prev.currentIndex + 1) % items.length,
    }));
  };

  return (
    <dl className='flex flex-row justify-center w-full h-[15%] bg-gray-400/70 z-20'>
      <div className='absolute bottom-[15%] btn btn-xs bg-gray-400/70 hover:bg-gray-400/70 w-28 h-7 z-30 border-none rounded-none rounded-t-lg text-lg tracking-[0.3rem]'>
        {carouselIndex.currentIndex + 1} / {items.length}
      </div>
      <button onClick={handlePrevClick} className='z-10 h-full'>
        <IoIosArrowBack className='text-gray-300' size={30} />
      </button>
      {items.map((item, index) => (
        <CarouselNavigationItem
          key={index}
          item={item}
          itemState={determineCarouselItemState(
            index,
            carouselIndex.currentIndex,
            items.length,
          )}
          onItemClick={() => {
            onCarouselNavigationItemClick(index);
          }}
        />
      ))}
      <button onClick={handleNextClick} className='z-10 h-full'>
        <IoIosArrowForward className='text-gray-300' size={30} />
      </button>
    </dl>
  );
}
