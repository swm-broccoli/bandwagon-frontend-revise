import React, { useEffect, useState } from 'react';
import RecruitPostAPI from '../../apis/RecruitPostAPI';
import MyPageTemplate from '../../components/MyPageTemplate';
import { useLoginStore } from '../../stores/LoginStore';
import { PostCardType } from '../../types/types';
import ArticleCard from '../../components/ArticleCard';
import { Link } from 'react-router-dom';

function LikedPost () {
  const {userId} = useLoginStore();
  const [postList, setPostList] = useState<PostCardType[]>([])

  useEffect(() => {
    if (userId) {
      RecruitPostAPI.LoadLikedPost(userId)
      .then((res) => {
        console.log(res.data);
        setPostList(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [userId]);

  return (
    <MyPageTemplate>
      <ul className='flex flex-col gap-2 xl:grid xl:auto-rows-auto xl:grid-cols-2'>
        {postList.map((post, index) =>
        <li key={index}><Link to={'/recruit/' + post.id.toString()} ><ArticleCard postInfo={post} /></Link></li>
        )}
      </ul>
    </MyPageTemplate>
  )
}

export default LikedPost;