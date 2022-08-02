import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';
import ProfileSelectField from '../../components/ProfileSelectField';
import AreaField from '../../components/AreaField';
import areaOptions from '../../assets/options/areaOptions';
import positionOptions from '../../assets/options/positionOptions';
import DescriptionField from '../../components/DescriptionField';
import {
  RecordLinkType,
  PerformanceRecordType,
  UserProfileType,
} from '../../types/types';
import initialUserProfile from './initialUserProfile';

const linkPlatformOptions = [
  {
    id: 1,
    name: '유튜브',
  },
  {
    id: 2,
    name: '사운드클라우드',
  },
  {
    id: 3,
    name: '오디오클라우드',
  },
];

function RecordLinkItem({
  recordLink,
  editing,
  platformOptions,
}: {
  recordLink: RecordLinkType;
  editing: boolean;
  platformOptions: Array<{ id: number; name: string }>;
}) {
  if (editing) {
    return (
      <div className='flex justify-between'>
        <select className='select select-bordered select-sm'>
          {platformOptions.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
        <input
          className='input w-full h-full'
          value={recordLink.url}
          onChange={(e) => {
            recordLink.url = e.target.value;
          }}
        />
      </div>
    );
  }
  return (
    <div className='flex flex-row text-xs m-1'>
      <div className='w-24'>{recordLink.platform}</div>
      <div className='divider divider-horizontal m-0' />
      <a
        href={recordLink.url}
        className='link link-hover block w-full break-all'
      >
        {recordLink.url}
      </a>
    </div>
  );
}

function RecordEditingItem({
  record,
  editing,
  setEditing,
}: {
  record: PerformanceRecordType;
  editing: boolean;
  setEditing: (newEditing: boolean) => void;
}) {
  return (
    <div className='grid grid-flow-row bg-success mt-2 px-4 py-2 rounded-lg'>
      <div className='grid grid-cols-2'>
        <input
          type='text'
          className='input input-bordered input-sm w-full text-accent'
          value={record.title}
        />
        <input
          type='date'
          className='input input-bordered input-sm w-full text-neutral'
          value={record.date}
        />
        <button
          className='btn btn-primary btn-sm w-20 justify-self-end row-start-1 row-end-3 col-start-2'
          onClick={() => setEditing(!editing)}
        >
          {editing ? '저장' : '수정'}
        </button>
      </div>
      {record.recordLinks.map((recordLink, index) => (
        <RecordLinkItem
          key={index}
          recordLink={recordLink}
          editing={editing}
          platformOptions={linkPlatformOptions}
        />
      ))}
    </div>
  );
}

function RecordConstantItem({
  record,
  editing,
  setEditing,
}: {
  record: PerformanceRecordType;
  editing: boolean;
  setEditing: (newEditing: boolean) => void;
}) {
  const [itemEditing, setItemEditing] = useState(false);

  return (
    <div className='grid grid-flow-row bg-success mt-2 px-4 py-2 rounded-lg'>
      <div className='grid grid-cols-2'>
        <span className='text-accent col-start-1'>{record.title}</span>
        <span className='text-neutral col-start-1 text-sm'>{record.date}</span>
        <button
          className='btn btn-primary btn-sm w-20 justify-self-end row-start-1 row-end-3 col-start-2'
          onClick={() => setEditing(!editing)}
        >
          {editing ? '저장' : '수정'}
        </button>
      </div>
      {record.recordLinks.map((recordLink, index) => (
        <RecordLinkItem
          key={index}
          recordLink={recordLink}
          editing={editing}
          platformOptions={linkPlatformOptions}
        />
      ))}
    </div>
  );
}

function RecordItem({ record }: { record: PerformanceRecordType }) {
  const [itemEditing, setItemEditing] = useState<boolean>(false);

  if (itemEditing) {
    return (
      <RecordEditingItem
        record={record}
        editing={itemEditing}
        setEditing={setItemEditing}
      />
    );
  } else {
    return (
      <RecordConstantItem
        record={record}
        editing={itemEditing}
        setEditing={setItemEditing}
      />
    );
  }
}

function RecordField({
  label,
  records,
}: {
  label: string;
  records: PerformanceRecordType[];
}) {
  return (
    <div>
      <div className='flex flex-row justify-between items-center h-8 mb-5'>
        <h1 className='text-sm pl-1'>{label}</h1>
      </div>

      {records.map((record, index) => (
        <RecordItem key={index} record={record} />
      ))}
    </div>
  );
}

function UserProfile() {
  const [curUserProfile, setCurUserProfile] =
    useState<UserProfileType>(initialUserProfile);

  const [editingUserProfile, setEditingUserProfile] =
    useState<UserProfileType>();

  const [profileEditing, setProfileEditing] = useState<boolean>(false);

  useEffect(() => {
    setEditingUserProfile(curUserProfile);
  }, []);

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <h1 className='text-bold text-2xl font-bold'>내 정보</h1>
        <button
          className={`btn h-10 ${
            profileEditing ? 'bg-base-100 hover:bg-base-200' : 'btn-primary'
          }`}
          onClick={() => setProfileEditing(!profileEditing)}
        >
          {profileEditing ? '수정 완료' : '수정하기'}
        </button>
      </div>
      <div className='mt-6 flex flex-col items-center'>
        <div className='avatar w-1/3'>
          <div className='rounded-full'>
            <img src='https://picsum.photos/200' alt='avatar' />
          </div>
        </div>
        <div className='w-full mt-10'>
          <ProfileReadOnlyTextField label='이름' value={curUserProfile.name} />
          <ProfileReadOnlyTextField
            label='나이'
            value={curUserProfile.birthday}
          />
          <ProfileSelectField
            label='포지션'
            name='position'
            selected={curUserProfile.positions}
            options={positionOptions}
            setSelected={(newPosition) => {
              setCurUserProfile({
                ...curUserProfile,
                positions: newPosition,
              });
            }}
          />
          <AreaField
            label='지역'
            areas={curUserProfile.areas}
            setAreas={(newAreas) => {
              setCurUserProfile({
                ...curUserProfile,
                areas: newAreas,
              });
            }}
            options={areaOptions}
          />
          <DescriptionField
            label='자기소개'
            description={curUserProfile.description}
            setDescription={(newDescription) => {
              setCurUserProfile({
                ...curUserProfile,
                description: newDescription,
              });
            }}
          />
          <RecordField
            label='연주 목록'
            records={curUserProfile.userPerformances}
          />
        </div>
      </div>
    </div>
  );
}

function UserProfilePage() {
  return (
    <MyPageTemplate>
      <UserProfile />
    </MyPageTemplate>
  );
}

export default UserProfilePage;
