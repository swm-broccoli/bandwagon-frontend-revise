import React from 'react';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';

function WriteRecruitPage () {
  return (
    <>
    <GlobalNavBar />
    <div className='w-full h-fit py-12 grid auto-rows-auto grid-cols-[1fr-3fr-3fr-1fr] md:grid-cols-[5fr_3fr_3fr_5fr]'>
      {/* 글쓰기 알림, 등록 버튼 */}
      {/* 제목 입력 */}
      {/* 밴드 정보 */}
      {/* 본문 쓰기 */}
      {/* 모집 정보 (지원 조건, 추가 지원 양식) */}
    </div>
    <GlobalFooter />
    </>
  )
}

export default WriteRecruitPage;