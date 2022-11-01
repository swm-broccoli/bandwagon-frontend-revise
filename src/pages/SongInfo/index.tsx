import React, {useEffect, useState} from 'react';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import ExamplePic from '../../assets/examplepic.png';
import GuitarIcon from '../../assets/sheetInfo/ic_instruments2.svg';
import BassIcon from '../../assets/sheetInfo/ic_instruments3.svg';
import DrumIcon from '../../assets/sheetInfo/ic_instruments4.svg';
import KeyboardIcon from '../../assets/sheetInfo/ic_instruments5.svg';
import YesIcon from '../../assets/ico_yes.svg';
import NoneIcon from '../../assets/ico_none.svg';

const sessionList = [
  {
    label: '기타',
    img: GuitarIcon
  },
  {
    label: '베이스',
    img: BassIcon
  },
  {
    label: '드럼',
    img: DrumIcon
  },
  {
    label: '키보드',
    img: KeyboardIcon
  },
];

const siteInfoList = [
  {
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
  }
];

function DivisionLine () {
  return (
    <div className='max-w-2xl w-10/12 bg-base-200 h-px' />
  )
}

function SongBasicInfo (props: {title: string, artist: string}) {
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
        <p className='border border-base-200 rounded-xl p-4'>
          {props.lyrics}
        </p>
      </div>
    </div>
  )
}

function SheetInfoTitle() {
  return (
    <div className='flex mb-2'>
      <h2 className='text-base text-accent w-1/3'>악보 정보</h2>
      <div className='flex w-full justify-between pr-[4%] md:pr-[9%]'>
        {sessionList.map((session, index) =>
          <div key={index} className='flex flex-col gap-2 items-center'>
            <div className='hidden md:flex justify-items-center h-9'>
              <img src={session.img} />
              </div>
            <p className='text-accent text-xs'>{session.label}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SheetInfoElement(props: {sheetInfo: {
  site: string,
  sheet: boolean[]
}}) {
  return (
    <div className='flex items-center bg-[#f4f9f9] rounded-xl h-12'>
      <div className='w-4/12'>
      <h2 className='text-sm text-accent ml-3 md:ml-5'>
        {props.sheetInfo.site}
      </h2>
      </div>
      <div className='flex w-full justify-between pr-[4%] md:pr-[9%]'>
        {props.sheetInfo.sheet.map((info, index) =>
          info ?
            <div className='flex justify-center w-9'>
              <img src={YesIcon} />
            </div> :
            <div className='flex justify-center w-9'>
              <img src={NoneIcon} />
            </div>)
        }
      </div>
    </div>
  )
}

function SheetInfo(props: {sheetInfo: {
  site: string,
  sheet: boolean[]
}[]}) {
  return (
    <div className='flex flex-col gap-1 w-10/12 max-w-2xl px-[15px]'>
      <SheetInfoTitle />
      {props.sheetInfo.map((sheet, index) =>
        <SheetInfoElement sheetInfo={sheet} />)}
    </div>
  )
}

function CoverInfo() {
  return (
    <div className='flex flex-col w-10/12 max-w-2xl px-[15px] gap-5'>
      <h2 className='text-base text-accent'>이 곡을 연주한 밴드들</h2>
      <button className='btn btn-block text-sm text-accent font-normal h-10 bg-white border-base-200'>더보기</button>

    </div>
  )
}

function SongInfoPage () {
  return (
    <>
      <GlobalNavBar />
      <div className='flex flex-col my-10 gap-4 items-center'>
        <SongBasicInfo title='노래 제목' artist='가수' />
        <DivisionLine />
        <LyricsInfo lyrics='가나다라마바사' />
        <DivisionLine />
        <SheetInfo sheetInfo={siteInfoList} />
        <DivisionLine />
        <CoverInfo />
        <DivisionLine />
      </div>
      <GlobalFooter />
    </>
  )
}

export default SongInfoPage;

