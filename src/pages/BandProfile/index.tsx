import { useEffect, useState } from 'react';
import MyPageTemplate from '../../components/MyPageTemplate';
import TagElement from '../../components/TagElement';
import initialBandProfile from './initialBandProfile';
import { BandProfileAvatar } from './styles';
import { BandProfileType, BandMemberType } from '../../types/types';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';

function BandMemberListItem({ member }: { member: BandMemberType }) {
  return (
    <li className='flex flex-row gap-[0.625rem] items-center'>
      <p className='text-accent text-base'>{member.name}</p>
      <TagElement tag={member.positions[0].name} />
    </li>
  );
}

function BandMemberList({
  label,
  bandMembers,
}: {
  label: string;
  bandMembers: BandMemberType[];
}) {
  return (
    <div className='h-10 w-full flex flex-col my-2'>
      <label className='label w-1/4 py-0'>
        <span className='label-text text-accent'>{label}</span>
      </label>
      <ul className='w-full flex flex-row flex-wrap gap-x-7 gap-y-2'>
        {bandMembers.map((member, index) => (
          <BandMemberListItem key={index} member={member} />
        ))}
      </ul>
    </div>
  );
}

function BandProfile() {
  const [profileEditing, setProfileEditing] = useState<boolean>(false);

  const [curBandProfile, setCurBandProfile] =
    useState<BandProfileType>(initialBandProfile);

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <h1 className='text-bold text-2xl font-bold'>밴드 정보</h1>
        <button
          className={`btn h-10 ${
            profileEditing ? 'bg-base-100 hover:bg-base-200' : 'btn-primary'
          }`}
          onClick={() => {
            setProfileEditing(!profileEditing);
          }}
        >
          {profileEditing ? '수정 완료' : '수정하기'}
        </button>
      </div>
      <div className='mt-6 flex flex-col items-center'>
        <BandProfileAvatar
          avatarURL={curBandProfile.avatarUrl}
          setAvatarURL={(newAvatarUrl) => {
            setCurBandProfile({
              ...curBandProfile,
              avatarUrl: newAvatarUrl,
            });
          }}
          editing={profileEditing}
        />
        <div className='w-full mt-10'>
          <ProfileReadOnlyTextField
            label='밴드명'
            value={curBandProfile.name}
            editing={profileEditing}
          />
          <BandMemberList
            label='밴드 멤버'
            bandMembers={curBandProfile.bandMembers}
          />
        </div>
      </div>
    </div>
  );
}

function BandProfilePage() {
  return (
    <MyPageTemplate>
      <BandProfile />
    </MyPageTemplate>
  );
}

export default BandProfilePage;
