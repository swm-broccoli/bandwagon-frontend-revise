import React from 'react';
import ExamplePic from '../../assets/examplepic.jpeg';

import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import BandInfoCard from '../../components/BandInfoCard';
import BandApplyBox from './BandApplyBox';

function BasicInfoBox () {
  return (
    <div className='row-start-1 col-start-2 flex flex-col gap-6 w-fit pb-4'>
      <h3 className='text-accent text-sm'>구인글</h3>
      <h1 className='text-accent text-2xl'>여름방학 같은 설렘을 같이 할 밴드 키보드 모집합니다.</h1>
      <div className='flex flex-row w-fit h-fit items-center'>
        <img src={ExamplePic} className='w-7 h-7 mr-2.5 object-cover rounded-full'/>
        <div className='py-px text-base text-accent'>
          김도하
        </div>
      </div>
    </div>
  );
};

function ReadArticleCard () {
  return (
    <div className='row-start-3 col-start-2 flex flex-col gap-3 w-full h-fit'>
      <h3 className='text-accent text-base'>밴드 정보</h3>
      <div className='w-full h-fit p-5 border border-[#e5e5e5] border-solid rounded-xl gap-7'>
      그리운 건 많을수록 좋아! 지나간 무언가에 대한 이야기만 줄기차게 늘어놓았던 그동안의 우리에 대해서 내 스스로도 변명이 필요했어요. 그게 곧 이 노래집에 수록될 곡을 추리는 주제가 되었고요. 그다지 진취적이지도 특별나지도 않은 머물러있던 그대로. 그동안 보여드렸던 잔나비의 음악 그대로를 담아보았습니다. 그리운 것들 마음껏 주워 담을 수 있는 그릇 같은 곡들이에요. 개인적으로는, 어떤 앨범보다 의미가 짙어요. 잔나비 음악의 청사진을 담게 될 3집에 대한 욕심과 집념은 잠시 제쳐두고, 지나칠 뻔한 우리의 본분을 깨닫게 해 준 고맙고 착한 앨범입니다.
      </div>
    </div>
  );
};

function ReadRecruitPage () {
  return (
    <>
      <GlobalNavBar />
      <div className='flex justify-center w-full h-fit'>
        <div className='grid grid-cols-[1fr_6fr_1fr] md:grid-cols-[2fr_6fr_2fr_1fr] auto-rows-auto w-full h-fit gap-y-5 py-10 max-w-7xl'>
          <BasicInfoBox />
          <div className='row-start-2 col-start-2'>
            <BandInfoCard type={false} />
          </div>
          <ReadArticleCard />
          <div className='row-start-4 col-start-2 md:row-start-2 md:col-start-3 md:mt-9 md:justify-self-end'><BandApplyBox /></div>
        </div>
      </div>
      <GlobalFooter />
    </>
  )
};

export default ReadRecruitPage;