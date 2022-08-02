import React from 'react';
import ArticleCard from '../../components/ArticleCard';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';

function RecruitPage() {
  return (
    <>
      <GlobalNavBar />
      <ArticleCard 
      id={1}
      pic='https://i.imgur.com/rmFxZua.jpeg'
      title='제목이 아주 길어졌습니다'
      authorPic='https://i.imgur.com/rmFxZua.jpeg'
      authorName='작성자'
      tags={['기타', '홍대/합정', '20대 초반']}
      isHeartChecked={false}
      />
      <ArticleCard 
      id={1}
      pic='https://i.imgur.com/rmFxZua.jpeg'
      title='내가 좋아하는 글'
      authorPic='https://i.imgur.com/rmFxZua.jpeg'
      authorName='안녕'
      tags={['기타', '홍대/합정', '20대 초반']}
      isHeartChecked={true}
      />
      <GlobalFooter />
    </>
  );
}

export default RecruitPage;
