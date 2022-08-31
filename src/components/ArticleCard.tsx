import React, { useEffect, useState } from 'react';
import TagElement from './TagElement';
import ExamplePic from '../assets/examplepic.png';
import Heart from '../assets/ic_heart.svg';
import CheckedHeart from '../assets/ic_heart_checked.svg';
import { PostCardType } from '../types/types';
import RecruitPostAPI from '../apis/RecruitPostAPI';

function ArticleCard (
  props: {
    postInfo: PostCardType,
  }) {
  
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    setIsLiked(props.postInfo.isLiked);
  }, [props.postInfo]);

  function handleLikeClick (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsLiked(!isLiked);
    RecruitPostAPI.ChangeLike(isLiked, props.postInfo.id.toString());
  }

  return (
    <div className='w-full max-w-xl h-fit grid grid-cols-[15fr_40fr_3fr] grid-rows-[50px_44px_auto] gap-x-5 p-5 border-solid border-[#e9e9e9] border bg-white rounded-xl mt-5'>
        {props.postInfo.dtype == 'Band' ?
        props.postInfo.bandAvatarUrl ?
        <img src={props.postInfo.bandAvatarUrl} className='w-[7.5rem] h-[7.5rem] row-start-1 row-end-4 col-start-1 mr-7 object-cover rounded-xl'/> :
        <img src={ExamplePic} className='w-[7.5rem] h-[7.5rem] row-start-1 row-end-4 col-start-1 mr-7 object-cover rounded-xl'/> :
        props.postInfo.userAvatarUrl ?
        <img src={props.postInfo.bandAvatarUrl} className='w-[7.5rem] h-[7.5rem] row-start-1 row-end-4 col-start-1 mr-7 object-cover rounded-xl'/> :
        <img src={ExamplePic} className='w-[7.5rem] h-[7.5rem] row-start-1 row-end-4 col-start-1 mr-7 object-cover rounded-xl'/>}
      <div className='row-start-1 col-start-2 w-full h-[1.625rem] mt-[0.625rem] mb-3.5 truncate font-medium text-lg text-accent'>
        {props.postInfo.title}
      </div>
      <div className='flex flex-row row-start-2 col-start-2 w-full h-[1.625rem] pb-4.5 text-base text-accent'>
        {props.postInfo.dtype == 'Band' ?
        props.postInfo.bandAvatarUrl ?
          <img src={props.postInfo.bandAvatarUrl} className='w-[1.625rem] h-[1.625rem] mr-2.5 object-cover rounded-full'/> :
          <img src={ExamplePic} className='w-[1.625rem] h-[1.625rem] mr-2.5 object-cover rounded-full'/> :
        props.postInfo.userAvatarUrl ?
          <img src={props.postInfo.userAvatarUrl} className='w-[1.625rem] h-[1.625rem] mr-2.5 object-cover rounded-full'/> :
          <img src={ExamplePic} className='w-[1.625rem] h-[1.625rem] mr-2.5 object-cover rounded-full'/>}
        <div className='py-px'>
          {props.postInfo.dtype == 'Band' ?
          props.postInfo.bandName :
          props.postInfo.nickname}
        </div>
      </div>
      {props.postInfo ?
         props.postInfo.dtype == 'Band' ?
          <div className='flex flex-wrap gap-1.5 row-start-3 col-start-2 w-full h-full'>
            <TagElement tag={props.postInfo.tagInfo.areas[0].district} />
            <TagElement tag={props.postInfo.tagInfo.genres[0].name} />
            <TagElement tag={props.postInfo.tagInfo.days[0].name} />
          </div> :
          <div className='flex flex-wrap gap-1.5 row-start-3 col-start-2 w-full h-full'>
          <TagElement tag={props.postInfo.tagInfo.positions[0].name} />
          <TagElement tag={props.postInfo.tagInfo.areas[0].district} />
          <TagElement tag={props.postInfo.tagInfo.genres[0].name} />
          </div> :
          <></>}
      <div className='flex row-start-3 col-start-3 justify-end items-center'>
        {isLiked ?
        <button onClick={handleLikeClick}>
          <img src={CheckedHeart} className='w-auto h-auto'/>
        </button> :
        <button onClick={handleLikeClick}>
          <img src={Heart} className='w-auto h-auto' />
        </button>}
      </div>
    </div>
  )
}

export default ArticleCard