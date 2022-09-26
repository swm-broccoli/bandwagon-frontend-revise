import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainPageAPI from '../../apis/MainPageAPI';
import { positionToKorean } from '../../assets/options/positionOptions';

interface RecommendedRecruitmentItemType {
  id: number;
  image: string;
  recruitInfo: { id: string; name: string }[];
  title: string;
}

function RecommendedRecruitmentItem({
  recruitment,
}: {
  recruitment: RecommendedRecruitmentItemType;
}) {
  return (
    <Link
      className='grid grid-flow-row flex-1 min-w-[150px] mx-3 gap-2'
      to={`/recruit/${recruitment.id}`}
    >
      <img className='rounded-lg object-fill' src={recruitment.image} />
      <div className='flex flex-row'>
        {recruitment.recruitInfo.map((info) => (
          <span
            key={info.id}
            className='badge badge-secondary badge-outline mr-2 text-sm text-gray-500'
          >
            {positionToKorean[info.name]}
          </span>
        ))}
      </div>
      <p>{recruitment.title}</p>
    </Link>
  );
}

export function RecommendedRecruitments() {
  const [recruitments, setRecruitments] = useState<
    RecommendedRecruitmentItemType[]
  >([]);

  useEffect(() => {
    MainPageAPI.getRecommendedRecruits().then((res) => {
      setRecruitments(
        res.data.posts.map((recruit: any): RecommendedRecruitmentItemType => {
          return {
            id: recruit.id,
            image:
              recruit.dtype === 'Band'
                ? recruit.bandAvatarUrl
                : recruit.userAvatarUrl,
            recruitInfo: recruit.tagInfo,
            title: recruit.title,
          };
        }),
      );
      console.log(res.data.posts);
    });
  }, []);

  return (
    <section className='bg-[#f4f9f9] grid grid-cols-6 py-10'>
      <div className='col-span-full lg:col-start-2 lg:col-end-6 flex flex-col md:flex-row'>
        <div className='col-start-2 place-self-center md:place-self-auto mx-4 min-w-[160px]'>
          <h1 className='text-2xl font-bold'>추천 구인·구직글</h1>
          <h2 className='text-neutral'>R E C O M M E N D</h2>
        </div>
        <div className='flex flex-row overflow-x-auto w-full mt-5 md:mt-0'>
          {recruitments.map((recruitment) => (
            <RecommendedRecruitmentItem
              key={recruitment.title}
              recruitment={recruitment}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
