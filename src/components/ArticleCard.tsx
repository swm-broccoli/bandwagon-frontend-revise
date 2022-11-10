import React, { useEffect, useState } from 'react';
import TagElement from './TagElement';
import DefaultPostImg from '../assets/default/post_no_img.png';
import DefaultBandImg from '../assets/default/band_no_img.svg';
import DefaultUserImg from '../assets/default/man_no_img.svg';
import Heart from '../assets/ic_heart.svg';
import CheckedHeart from '../assets/ic_heart_checked.svg';
import { PostCardType } from '../types/types';
import RecruitPostAPI from '../apis/RecruitPostAPI';

function extractImageFromHtml(html: string): string {
  const img = new DOMParser()
    .parseFromString(html, 'text/html')
    .querySelector('img');
  return img ? img.src : DefaultPostImg;
}

function ArticleCard(props: { postInfo: PostCardType }) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    setIsLiked(props.postInfo.isLiked);
  }, [props.postInfo]);

  function handleLikeClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsLiked(!isLiked);
    RecruitPostAPI.ChangeLike(isLiked, props.postInfo.id.toString());
  }

  return (
    <div className='w-full max-w-xl h-fit grid grid-cols-[15fr_40fr_3fr] grid-rows-[50px_44px_auto] gap-x-5 p-5 border-solid border-[#e9e9e9] border bg-white rounded-xl mt-5'>
      {extractImageFromHtml(props.postInfo.body) === '' ? (
          <img
            src={DefaultPostImg}
            className='w-[7.5rem] h-[7.5rem] row-start-1 row-end-4 col-start-1 mr-7 object-cover rounded-xl'
          />
        ) : (
          <img
            src={extractImageFromHtml(props.postInfo.body)}
            className='w-[7.5rem] h-[7.5rem] row-start-1 row-end-4 col-start-1 mr-7 object-cover rounded-xl'
          />
        )}
      <div className='row-start-1 col-start-2 w-full h-[1.625rem] mt-[0.625rem] mb-3.5 truncate font-medium text-lg text-accent'>
        {props.postInfo.title}
      </div>
      <div className='flex flex-row row-start-2 col-start-2 w-full h-[1.625rem] pb-4.5 text-base text-accent'>
        {props.postInfo.dtype == 'Band' ? (
          props.postInfo.bandAvatarUrl ? (
            <img
              src={props.postInfo.bandAvatarUrl}
              className='w-[1.625rem] h-[1.625rem] mr-2.5 object-cover rounded-full'
            />
          ) : (
            <img
              src={DefaultBandImg}
              className='w-[1.625rem] h-[1.625rem] mr-2.5 object-cover rounded-full'
            />
          )
        ) : props.postInfo.userAvatarUrl ? (
          <img
            src={props.postInfo.userAvatarUrl}
            className='w-[1.625rem] h-[1.625rem] mr-2.5 object-cover rounded-full'
          />
        ) : (
          <img
            src={DefaultUserImg}
            className='w-[1.625rem] h-[1.625rem] mr-2.5 object-cover rounded-full'
          />
        )}
        <div className='py-px'>
          {props.postInfo.dtype == 'Band'
            ? props.postInfo.bandName
            : props.postInfo.nickname}
        </div>
      </div>
      {props.postInfo ? (
        props.postInfo.dtype == 'Band' ? (
          <div className='flex flex-wrap gap-1.5 row-start-3 col-start-2 w-full h-full'>
            {props.postInfo.tagInfo.length ?
              props.postInfo.tagInfo.map((tag: {id: number, name: string}, index: number) =>
              <TagElement key={index} tag={tag.name} />) :
              <TagElement tag='누구나 지원 가능!' />}
          </div>
        ) : (
          <div className='flex flex-wrap gap-1.5 row-start-3 col-start-2 w-full h-full'>
            {props.postInfo.tagInfo.length ?
              props.postInfo.tagInfo.map((tag: {id: number, name: string}, index: number) =>
              <TagElement key={index} tag={tag.name} />) :
              <TagElement tag='누구나 지원 가능!' />}
          </div>
        )
      ) : (
        <></>
      )}
      <div className='flex row-start-3 col-start-3 justify-end items-center'>
        {isLiked ? (
          <button onClick={handleLikeClick}>
            <img src={CheckedHeart} className='w-auto h-auto' />
          </button>
        ) : (
          <button onClick={handleLikeClick}>
            <img src={Heart} className='w-auto h-auto' />
          </button>
        )}
      </div>
    </div>
  );
}

export default ArticleCard;
