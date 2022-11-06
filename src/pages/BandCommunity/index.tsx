import { useEffect, useState } from 'react';
import MainPageAPI from '../../apis/MainPageAPI';
import PortfolioAPI from '../../apis/PortfolioAPI';
import { BandProfileType } from '../../types/types';
import { vacantBandProfile } from '../BandProfile/initialBandProfile';

interface CommunityPost {
  id: number;
  type: number;
  title: string;
  date: Date;
  content: string;
  author: string; // 이메일을 넣어야 할 것 같다.
}

// type 1: 공지사항, 2 : 자유

const postType: { [id: number]: string } = {
  1: '공지',
  2: '자유',
};

const communityPostList: CommunityPost[] = [
  {
    id: 1,
    type: 1,
    date: new Date(),
    title: '우리 밴드 10.24 공연',
    content: '10.24에 공연합니다. 참여해주세요.',
    author: '김성현',
  },
  {
    id: 2,
    type: 2,
    date: new Date(),
    title: '박주람 멘토님 멘토링.....',
    content: '최고의 멘토님',
    author: '김지연',
  },
  {
    id: 3,
    type: 1,
    date: new Date('2022-10-21'),
    title: '월요일엔 박주람 멘토님과 함께',
    content: '월요일은 박주람',
    author: '김성현',
  },
];

function CommunityPostTitle({ post }: { post: CommunityPost }) {
  return (
    <div className='w-96 flex flex-row justify-between'>
      <span>{post.id}</span>
      <div>{postType[post.type]}</div>
      <h1>{post.title}</h1>
      <div>{post.date.toISOString().split('T')[0]}</div>
      <div>{post.author}</div>
    </div>
  );
}

function BandCommunityProfile({ Profile }: { Profile: BandProfileType }) {
  // 공지는 날짜 순으로 정렬되어 있어야 한다.
  const recentNotice = communityPostList.find((post) => post.type === 1);

  useEffect(() => {
    console.log(recentNotice);
  }, []);

  return (
    <>
      <div className='flex flex-row'>
        <img
          className='h-20'
          src={Profile.avatarUrl}
          alt='밴드 프로필 이미지'
        />
        <h1>{Profile.name} 밴드 게시판입니다.</h1>
      </div>
      <div className='bg-base-300'>
        <h1>최근 공지사항</h1>
        <div>{recentNotice?.title}</div>
      </div>
    </>
  );
}

function BandCommunityPage() {
  const [communityProfile, setCommunityProfile] =
    useState<BandProfileType>(vacantBandProfile);

  useEffect(() => {
    PortfolioAPI.getBandPortfolioInfo(5).then((res) => {
      console.log(res.data);
      setCommunityProfile(res.data);
    });
  }, []);

  return (
    <section>
      <h1 className='h-12 font-bold text-2xl'>밴드 게시판 페이지</h1>
      <BandCommunityProfile Profile={communityProfile} />
      {communityPostList.map((post) => {
        return <CommunityPostTitle key={post.id} post={post} />;
      })}
    </section>
  );
}

export default BandCommunityPage;
