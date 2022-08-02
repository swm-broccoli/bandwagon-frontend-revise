import React from 'react';
import ArticleCard from './ArticleCard';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import Button from '../../components/Button';
import RecruitTab from './RecruitTab';

function RecruitPage() {
  return (
    <div className='flex flex-col gap-2'>
      <GlobalNavBar />
      <RecruitTab clicked={true} />
      <RecruitTab clicked={false} />
      <Button label='글쓰기' x='w-[7.5rem] ' y='h-10 ' textSize='text-sm' />
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
    </div>
  );
}

export default RecruitPage;
