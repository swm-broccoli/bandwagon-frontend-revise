import React, { useEffect, useState } from 'react';
import RecruitPostAPI from '../../apis/RecruitPostAPI';
import ArticleCard from '../../components/ArticleCard';
import MyPageTemplate from '../../components/MyPageTemplate';
import { PostCardType } from '../../types/types';

function Tab (props: {label: string}) {
  return (
    <h2 className='flex flex-col w-10 h-10 items-center'>
      <p className='w-fit h-[1.625rem] text-lg text-primary'>{props.label}</p>
      <div className='w-full h-1 mt-[0.625rem] bg-primary'></div>
    </h2>
  );
}

function MyPostPage () {
  const [userPost, setUserPost] = useState<PostCardType>();
  const [bandPost, setBandPost] = useState<PostCardType[]>([]);

  useEffect(() => {
    RecruitPostAPI.LoadMyUserPost()
    .then((res) => {
      setUserPost(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

    RecruitPostAPI.LoadMyBandPost()
    .then((res) => {
      setBandPost(res.data.posts);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <MyPageTemplate>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col'>
          <Tab label='구직' />
          {userPost ?
            <ArticleCard postInfo={userPost} /> :
            <></>}
        </div>
        <div className='flex flex-col'>
          <Tab label='구인' />
          {bandPost ?
          bandPost.map((post, index) => 
            <ArticleCard key={index} postInfo={post} />) :
          <></>
          }
        </div>
      </div>
    </MyPageTemplate>
  )
};

export default MyPostPage;