import React from 'react';
import { Link } from 'react-router-dom';

function ClickedTabMenu (props: {label: string}) {
  return (
    <button className='flex flex-col w-10 h-10 items-center'>
      <p className='w-fit h-[1.625rem] text-lg text-primary'>{props.label}</p>
      <div className='w-full h-1 mt-[0.625rem] bg-primary'></div>
    </button>
  );
};

function TabMenu (props: {label: string}) {
  return (
    <button
      className='flex flex-col w-10 h-10 items-center'>
      <p className='text-lg text-[#ababab]'>{props.label}</p>
    </button>
  );
}

// true: 구인, false: 구직
function RecruitTab (props: {clicked: boolean}) {
  return (
    <div className='flex flex-row gap-[0.375rem] w-[5.375rem] h-10'>
      {props.clicked ?
      <>
        <ClickedTabMenu label='구인' />
        <Link to='/recruit/user'><TabMenu label='구직' /></Link>
      </> :
      <>
        <Link to='/recruit/band'><TabMenu label='구인' /></Link>
        <ClickedTabMenu label='구직' />
      </>}
    </div>
  );
};

export default RecruitTab;