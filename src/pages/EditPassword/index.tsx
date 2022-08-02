import React from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link, useLocation } from 'react-router-dom';
import MyInfoIcon from '../../assets/ico_my1@2x.png';
import MyInfoActiveIcon from '../../assets/ico_my1_on@2x.png';
import BandInfoIcon from '../../assets/live_music.png';
import BandInfoActiveIcon from '../../assets/live_music_on.png';
import AccountInfoIcon from '../../assets/ico_my2@2x.png';
import AccountInfoActiveIcon from '../../assets/ico_my2_on@2x.png';
import PasswordChangeIcon from '../../assets/ico_my3@2x.png';
import PasswordChangeActiveIcon from '../../assets/ico_my3_on@2x.png';
import MyPostIcon from '../../assets/ico_my4@2x.png';
import MyPostActiveIcon from '../../assets/ico_my4_on@2x.png';
import MyCommentIcon from '../../assets/ico_my5@2x.png';
import MyCommentActiveIcon from '../../assets/ico_my5_on@2x.png';
import MyLikeIcon from '../../assets/ico_my6@2x.png';
import MyLikeActiveIcon from '../../assets/ico_my6_on@2x.png';
import MyPageMenu from '../../components/MyPageMenu';

const myPageMenuItems = [
  {
    label: '내 정보',
    to: '/profile/user',
    icon: MyInfoIcon,
    activeIcon: MyInfoActiveIcon,
  },
  {
    label: '밴드 정보',
    to: '/profile/band',
    icon: BandInfoIcon,
    activeIcon: BandInfoActiveIcon,
  },
  {
    label: '계정 정보',
    to: '/edit/account',
    icon: AccountInfoIcon,
    activeIcon: AccountInfoActiveIcon,
  },
  {
    label: '비밀번호 변경',
    to: '/edit/password',
    icon: PasswordChangeIcon,
    activeIcon: PasswordChangeActiveIcon,
  },
  {
    label: '내 글',
    to: '/profile/mypost',
    icon: MyPostIcon,
    activeIcon: MyPostActiveIcon,
  },
  {
    label: '내 댓글',
    to: '/profile/mycomment',
    icon: MyCommentIcon,
    activeIcon: MyCommentActiveIcon,
  },
  {
    label: '찜한 글',
    to: '/profile/mylike',
    icon: MyLikeIcon,
    activeIcon: MyLikeActiveIcon,
  },
];

function EditInput({
  label,
  password = false,
}: {
  label: string;
  password?: boolean;
}) {
  return (
    <>
      <div className='form-control w-full flex flex-row justify-start py-2'>
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        <input
          type={password ? 'password' : 'text'}
          placeholder='Type here'
          className='input input-bordered w-3/5 max-w-xs focus:outline-none focus:border-primary text-accent'
        />
      </div>
      <div className='divider m-0 w-5/6' />
    </>
  );
}

function PasswordChangeForm({ label }: { label: string }) {
  return (
    <div className='grid auto-rows-min'>
      <form>
        <div className='flex flex-row justify-between'>
          <h1 className='text-bold text-2xl font-bold'>{label}</h1>
          <button type='submit' className='btn btn-primary h-10'>
            비밀번호 변경
          </button>
        </div>

        <div className='mt-6 row-start-2 col-span-full'>
          <EditInput label='아이디' />
          <EditInput label='현재 비밀번호' password />
          <EditInput label='새 비밀번호' password />
          <EditInput label='새 비밀번호 확인' password />
        </div>
      </form>
    </div>
  );
}

function PasswordEditPage() {
  return (
    <div>
      <GlobalNavBar />
      <div className='grid grid-cols-6'>
        <div className='col-start-2 col-end-6 flex flex-col md:flex-row'>
          <div className='w-full md:w-1/5 md:col-span-1 min-w-[150px] mt-10'>
            <MyPageMenu menuList={myPageMenuItems} />
          </div>
          <div className='pl-5 pt-5 md:pt-12 w-full'>
            <PasswordChangeForm label={`비밀번호 변경`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordEditPage;
