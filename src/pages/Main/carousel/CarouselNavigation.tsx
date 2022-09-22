import { CarouselIndexType, CarouselItemType } from './Carousel';
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
    active: 'bg-gray-800',
    pending: 'bg-gray-500',
    inactive: 'hidden',
  };

  return (
    <button
      onClick={onItemClick}
      className={`btn btn-xs btn-circle mx-1 items-center transition-all duration-700 ${carouselItemConfig[itemState]}`}
    />
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
    <dl className='flex flex-row justify-center w-full h-[15%] z-20'>
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
    </dl>
  );
}
