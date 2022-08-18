import React from 'react';
import { useNavigate } from 'react-router-dom';

function ClickedTabMenu (props: {label: string}) {
  return (
    <button className='flex flex-col w-10 h-10 items-center'>
      <p className='w-fit h-[1.625rem] text-lg text-primary'>{props.label}</p>
      <div className='w-full h-1 mt-[0.625rem] bg-primary'></div>
    </button>
  );
};

function TabMenu (props: {label: string}) {
  const navigate = useNavigate();

  function handleClick (e: React.MouseEvent<HTMLButtonElement>) {
    if (props.label == '구인') {
      navigate('/recruit/band');
    } else if (props.label == '구직') {
      navigate('/recruit/user');
    } 
  }

  return (
    <button
      onClick={handleClick}
      className='flex flex-col w-10 h-10 items-center'>
      <p className='text-lg text-[#ababab]'>{props.label}</p>
    </button>
  );
}

// true: 구인, false: 구직
function RecruitTab (props: {clicked: boolean}) {
  return (
    <div className='flex flex-row gap-[0.375rem] row-start-1 col-start-2 w-[5.375rem] h-10 pt-12'>
      {props.clicked ?
      <><ClickedTabMenu label='구인' /><TabMenu label='구직' /></> :
      <><TabMenu label='구인' /><ClickedTabMenu label='구직' /></>}
    </div>
  );
};

export default RecruitTab;