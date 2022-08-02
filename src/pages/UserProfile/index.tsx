import React, { useEffect, useState } from 'react';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';
import ProfileSelectField from '../../components/ProfileSelectField';
import { AreaType } from '../../types/types';
import areaOptions from '../../assets/options/areaOptions';
import ProfileAddModal from '../../components/ProfileAddModal';

function AreaFieldItem({
  area,
  editing,
  deleteArea,
}: {
  area: AreaType;
  editing: boolean;
  deleteArea: () => void;
}) {
  if (editing) {
    return (
      <div className='mr-2'>
        {`${area.city} ${area.district}`}
        <button onClick={deleteArea}>X</button>
      </div>
    );
  } else {
    return <div className='mr-2'>{`${area.city} ${area.district}`}</div>;
  }
}

function AreaFieldAddButton({
  label,
  editing,
  areas,
  setAreas,
  options,
}: {
  label: string;
  editing: boolean;
  areas: AreaType[];
  setAreas: (areas: AreaType[]) => void;
  options: AreaType[];
}) {
  const [curAreaOption, setCurAreaOption] = useState<AreaType>(options[0]);

  const cityOptions = options
    .map((area) => area.city)
    .filter((city, index, self) => self.indexOf(city) === index);

  if (!editing) {
    return null;
  } else {
    return (
      <ProfileAddModal
        label={`${label} 추가`}
        addSelected={() => {
          setAreas(areas.concat(curAreaOption));
        }}
      >
        <div className='flex flex-row justify-center'>
          <select
            value={curAreaOption.city}
            onChange={(e) =>
              setCurAreaOption(
                options.find((option) => option.city === e.target.value) ||
                  options[0],
              )
            }
            className='select select-bordered w-full max-w-xs'
          >
            {cityOptions.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={curAreaOption.district}
            onChange={(e) => {
              setCurAreaOption(
                options.find(
                  (option) =>
                    option.city === curAreaOption.city &&
                    option.district === e.target.value,
                ) || options[0],
              );
            }}
            className='select select-bordered w-full max-w-xs'
          >
            {options
              .filter((area) => {
                return area.city === curAreaOption.city;
              })
              .map((area, index) => (
                <option key={index} value={area.district}>
                  {area.district}
                </option>
              ))}
          </select>
        </div>
      </ProfileAddModal>
    );
  }
}

function AreaField({
  label,
  areas,
  setAreas,
  options,
}: {
  label: string;
  areas: AreaType[];
  setAreas: (areas: AreaType[]) => void;
  options: AreaType[];
}) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className='form-control h-10 w-full flex flex-row justify-start items-center my-2'>
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        <div className='flex flex-row items-center h-10 w-3/5 mr-2 text-accent'>
          {areas.map((area, index) => (
            <AreaFieldItem
              key={index}
              area={area}
              editing={editing}
              deleteArea={() => {
                setAreas(areas.filter((_, i) => i !== index));
              }}
            />
          ))}
        </div>
        <AreaFieldAddButton
          label={label}
          editing={editing}
          areas={areas}
          setAreas={setAreas}
          options={options}
        />
        <button
          onClick={() => {
            setEditing((prev) => !prev);
          }}
          className='btn btn-sm bg-base-100 hover:bg-base-200 border-base-200 text-accent h-8 w-14 p-0'
        >
          {editing ? '완료' : '수정'}
        </button>
      </div>
      <div className='divider m-0' />
    </>
  );
}

function UserProfile() {
  const [curUserProfile, setCurUserProfile] = useState({
    name: '김성현',
    birthday: '1996-01-01',
    positions: ['일렉기타'],
    areas: [{ id: 2, city: '서울', district: '중구' }],
    genres: [],
    description: '',
    userPerformances: [],
  });

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
