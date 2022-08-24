import React, { useEffect, useState } from 'react';
import TagElement from '../../components/TagElement';
import ExamplePic from '../../assets/examplepic.png';
import Heart from '../../assets/ic_heart.svg';
import CheckedHeart from '../../assets/ic_heart_checked.svg';
import { BandProfileType, UserProfileType } from '../../types/types';
import RecruitPostAPI from '../../apis/RecruitPostAPI';

function ArticleCard(props: {
  type: boolean;
  pic: string;
  title: string;
  authorPic: string;
  authorName: string;
  authorId: string;
  bandInfo: BandProfileType | null;
  userInfo: UserProfileType | null;
  isHeartChecked: boolean;
}) {
  return (
    <div className='w-full h-fit grid grid-cols-[15fr_40fr_3fr] grid-rows-[50px_44px_auto] gap-x-5 p-5 border-solid border-[#e9e9e9] border bg-white rounded-xl mt-5'>
      {props.authorPic ? (
        <img
          src={props.pic}
          className='w-[7.5rem] h-[7.5rem] row-start-1 row-end-4 col-start-1 mr-7 object-cover rounded-xl'
        />
      ) : (
        <img
          src={ExamplePic}
          className='w-[7.5rem] h-[7.5rem] row-start-1 row-end-4 col-start-1 mr-7 object-cover rounded-xl'
        />
      )}
      <div className='row-start-1 col-start-2 w-full h-[1.625rem] mt-[0.625rem] mb-3.5 truncate font-medium text-lg text-accent'>
        {props.title}
      </div>
      <div className='flex flex-row row-start-2 col-start-2 w-full h-[1.625rem] pb-4.5 text-base text-accent'>
        {props.authorPic ? (
          <img
            src={props.authorPic}
            className='w-[1.625rem] h-[1.625rem] mr-2.5 object-cover rounded-full'
          />
        ) : (
          <img
            src={ExamplePic}
            className='w-[1.625rem] h-[1.625rem] mr-2.5 object-cover rounded-full'
          />
        )}
        <div className='py-px'>{props.authorName}</div>
      </div>
      {props.type ? (
        props.bandInfo ? (
          <div className='flex flex-wrap gap-1.5 row-start-3 col-start-2 w-full h-full'>
            <TagElement tag={props.bandInfo.areas[0].district} />
            <TagElement tag={props.bandInfo.genres[0].name} />
            <TagElement tag={props.bandInfo.days[0].name} />
          </div>
        ) : (
          <></>
        )
      ) : props.userInfo ? (
        <div className='flex flex-wrap gap-1.5 row-start-3 col-start-2 w-full h-full'>
          <TagElement tag={props.userInfo.positions[0].name} />
          <TagElement tag={props.userInfo.areas[0].district} />
          <TagElement tag={props.userInfo.genres[0].name} />
        </div>
      ) : (
        <></>
      )}
      <div className='flex row-start-3 col-start-3 justify-end items-center'>
        {props.isHeartChecked ? (
          <img src={CheckedHeart} className='w-auto h-auto' />
        ) : (
          <img src={Heart} className='w-auto h-auto' />
        )}
      </div>
    </div>
  );
}

export default ArticleCard;
