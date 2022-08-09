import React from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../assets/examplepic.jpeg'
import TagElement from './TagElement';

function ProfilePic () {
  return (
    <img src={profilePic} className='md:row-start-1 md:row-end-3 md:col-start-1 justify-self-center w-48 h-48 rounded-full'/>
  );
};

function TextInfo (props: {
  label: string,
  text: string,
}) {
  return (
    <div className='flex flex-col gap-[0.325rem]'>
      <h3 className='text-[#888888] text-sm'>{props.label}</h3>
      <p className='text-accent text-base'>{props.text}</p>
    </div>
  );
};

function MemberInfo () {
  return (
    <div className='flex flex-col gap-3 md:row-start-3 md:col-start-1 md:col-end-3 w-full h-fit'>
      <h3 className='text-[#888888] text-sm'>멤버 현황</h3>
      <MemberList members={['김민지', '김도하', '다니엘', '혜린', '이유한']} />
    </div>
  );
};

function MemberList (props: {members: string[]}) {
  return (
    <ul className='w-full flex flex-row flex-wrap gap-x-7 gap-y-2'>
      {props.members.map((member, index) =>
        <li key={index} className='flex flex-row gap-[0.625rem] items-center'>
          <img src={profilePic} className='w-7 h-7 rounded-full'/>
          <p className='text-accent text-base font-medium'>{member}</p>
          <TagElement tag='기타' />
        </li>
      )}
    </ul>
  )
}

function GenreInfo (props: {genres: string[]}) {
  return (
    <div className='flex flex-col gap-3 md:row-start-5 md:col-start-1 md:col-end-3 w-full h-fit'>
      <h3 className='text-[#888888] text-sm'>선호 장르</h3>
      <ul className='w-full flex flex-row flex-wrap gap-x-1.5 gap-y-2'>
      {props.genres.map((genre, index) =>
        <li key={index}>
          <TagElement tag={genre} />
        </li>
      )}
    </ul>
    </div>
  );
};

// true -> 글쓰기, false -> 글 보기
function BandInfoCard (props: {type: boolean}) {
  return (
    <div className='flex flex-col gap-3 w-full h-fit'>
      <div className='grid grid-cols-2 items-center'>
        <h3 className='col-start-1 text-accent text-base'>밴드 정보</h3>
        {props.type ?
          <Link to='/profile/band' className='col-start-2 justify-self-end text-sm text-primary'>
            수정
          </Link> : <></>
        }
      </div>
      <div className='flex flex-col md:grid md:grid-cols-2 md:auto-rows-auto w-full h-fit px-[14%] py-7 border border-[#e5e5e5] border-solid rounded-xl gap-7'>
        <ProfilePic />
        <div className='md:row-start-1 md:col-start-2 md:self-end'><TextInfo label='밴드명' text='너바나트위스트밴드' /></div>
        <div className='md:row-start-2 md:col-start-2'><TextInfo label='나이대' text='20대~40대' /></div>
        <MemberInfo />
        <div className='md:row-start-4 md:col-start-1 md:self-end'><TextInfo label='활동 요일' text='금, 토, 일' /></div>
        <div className='md:row-start-4 md:col-start-2 md:self-end'><TextInfo label='활동 지역' text='서울 용산구, 서울 마포구' /></div>
        <GenreInfo genres={['어쿠스틱', '인디', '재즈']}/>
      </div>
    </div>
  );
};

export default BandInfoCard;