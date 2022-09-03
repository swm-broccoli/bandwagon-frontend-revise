interface RecommendedRecruitmentItemType {
  image: string;
  region: string;
  title: string;
}

export const tempRecommendedRecruitments: RecommendedRecruitmentItemType[] = [
  {
    image: 'https://picsum.photos/200',
    region: '서울',
    title: '서울 마포구 밴드 기타 모집합니다.',
  },
  {
    image: 'https://picsum.photos/201',
    region: '인천',
    title: '인천 부평 밴드 여보컬 모집합니다.',
  },
  {
    image: 'https://picsum.photos/200',
    region: '경기',
    title: '일산 백석 직밴 건반 모십니다.',
  },
  {
    image: 'https://picsum.photos/200',
    region: '경기',
    title: '경기 구리시 밴드 베이스 모십니다.',
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

export function RecommendedRecruitments({
  recruitments,
}: {
  recruitments: RecommendedRecruitmentItemType[];
}) {
  return (
    <section className='bg-[#f4f9f9] h-72 flex flex-col md:flex-row self-center pt-6'>
      <div className='col-start-2 place-self-center md:place-self-auto'>
        <h1 className='text-2xl font-bold'>추천 구인·구직글</h1>
        <h2 className='text-neutral'>R E C O M M E N D</h2>
      </div>
      <div className='flex flex-row'>
        {recruitments.map((recruitment) => (
          <RecommendedRecruitmentItem
            key={recruitment.title}
            recruitment={recruitment}
          />
        ))}
      </div>
    </section>
  );
}
