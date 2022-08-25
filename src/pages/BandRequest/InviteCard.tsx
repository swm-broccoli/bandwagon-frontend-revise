import React from 'react';
import { BandRequestType } from '../../types/types';
import ExamplePic from '../../assets/examplepic.png';
import { Link } from 'react-router-dom';

function InviteCard(props: {
  type: boolean
  request: BandRequestType}) {
  return (
    <div className='w-full h-full grid grid-cols-[100px_auto] grid-rows-2 gap-x-4 gap-y-2'>
      {props.type ?
        <img src={props.request.user.avatarUrl ?
          props.request.user.avatarUrl :
          ExamplePic}
          className='hidden sm:flex row-start-1 row-end-3 col-start-1 w-full h-[100px] self-center rounded-full object-cover' /> :
        <img src={props.request.band.avatarUrl ?
          props.request.band.avatarUrl :
          ExamplePic}
          className='hidden sm:flex row-start-1 row-end-3 col-start-1 w-full h-[100px] self-center rounded-full object-cover' />
      }
      {props.type ?
        <h2 className='row-start-1 col-start-1 col-end-3 sm:col-start-2 w-full truncate font-medium text-lg text-accent mt-2'>
        {props.request.user.name + ' 님에게 초대를 보냈습니다!'}
        </h2> :
        <h2 className='row-start-1 col-start-1 col-end-3 sm:col-start-2 w-full truncate font-medium text-lg text-accent mt-2'>
        {props.request.band.name + ' 밴드의 초대 요청입니다!'}
        </h2>
      }
      {props.type ?
      <button className='btn bg-base-300 border-base-300 text-gray-700 min-h-fit h-8 row-start-2 col-start-2 self-end justify-self-end'>취소</button> :
      <div className='row-start-2 col-start-2 h-8 self-end justify-self-end flex gap-2'>
        <button className='btn btn-primary min-h-fit h-full text-sm'>수락</button>
        <button className='btn btn-error min-h-fit h-full text-sm'>거절</button>
      </div>}
    </div>
  )
}

export default InviteCard;