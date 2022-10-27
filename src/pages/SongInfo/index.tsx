import React, {useEffect, useState} from 'react';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import ExamplePic from '../../assets/examplepic.png';

const sessionList = ['기타', '베이스', '드럼', '키보드'];
const siteInfoList = [{
  site: '사이트 1',
  sheet: [true, true, false, false]
  },
  {
    site: '사이트 2',
    sheet: [true, true, true, true]
  },
  {
    site: '사이트 3',
    sheet: [false, false, false, false]
  },
  {
    site: '사이트 4',
    sheet: [false, false, true, true]
  }];

function DivisionLine () {
  return (
    <div className='max-w-2xl w-10/12 bg-base-200 h-px' />
  )
}

function SongBaiscInfo (props: {title: string, artist: string}) {
  return (
    <div className='flex flex-col gap-2 mb-8 items-center'>
      <img src={ExamplePic} className='w-36 h-36 object-cover rounded-xl'/>
      <h2 className='mt-2 text-xl text-accent'>{props.title}</h2>
      <h4 className='text-lg text-neutral'>{props.artist}</h4>
    </div>
  )
}

function LyricsInfo (props: {lyrics: string}) {
  return (
    <div className="collapse collapse-arrow w-10/12 max-w-2xl">
      <input type="checkbox" /> 
        <div className="collapse-title text-base text-accent">
          가사
        </div>
      <div className="collapse-content"> 
        <p className='border border-base-200 rounded-xl p-4'>{props.lyrics}</p>
      </div>
    </div>
  )
}

function SongInfoPage () {
  return (
    <>
      <GlobalNavBar />
      <div className='flex flex-col my-10 gap-4 items-center'>
        <SongBaiscInfo title='노래 제목' artist='가수' />
        <DivisionLine />
        <LyricsInfo lyrics='가나다라마바사' />
        <DivisionLine />
        <div className='grid grid-cols-5 grid-rows-4 gap-4'>
          <h2>악보 정보</h2>
          {sessionList.map((session, index) =>
          <h2 className={'col-start-' + (index + 2).toString()}>{session}</h2>)}
          {siteInfoList.map((site, index) =>
            <h2 className={'row-start-' + (index + 2).toString()}>{site.site}</h2>)}
          {siteInfoList.map((siteInfo, index) =>
            siteInfo.sheet.map((sheet, index2) =>
              <p className={'row-start-' + (index + 2).toString() + 'col-start-' + (index2 + 2).toString()}>
                {sheet ? 'O' : 'X'}
              </p>))}
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

