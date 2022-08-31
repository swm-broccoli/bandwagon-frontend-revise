import recruitMenu1 from '../../assets/mainRecruitMenu/recruit-menu-1.png';
import recruitMenu2 from '../../assets/mainRecruitMenu/recruit-menu-2.png';
import recruitMenu3 from '../../assets/mainRecruitMenu/recruit-menu-3.png';
import recruitMenu4 from '../../assets/mainRecruitMenu/recruit-menu-4.png';
import recruitMenu5 from '../../assets/mainRecruitMenu/recruit-menu-5.png';
import { Link } from 'react-router-dom';

export const recruitMenuList = [
  {
    image: recruitMenu1,
    title: '기타 구인구직',
    link: '/recruit/user',
  },
  {
    image: recruitMenu2,
    title: '베이스 구인구직',
    link: '/recruit/band',
  },
  {
    image: recruitMenu3,
    title: '보컬 구인구직',
    link: '/recruit/user',
  },
  {
    image: recruitMenu4,
    title: '건반 구인구직',
    link: '/recruit/band',
  },
  {
    image: recruitMenu5,
    title: '드럼 구인구직',
    link: '/recruit/user',
  },
];

function RecruitMenuItem({
  image,
  title,
  link,
}: {
  image: string;
  title: string;
  link: string;
}) {
  return (
    <Link to={link} className='flex flex-col items-center mx-1'>
      <img className='scale-75 h-[52.5px]' src={image} alt={title} />
      <div className='text-sm mt-1 title'>{title}</div>
    </Link>
  );
}

export function RecruitMenu({
  menuList,
}: {
  menuList: { image: string; title: string; link: string }[];
}) {
  return (
    <section className='grid grid-cols-6 h-28 items-center'>
      <div className='col-span-full md:col-start-2 md:col-end-6 py-0 min-h-fit bg-base-100 flex flex-row justify-evenly'>
        {menuList.map((item) => (
          <RecruitMenuItem
            key={item.title}
            image={item.image}
            title={item.title}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
}
