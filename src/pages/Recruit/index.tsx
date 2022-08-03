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
      <div className='grid grid-cols-[1fr_3fr_3fr_1fr] auto-rows-auto'>
        <RecruitTab clicked={true} />
        <div className='row-start-1 col-start-3 justify-self-end pt-12'>
          <Button label='글쓰기' x='w-[7.5rem] ' y='h-10 ' textSize='text-sm' />
        </div>
        <SearchBox />
        <div className='row-start-3 col-start-2 text-xl mt-14'>새 글 </div>
        <div className='row-start-4 col-start-2 col-end-4 grid grid-cols-1 lg:grid-cols-2 flex-wrap gap-[3%] justify-center'>
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
