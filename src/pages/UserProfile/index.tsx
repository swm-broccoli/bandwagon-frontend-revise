import { useState } from 'react';
import MyPageTemplate from '../../components/MyPageTemplate';

function ProfileFieldEditButton({
  editing,
  toggleEditing,
}: {
  editing: boolean;
  toggleEditing: () => void;
}) {
  return (
    <button
      onClick={toggleEditing}
      className='btn btn-sm bg-base-100 hover:bg-base-200 border-base-200 text-accent h-8 w-14 p-0'
    >
      {editing ? '완료' : '수정'}
    </button>
  );
}

function ProfileTextField({ label, name }: { label: string; name: string }) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className='form-control h-10 w-full flex flex-row justify-start items-center my-2'>
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        <input
          type='text'
          placeholder={label}
          name={name}
          className='input input-bordered h-10 w-3/5 mr-10 focus:outline-none focus:border-primary text-accent'
        />
        <ProfileFieldEditButton
          editing={editing}
          toggleEditing={() => {
            setEditing((prev) => !prev);
          }}
        />
      </div>
      <div className='divider m-0' />
    </>
  );
}

function ProfileSelectFieldItem({
  label,
  editing,
}: {
  label: string;
  editing: boolean;
}) {
  return (
    <div className='mr-2'>
      {label} <button>X</button>
    </div>
  );
}

function ProfileSelectField({
  label,
  name,
  selected,
  options,
}: {
  label: string;
  name: string;
  selected: string[];
  options: string[];
}) {
  return (
    <>
      <div className='form-control h-10 w-full flex flex-row justify-start items-center my-2'>
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        <div className='flex flex-row items-center h-10 w-3/5 mr-10 text-accent'>
          {selected.map((item, index) => (
            <ProfileSelectFieldItem key={index} label={item} editing={false} />
          ))}
        </div>
        <button className='btn btn-sm bg-base-100 hover:bg-base-200 border-base-200 text-accent h-8 w-14 p-0'>
          수정
        </button>
      </div>
      <div className='divider m-0' />
    </>
  );
}

function UserProfile() {
  const [userPosition, setUserPosition] = useState<string[]>([
    '일렉기타',
    '보컬',
  ]);

  const positionOptions = ['일렉기타', '키보드', '보컬', '베이스기타', '드럼'];

  return (
    <div>
      <h1 className='text-bold text-2xl font-bold h-12'>내 정보</h1>
      <div className='mt-6 flex flex-col items-center'>
        <div className='avatar w-1/3'>
          <div className='rounded-full'>
            <img src='https://picsum.photos/200' alt='avatar' />
          </div>
        </div>
        <div className='w-full mt-10'>
          <ProfileTextField label='이름' name='username' />
          <ProfileTextField label='나이' name='age' />
          <ProfileSelectField
            label='포지션'
            name='position'
            selected={userPosition}
            options={positionOptions}
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
