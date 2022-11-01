import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecruitPostAPI from '../apis/RecruitPostAPI';
import DefaultUserImg from '../assets/default/man_no_img.svg';
import { AreaType, SelectionType, UserProfileType } from '../types/types';
import TagElement from './TagElement';

function ProfilePic(props: { avatarUrl: string | undefined }) {
  return (
    <>
      {props.avatarUrl ? (
        <img
          src={props.avatarUrl}
          className='md:row-start-1 md:row-end-3 md:col-start-1 justify-self-center w-48 h-48 rounded-full'
        />
      ) : (
        <img
          src={DefaultUserImg}
          className='md:row-start-1 md:row-end-3 md:col-start-1 justify-self-center w-48 h-48 rounded-full'
        />
      )}
    </>
  );
}

function TextInfo(props: { label: string; text: string | undefined }) {
  return (
    <div className='flex flex-col gap-[0.325rem]'>
      <h3 className='text-[#888888] text-sm'>{props.label}</h3>
      <p className='text-accent text-base'>{props.text}</p>
    </div>
  );
}

function PositionInfo(props: { positions: SelectionType[] | undefined }) {
  return (
    <div className='flex flex-col gap-3 md:row-start-2 md:col-start-2 w-full h-fit'>
      <h3 className='text-[#888888] text-sm'>연주 악기</h3>
      <ul className='w-full flex flex-row flex-wrap gap-x-1.5 gap-y-2'>
        {props.positions?.map((position, index) => (
          <li key={index}>
            <TagElement tag={position.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function AreaInfo(props: { text: AreaType[] | undefined }) {
  return (
    <div className='flex flex-col gap-[0.325rem]'>
      <h3 className='text-[#888888] text-sm'>활동 지역</h3>
      <ul className='flex gap-[0.325rem]'>
        {props.text?.map((label, index) => (
          <li key={index} className='text-accent text-base'>
            {label.city + ' ' + label.district}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GenreInfo(props: { genres: SelectionType[] | undefined }) {
  return (
    <div className='flex flex-col gap-3 md:row-start-3 md:col-start-2 w-full h-fit'>
      <h3 className='text-[#888888] text-sm'>선호 장르</h3>
      <ul className='w-full flex flex-row flex-wrap gap-x-1.5 gap-y-2'>
        {props.genres?.map((genre, index) => (
          <li key={index}>
            <TagElement tag={genre.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// true -> 글쓰기, false -> 글 보기
function UserInfoCard(props: { type: boolean; userId: string | undefined }) {
  const [userInfo, setUserInfo] = useState<UserProfileType>();

  useEffect(() => {
    if (props.type) {
      RecruitPostAPI.LoadMyInfo()
        .then((res) => {
          console.log(res.data);
          RecruitPostAPI.LoadUserInfo(res.data.email)
            .then((res) => {
              console.log(res.data);
              setUserInfo(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (props.userId) {
      RecruitPostAPI.LoadUserInfo(props.userId)
        .then((res) => {
          console.log(res.data);
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.userId]);

  return (
    <>
      {userInfo ? (
        <div className='flex flex-col gap-3 w-full h-fit'>
          <div className='grid grid-cols-2 items-center'>
            <h3 className='col-start-1 text-accent text-base'>유저 정보</h3>
            {props.type ? (
              <Link
                to='/profile/user'
                className='col-start-2 justify-self-end text-sm text-primary'
              >
                수정
              </Link>
            ) : (
              <></>
            )}
          </div>
          <div className='flex flex-col md:grid md:grid-cols-2 md:auto-rows-auto w-full h-fit px-[14%] py-7 border border-[#e5e5e5] border-solid rounded-xl gap-7'>
            <ProfilePic avatarUrl={userInfo?.avatarUrl} />
            <div className='md:row-start-1 md:col-start-2 md:self-end'>
              <TextInfo label='닉네임' text={userInfo?.name} />
            </div>
            <PositionInfo positions={userInfo?.positions} />
            <div className='md:row-start-3 md:col-start-1 md:self-end'>
              <AreaInfo text={userInfo?.areas} />
            </div>
            <GenreInfo genres={userInfo?.genres} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserInfoCard;
