import React, { useEffect, useState } from 'react';
import RecruitPostAPI from '../../apis/RecruitPostAPI';
import MyPageTemplate from '../../components/MyPageTemplate';
import { useLoginStore } from '../../stores/LoginStore';
import { PostCardType } from '../../types/types';
import ArticleCard from '../../components/ArticleCard';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { useSearchPostStore } from '../../stores/SearchPostStore';

function LikedPost () {
  const {userId} = useLoginStore();
  const {search} = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [postList, setPostList] = useState<PostCardType[]>([])
  const [totalPages, setTotalPages] = useState<number>(0);
  const {pageStore} = useSearchPostStore();

  useEffect(() => {
    if (userId) {
      RecruitPostAPI.LoadLikedPost(userId, search)
      .then((res) => {
        console.log(res.data);
        setPostList(res.data.posts);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [userId, search]);

  useEffect(() => {
    if (userId && pageStore) {
      setSearchParams({page: pageStore});
    }
  }, [pageStore]);

  return (
    <MyPageTemplate>
      <div className='flex flex-col gap-5'>
        <ul className='flex flex-col gap-2 xl:grid xl:auto-rows-auto xl:grid-cols-2'>
          {postList.map((post, index) =>
          <li key={index}><Link to={'/recruit/' + post.id.toString()} ><ArticleCard postInfo={post} /></Link></li>
          )}
        </ul>
        <Pagination type={false} totalPage={totalPages - 1} />
      </div>
    </MyPageTemplate>
  )
}

export default LikedPost;