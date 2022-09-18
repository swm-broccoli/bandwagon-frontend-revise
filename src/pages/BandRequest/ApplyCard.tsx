import React from 'react';
import { BandRequestType } from '../../types/types';
import ExamplePic from '../../assets/examplepic.png';
import { Link } from 'react-router-dom';
import BandRequestAPI from '../../apis/BandRequestAPI';

function ApplyCard(props: {
  type: boolean
  request: BandRequestType}) {

  function handleAcceptClick (e: React.MouseEvent<HTMLButtonElement>) {
    BandRequestAPI.AcceptApply(true, props.request.id)
    .then((res) => {
      window.alert(props.request.user.name + ' 님이 멤버가 되었습니다!');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleRejectClick (e: React.MouseEvent<HTMLButtonElement>) {
    BandRequestAPI.AcceptApply(true, props.request.id)
    .then((res) => {
      window.alert('지원을 거절하였습니다');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleDeleteClick (e: React.MouseEvent<HTMLButtonElement>) {
    BandRequestAPI.DeleteApply(props.request.id)
    .then((res) => {
      window.alert('지원을 취소하였습니다');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  return (
    <div className='w-full h-full grid grid-cols-[100px_auto] grid-rows-3 gap-x-4 gap-y-2'>
      {props.type ?
        <img src={props.request.user.avatarUrl ?
          props.request.user.avatarUrl :
          ExamplePic}
          className='hidden sm:flex row-start-1 row-end-4 col-start-1 w-full h-[100px] self-center rounded-full object-cover' /> :
        <img src={props.request.band.avatarUrl ?
          props.request.band.avatarUrl :
          ExamplePic}
          className='hidden sm:flex row-start-1 row-end-4 col-start-1 w-full h-[100px] self-center rounded-full object-cover' />
      }
      {props.type ?
        <h2 className='row-start-1 col-start-1 col-end-3 sm:col-start-2 w-full truncate font-medium text-lg text-accent'>
        {props.request.user.name + ' 님이 지원했습니다!'}
        </h2> :
        <h2 className='row-start-1 col-start-1 col-end-3 sm:col-start-2 w-full truncate font-medium text-lg text-accent'>
        {props.request.band.name + ' 밴드에 지원했습니다!'}
        </h2>
      }
      <Link
        to={'/recruit/' + props.request.post?.id.toString()}
        className='row-start-2 col-start-1 col-end-3 sm:col-start-2 '>
        <p className='w-full truncate font-medium text-base text-neutral'>{'관련 게시글: ' + props.request.post?.name}</p>
      </Link>
      {props.type ?
      <div className='row-start-3 col-start-2 h-full justify-self-end flex gap-2'>
        <button
          onClick={handleAcceptClick}
          className='btn btn-primary min-h-fit h-full text-sm'>수락</button>
        <button
          onClick={handleRejectClick}
          className='btn btn-error min-h-fit h-full text-sm'>거절</button>
      </div> :
      <button
        onClick={handleDeleteClick}
        className='btn bg-base-300 border-base-300 text-gray-700 min-h-fit h-full row-start-3 col-start-2 justify-self-end'>취소</button>}
    </div>
  )
}

export default ApplyCard;