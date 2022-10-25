import React, {useEffect, useState} from 'react';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import ExamplePic from '../../assets/examplepic.png';

function SongInfoPage () {
  return (
    <>
      <GlobalNavBar />
      <div className='flex flex-col my-4 gap-2 items-center'>
        <img src={ExamplePic} className='w-36 h-36 object-cover rounded-xl'/>
        <h2>노래 제목</h2>
        <h4>가수</h4>
        <div className='flex flex-col'>
          <h2>가사</h2>
          <p>가나다라마바사아자차카타파하</p>
        </div>
        <div className='grid grid-cols-6 grid-rows-4 gap-4'>
          <h2>악보 정보</h2>
          <h2 className='col-start-2'>보컬</h2>
          <h2 className='col-start-3'>기타</h2>
          <h2 className='col-start-4'>베이스</h2>
          <h2 className='col-start-5'>피아노</h2>
          <h2 className='col-start-6'>드럼</h2>
          <h2 className='row-start-2'>사이트1</h2>
          <p className='row-start-2 col-start-2'>O</p>
          <p className='row-start-2 col-start-3'>X</p>
          <p className='row-start-2 col-start-4'>X</p>
          <p className='row-start-2 col-start-5'>O</p>
          <p className='row-start-2 col-start-6'>O</p>
        </div>
        <div className='flex flex-col'>
          <h2>이 곡을 연주한 밴드들</h2>
          <div className='flex flex-col items-center'>
            <img src={ExamplePic} className='w-32 h-32 object-cover rounded-xl'/>
            <p>밴드 이름</p>
          </div>
        </div>
      </div>
      <GlobalFooter />
    </>
  )
}

export default SongInfoPage;

