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
      className='grid grid-flow-row flex-1 min-w-[150px] gap-2'
      to={`/recruit/${recruitment.id}`}
    >
      <img className='rounded-lg object-fill' src={recruitment.image} />
      <div className='flex flex-row'>
        {recruitment.recruitInfo.map((info) => (
          <span
            key={info.id}
            className='badge badge-secondary badge-outline mr-2 text-sm text-gray-500 font-sans-kr'
          >
            {positionToKorean[info.name]}
          </span>
        ))}
      </div>
      <p className='font-sans-kr'>{recruitment.title}</p>
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
    <section className='bg-[#f4f9f9] grid grid-cols-6 py-5 md:py-10'>
      <div className='col-span-full lg:col-start-2 lg:col-end-6 flex flex-col md:flex-row px-5 md:px-10 lg:px-0'>
        <div className='col-start-2 place-self-center md:place-self-auto mx-4 min-w-[160px]'>
          <h1 className='text-xl font-bold font-sans-kr'>추천 구인·구직글</h1>
          <h2 className='text-neutral font-montserrat'>R E C O M M E N D</h2>
        </div>
        <div className='flex flex-row justify-center overflow-x-auto w-full mt-5 md:mt-0 gap-5'>
          {localStorage.getItem('userID') ? (
            recruitments.map((recruitment) => (
              <RecommendedRecruitmentItem
                key={recruitment.id}
                recruitment={recruitment}
              />
            ))
          ) : (
            <div className='flex flex-col items-center'>
              <h2>로그인을 하시면 딱 맞는 밴드를 추천해 드려요!</h2>
              <Link to='/login'>
                <button className='btn btn-primary btn-outline'>
                  로그인하러 가기
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
