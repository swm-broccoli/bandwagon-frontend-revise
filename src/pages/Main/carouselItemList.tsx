import carouselImage from '../../assets/carousel-intro.jpg';
import carouselImage2 from '../../assets/carousel-paragon.jpg';
import carouselImage3 from '../../assets/carousel-house.jpg';
import carouselImage4 from '../../assets/carousel-woman.jpg';
import carouselImage5 from '../../assets/carousel-wallpaper.jpg';
import carouselImage6 from '../../assets/examplepic.png';

export interface CarouselItemType {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  content: string;
  link: string;
}

export const carouselItemList: CarouselItemType[] = [
  {
    id: 0,
    image: carouselImage,
    title: '환영합니다',
    subtitle: '이건 첫번째 샘플 캐로셀입니다.',
    content: '샘플 캐로셀의 내용입니다.',
    link: '/login',
  },
  {
    id: 1,
    image: carouselImage2,
    title: '환영합니다 2',
    subtitle: '이건 두번째 샘플 캐로셀입니다.',
    content: '샘플 캐로셀의 내용입니다.',
    link: '/',
  },
  {
    id: 2,
    image: carouselImage3,
    title: '환영합니다 3',
    subtitle: '이건 세번째 샘플 캐로셀입니다.',
    content: '샘플 캐로셀의 내용입니다.',
    link: '/',
  },
  {
    id: 3,
    image: carouselImage4,
    title: '환영합니다 4',
    subtitle: '이건 네번째 샘플 캐로셀입니다.',
    content: '샘플 캐로셀의 내용입니다.',
    link: '/',
  },
  {
    id: 4,
    image: carouselImage5,
    title: '환영합니다 5',
    subtitle: '이건 다섯번째 샘플 캐로셀입니다.',
    content: '샘플 캐로셀의 내용입니다.',
    link: '/',
  },
  {
    id: 5,
    image: carouselImage6,
    title: '환영합니다 6',
    subtitle: '이건 여섯번째 샘플 캐로셀입니다.',
    content: '샘플 캐로셀의 내용입니다.',
    link: '/',
  },
];
