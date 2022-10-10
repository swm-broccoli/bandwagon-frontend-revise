import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import RecruitPostAPI from '../../apis/RecruitPostAPI';
import ArticleCard from '../../components/ArticleCard';
import MyPageTemplate from '../../components/MyPageTemplate';
import Pagination from '../../components/Pagination';
import { useSearchPostStore } from '../../stores/SearchPostStore';
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
  const [totalPages, setTotalPages] = useState<number>(0);
  const {search} = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const {pageStore} = useSearchPostStore();

  useEffect(() => {
    RecruitPostAPI.LoadMyUserPost()
    .then((res) => {
      if (!res.data.errorMessage) {
        setUserPost(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });

    RecruitPostAPI.LoadMyBandPost(search)
    .then((res) => {
      console.log(res.data);
      setBandPost(res.data.posts);
      setTotalPages(res.data.totalPages);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [search]);

  useEffect(() => {
    if (pageStore) {
      setSearchParams({page: pageStore});
    }
  }, [pageStore]);

  useEffect(() => {
    console.log('check', bandPost);
  }, [bandPost])

  return (
    <MyPageTemplate>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col'>
          <Tab label='구직' />
          {userPost ?
            <Link to={'/recruit/' + userPost.id.toString()}>
              <ArticleCard postInfo={userPost} />
            </Link> :
            <p className='w-fit text-lg text-[#464646] my-8 justify-self-center'>글이 존재하지 않습니다!</p>}
        </div>
        <div className='flex flex-col'>
          <Tab label='구인' />
          {bandPost ?
          bandPost.map((post, index) => 
            <Link to={'/recruit/' + post.id.toString()}>
              <ArticleCard key={index} postInfo={post} />
            </Link>) :
            <p className='w-fit text-lg text-[#464646] my-8 justify-self-center'>글이 존재하지 않습니다!</p>
          }
        </div>
        <Pagination type={false} totalPage={totalPages - 1} />
      </div>
    </MyPageTemplate>
  )
};

export default MyPostPage;