import React from 'react';
import ArticleCard from './ArticleCard';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import Button from '../../components/Button';
import RecruitTab from './RecruitTab';
import SearchBox from './SearchBox';

function RecruitPage() {
  return (
    <>
      <GlobalNavBar />
      <div className='flex flex-col gap-2 items-center'>
        <RecruitTab clicked={true} />
        <RecruitTab clicked={false} />
        <Button label='글쓰기' x='w-[7.5rem] ' y='h-10 ' textSize='text-sm' />
        <SearchBox />
        <div className='flex flex-row flex-wrap justify-center'>
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
        </div>
    </div>
    <GlobalFooter />
    </>
  );
}

export default RecruitPage;
