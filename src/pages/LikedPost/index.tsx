import React, { useEffect, useState } from 'react';
import RecruitPostAPI from '../../apis/RecruitPostAPI';
import MyPageTemplate from '../../components/MyPageTemplate';
import { useLoginStore } from '../../stores/LoginStore';
import { PostCardType } from '../../types/types';
import ArticleCard from '../../components/ArticleCard';

function LikedPost () {
  const [postList, setPostList] = useState<PostCardType[]>([])

  useEffect(() => {
    RecruitPostAPI.LoadLikedPost(useLoginStore.getState().userId)
    .then((res) => {
      console.log(res.data);
      setPostList(res.data.posts);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <MyPageTemplate>
      {postList.map((post, index) =>
      <ArticleCard postInfo={post} />
      )}
    </MyPageTemplate>
  )
}

export default LikedPost;