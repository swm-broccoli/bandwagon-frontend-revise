import { useEffect, useState } from 'react';
import MyPageTemplate from '../../components/MyPageTemplate';
import TagElement from '../../components/TagElement';
import initialBandProfile from './initialBandProfile';
import { BandProfileAvatar } from './styles';
import { BandProfileType, BandMemberType } from '../../types/types';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';

const positionToKorean: { [item: string]: string } = {
  'Electric Guitar': '일렉기타',
  'Acoustic Guitar': '어쿠스틱',
  Drum: '드럼',
  'Bass Guitar': '베이스',
  Keyboard: '키보드',
  Vocal: '보컬',
  Others: '그 외',
};

function BandMemberListItem({
  member,
  deleteMember,
  editing,
}: {
  member: BandMemberType;
  deleteMember: () => void;
  editing: boolean;
}) {
  return (
    <li className='flex flex-row items-center'>
      <p className='text-accent text-base mr-2.5'>{member.name}</p>
      <TagElement tag={positionToKorean[member.positions[0].name]} />
      {editing ? <button onClick={deleteMember}>X</button> : null}
    </li>
  );
}

function BandMemberList({
  label,
  bandMembers,
  setBandMembers,
  editing,
}: {
  label: string;
  bandMembers: BandMemberType[];
  setBandMembers: (bandMembers: BandMemberType[]) => void;
  editing: boolean;
}) {
  return (
    <div className='h-10 w-full flex flex-col my-2'>
      <div className='flex flex-row justify-between'>
        <label className='label w-1/4 py-0 mb-5'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        {editing ? (
          <button className='btn btn-primary btn-sm h-8 w-14 mr-1 p-0'>
            +추가
          </button>
        ) : null}
      </div>

      <ul className='w-full flex flex-row flex-wrap gap-x-7 gap-y-2'>
        {bandMembers.map((member, index) => (
          <BandMemberListItem
            key={index}
            member={member}
            editing={editing}
            deleteMember={() => {
              setBandMembers(
                bandMembers.filter((_member) => _member.id !== member.id),
              );
            }}
          />
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
            setBandMembers={(newBandMembers) => {
              setCurBandProfile({
                ...curBandProfile,
                bandMembers: newBandMembers,
              });
            }}
            editing={profileEditing}
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
