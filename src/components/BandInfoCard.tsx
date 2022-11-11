import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecruitPostAPI from '../apis/RecruitPostAPI';
import DefaultBandImg from '../assets/default/band_no_img.svg';
import DefaultUserImg from '../assets/default/man_no_img.svg';
import {
  AreaType,
  BandMemberType,
  BandProfileType,
  SelectionType,
} from '../types/types';
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
          src={DefaultBandImg}
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

function TextListInfo(props: {
  label: string;
  text: SelectionType[] | undefined;
}) {
  return (
    <div className='flex flex-col gap-[0.325rem]'>
      <h3 className='text-[#888888] text-sm'>{props.label}</h3>
      <ul className='flex gap-[0.325rem]'>
        {props.text?.map((label, index) => (
          <li key={index} className='text-accent text-base'>
            {label.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AgeInfo(props: { min: number; max: number }) {
  return (
    <div className='flex flex-col gap-[0.325rem]'>
      <h3 className='text-[#888888] text-sm'>나이대</h3>
      <p className='text-accent text-base'>
        {props.min.toString() + '세 ~ ' + props.max.toString() + '세'}
      </p>
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

function MemberInfo(props: { members: BandMemberType[] | undefined }) {
  return (
    <div className='flex flex-col gap-3 md:row-start-3 md:col-start-1 md:col-end-3 w-full h-fit'>
      <h3 className='text-[#888888] text-sm'>멤버 현황</h3>
      <ul className='w-full flex flex-row flex-wrap gap-x-7 gap-y-2'>
        {props.members?.map((member, index) => (
          <li key={index} className='flex flex-row gap-[0.625rem] items-center'>
            {member.avatarUrl ? (
              <img src={member.avatarUrl} className='w-7 h-7 rounded-full' />
            ) : (
              <img src={DefaultUserImg} className='w-7 h-7 rounded-full' />
            )}
            <p className='text-accent text-base font-medium'>{member.nickname}</p>
            {member.positions.length ? (
              <TagElement tag={member.positions[0].name} />
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GenreInfo(props: { genres: SelectionType[] | undefined }) {
  return (
    <div className='flex flex-col gap-3 md:row-start-5 md:col-start-1 md:col-end-3 w-full h-fit'>
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
function BandInfoCard(props: { type: boolean; bandId: number | undefined }) {
  const [bandInfo, setBandInfo] = useState<BandProfileType>();
  const [minAge, setMinAge] = useState(1000);
  const [maxAge, setMaxAge] = useState(0);

  useEffect(() => {
    if (props.type) {
      RecruitPostAPI.LoadMyBandInfo()
        .then((res) => {
          setBandInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (props.bandId) {
      RecruitPostAPI.LoadBandInfo(props.bandId)
        .then((res) => {
          setBandInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.bandId]);

  useEffect(() => {
    bandInfo?.bandMembers.map((member, index) => {
      if (member.age < minAge) setMinAge(member.age);
      if (member.age > maxAge) setMaxAge(member.age);
    });
  }, [bandInfo]);

  return (
    <>
      {bandInfo ? (
        <div className='flex flex-col gap-3 w-full h-fit'>
          <div className='grid grid-cols-2 items-center'>
            <h3 className='col-start-1 text-accent text-base'>밴드 정보</h3>
            {props.type ? (
              <Link
                to='/band/profile'
                className='col-start-2 justify-self-end text-sm text-primary'
              >
                수정
              </Link>
            ) : (
              <></>
            )}
          </div>
          <div className='flex flex-col md:grid md:grid-cols-2 md:auto-rows-auto w-full h-fit px-[14%] py-7 border border-[#e5e5e5] border-solid rounded-xl gap-7'>
            <ProfilePic avatarUrl={bandInfo?.avatarUrl} />
            <div className='md:row-start-1 md:col-start-2 md:self-end'>
              <TextInfo label='밴드명' text={bandInfo?.name} />
            </div>
            <div className='md:row-start-2 md:col-start-2'>
              <AgeInfo min={minAge} max={maxAge} />
            </div>
            <MemberInfo members={bandInfo?.bandMembers} />
            <div className='md:row-start-4 md:col-start-1 md:self-end'>
              <TextListInfo label='활동 요일' text={bandInfo?.days} />
            </div>
            <div className='md:row-start-4 md:col-start-2 md:self-end'>
              <AreaInfo text={bandInfo?.areas} />
            </div>
            <GenreInfo genres={bandInfo?.genres} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default BandInfoCard;
