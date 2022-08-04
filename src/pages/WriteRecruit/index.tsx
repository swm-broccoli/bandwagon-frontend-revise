import React from 'react';
import Button from '../../components/Button';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';

function TitleTextField () {
  return (
    <input
      placeholder='제목을 입력하세요'
      className='input input-bordered w-full h-[3.125rem] focus:outline-none focus:border-primary text-accent text-base'/>
  );
};

function WriteRecruitPage () {
  return (
    <>
    <GlobalNavBar />
    <div className='flex justify-center w-full h-fit py-10'>
      <div className='flex flex-col gap-6 w-9/12 max-w-3xl'>
        {/* 글쓰기 알림, 등록 버튼 */}
        <div className='grid grid-cols-2 items-center mb-4'>
          <h2 className='col-start-1 text-accent text-2xl'>글쓰기 (구인)</h2>
          <div className='col-start-2 justify-self-end'>
            <Button label='등록' x='w-[7.5rem] ' y='h-10' textSize='text-sm'/>
          </div>
        </div>
        {/* 제목 입력 */}
        <TitleTextField />
        {/* 밴드 정보 */}
        {/* 본문 쓰기 */}
        {/* 모집 정보 (지원 조건, 추가 지원 양식) */}
      </div>
    </div>
    <GlobalFooter />
    </>
  )
}

export default WriteRecruitPage;