import GlobalNavBar from './NavBar/NavBar';
import MyPageMenu from './MyPageMenu';
import GlobalFooter from './Footer';
import bandProfileIcon from '../assets/bandPageIcons/bandProfileIcon.png';
import bandProfileIconActive from '../assets/bandPageIcons/bandProfileIconActive.png';
import bandMemberIcon from '../assets/bandPageIcons/bandMemberIcon.png';
import bandMemberIconActive from '../assets/bandPageIcons/bandMemberIconActive.png';
import bandCalendarIcon from '../assets/bandPageIcons/bandCalendarIcon.png';
import bandCalendarIconActive from '../assets/bandPageIcons/bandCalendarIconActive.png';
import bandCommunityIcon from '../assets/bandPageIcons/bandCommunityIcon.png';
import bandCommunityIconActive from '../assets/bandPageIcons/bandCommunityIconActive.png';
import bandPortfolioIcon from '../assets/bandPageIcons/bandPortfolioIcon.png';
import bandPortfolioIconActive from '../assets/bandPageIcons/bandPortfolioIconActive.png';
import bandApplyIcon from '../assets/bandPageIcons/bandApplyIcon.png';
import bandApplyIconActive from '../assets/bandPageIcons/bandApplyIconActive.png';

const bandPageMenuItems = [
  {
    label: '밴드 프로필',
    to: '/band/profile',
    icon: bandProfileIcon,
    activeIcon: bandProfileIconActive,
  },
  {
    label: '밴드 일정관리',
    to: '/band/schedule',
    icon: bandCalendarIcon,
    activeIcon: bandCalendarIconActive,
  },
  {
    label: '밴드 게시판',
    to: '/band/community',
    icon: bandCommunityIcon,
    activeIcon: bandCommunityIconActive,
  },
  {
    label: '밴드 포트폴리오',
    to: '/band/portfolio',
    icon: bandPortfolioIcon,
    activeIcon: bandPortfolioIconActive,
  },
  {
    label: '가입신청 관리',
    to: '/band/apply',
    icon: bandApplyIcon,
    activeIcon: bandApplyIconActive,
  },
];

function BandPageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <GlobalNavBar />
      <div className='grid grid-cols-6'>
        <div className='col-start-2 col-end-6 flex flex-col md:flex-row'>
          <div className='w-full md:w-1/5 md:col-span-1 min-w-[150px] mt-10'>
            <MyPageMenu menuList={bandPageMenuItems} />
          </div>
          <div className='md:pl-10 pt-5 md:pt-12 w-full'>{children}</div>
        </div>
      </div>
      <GlobalFooter />
    </div>
  );
}

export default BandPageTemplate;
