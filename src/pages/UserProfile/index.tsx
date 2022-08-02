import React, { useState } from 'react';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';

function ProfileAddModal({
  label,
  addSelected,
  children,
}: {
  label: string;
  addSelected: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <label
        htmlFor='add-modal'
        className='btn btn-primary btn-sm h-8 w-14 mr-1 p-0 modal-button'
      >
        +추가
      </label>
      <input type='checkbox' id='add-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative flex flex-col items-center'>
          <h3 className='text-lg mb-6'>{label}</h3>
          {children}
          <div className='flex justify-center mt-4 w-1/2'>
            <label
              htmlFor='add-modal'
              className='btn bg-base-[#c5c5c5] w-1/2 text-base-100 border-none mx-2'
            >
              취소
            </label>
            <label
              htmlFor='add-modal'
              onClick={addSelected}
              className='btn btn-primary w-1/2 mx-2'
            >
              추가
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileFieldAddButton({
  label,
  editing,
  selected,
  setSelected,
  options,
}: {
  label: string;
  editing: boolean;
  selected: string[];
  setSelected: (selected: string[]) => void;
  options: string[];
}) {
  const [curOption, setCurOption] = useState(options[0]);

  if (!editing) {
    return null;
  } else {
    return (
      <>
        <ProfileAddModal
          label={`${label} 추가`}
          addSelected={() => {
            setSelected(selected.concat(curOption));
          }}
        >
          <select
            value={curOption}
            onChange={(e) => setCurOption(e.target.value)}
            className='select select-bordered w-full max-w-xs'
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </ProfileAddModal>
      </>
    );
  }
}

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

function ProfileSelectFieldItem({
  label,
  editing,
  deleteSelected,
}: {
  label: string;
  editing: boolean;
  deleteSelected: () => void;
}) {
  if (editing) {
    return (
      <div className='mr-2'>
        {label} <button onClick={deleteSelected}>X</button>
      </div>
    );
  } else {
    return <div className='mr-2'>{label}</div>;
  }
}

function ProfileSelectField({
  label,
  name,
  selected,
  setSelected,
  options,
}: {
  label: string;
  name: string;
  selected: string[];
  setSelected: (selected: string[]) => void;
  options: string[];
}) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className='form-control h-10 w-full flex flex-row justify-start items-center my-2'>
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        <div className='flex flex-row items-center h-10 w-3/5 mr-2 text-accent'>
          {selected.map((item, index) => (
            <ProfileSelectFieldItem
              key={index}
              label={item}
              editing={editing}
              deleteSelected={() => {
                setSelected(selected.filter((s, i) => i !== index));
              }}
            />
          ))}
        </div>
        <ProfileFieldAddButton
          label={label}
          editing={editing}
          selected={selected}
          setSelected={setSelected}
          options={options}
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

function UserProfile() {
  const [curUserProfile, setCurUserProfile] = useState({
    name: '김성현',
    birthday: '1996-01-01',
    positions: [],
    areas: [],
    genres: [],
    description: '',
    userPerformances: [],
  });
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
          <ProfileReadOnlyTextField label='이름' value={curUserProfile.name} />
          <ProfileReadOnlyTextField
            label='나이'
            value={curUserProfile.birthday}
          />
          <ProfileSelectField
            label='포지션'
            name='position'
            selected={userPosition}
            options={positionOptions}
            setSelected={setUserPosition}
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
