import { MdPhotoCamera } from 'react-icons/md';
import { BandMemberType, PictureType } from '../../types/types';
import TagElement from '../../components/TagElement';
import positionOptions, {
  positionToKorean,
} from '../../assets/options/positionOptions';
import { useEffect, useState } from 'react';
import ProfileAddModal from '../../components/ProfileAddModal';
import BandProfileAPI from '../../apis/BandProfileAPI';

export function BandProfileAvatar({
  avatarURL,
  setAvatarURL,
  editing,
}: {
  avatarURL: string;
  setAvatarURL: (newURL: string) => void;
  editing: boolean;
}) {
  const avatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarURL(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className='avatar w-1/3'>
        <div className='w-full rounded-full'>
          <img src={avatarURL} alt='프로필 사진' />
        </div>
        {editing ? (
          <>
            <label
              htmlFor='band-avatar'
              className='bottom-0 right-0 w-10 h-10 p-0 absolute btn btn-sm bg-base-200 hover:bg-base-300 outline outline-base-100 border-none rounded-full'
            >
              <MdPhotoCamera size={20} />
            </label>
            <input
              className='hidden'
              type='file'
              id='band-avatar'
              accept='image/*'
              onChange={avatarChange}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export function ProfileTextField({
  label,
  value,
  setValue,
  editing = false,
}: {
  label: string;
  value: string;
  setValue: (newValue: string) => void;
  editing?: boolean;
}) {
  return (
    <>
      <div className='form-control h-10 w-full flex flex-row justify-start items-center my-2'>
        <label className='label w-1/4 min-w-[60px] max-w-[120px] py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        {editing ? (
          <input
            value={value}
            className='input input-bordered w-full text-lg'
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        ) : (
          <div className='flex items-center h-10 w-full'>{value}</div>
        )}
      </div>
      <div className='divider m-0' />
    </>
  );
}

function BandMemberListItem({
  member,
  setMember,
  deleteMember,
  editing,
  isFrontman,
  frontmanReading,
}: {
  member: BandMemberType;
  setMember: (newMember: BandMemberType) => void;
  deleteMember: () => void;
  editing: boolean;
  isFrontman: boolean;
  frontmanReading: boolean;
}) {
  const addPosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const curValue = JSON.parse(e.target.value);
    console.log(curValue);
    if (member.positions.find((p) => p.id === curValue.id) === undefined) {
      setMember({
        ...member,
        positions: [...member.positions, curValue],
      });
    }
  };
  if (member.email === null) {
    // 이메일이 널인 멤버는 삭제된 것이므로 표시하지 않는다.
    return null;
  } else if (!editing) {
    // 편집 중이 아닐 경우
    return (
      <li className='flex flex-row items-center border rounded-lg p-2'>
        <p className='text-accent text-base mr-2.5'>
          {member.name}
          {isFrontman ? (
            <span className='badge badge-secondary ml-1'>Frontman</span>
          ) : null}
        </p>
        {member.positions.length
          ? member.positions.map((position) => (
              <TagElement
                key={position.id}
                tag={positionToKorean[position.name]}
              />
            ))
          : null}
      </li>
    );
  } else {
    // 편집 중일 경우
    return (
      <li className='flex flex-col items-center w-full border rounded-lg p-2'>
        <div className='relative flex flex-row justify-start items-center w-full'>
          <p className='text-accent text-base mr-2.5'>{member.name}</p>

          {/* 프론트맨에게만 포지션 추가와 삭제 버튼이 보여야 한다.*/}
          {frontmanReading ? (
            <>
              <select
                defaultValue={''}
                onChange={addPosition}
                className='select select-sm bg-base-200 hover:bg-base-300 rounded-full appearance-none'
              >
                <option value='' disabled>
                  포지션 추가
                </option>
                {positionOptions.map((option) => (
                  <option key={option.id} value={JSON.stringify(option)}>
                    {positionToKorean[option.name]}
                  </option>
                ))}
              </select>
              <button className='absolute right-1' onClick={deleteMember}>
                X
              </button>
            </>
          ) : null}
          {isFrontman ? (
            <span className='badge badge-secondary ml-1'>Frontman</span>
          ) : null}
        </div>
        <div className='flex flex-row w-full mt-2 justify-start'>
          {member.positions.length
            ? member.positions.map((position) => (
                <div className='flex flex-row' key={position.id}>
                  <TagElement tag={positionToKorean[position.name]} />
                  {frontmanReading ? (
                    <button
                      onClick={() => {
                        setMember({
                          ...member,
                          positions: member.positions.filter(
                            (p) => p.id !== position.id,
                          ),
                        });
                      }}
                      className='mr-1'
                    >
                      X
                    </button>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </li>
    );
  }
}

function BandMemberAddButton({
  label,
  addMemberByEmail,
}: {
  label: string;
  addMemberByEmail: (email: string) => void;
}) {
  const [newMemberEmail, setNewMemberEmail] = useState<string>('');

  return (
    <ProfileAddModal
      label={`${label} 추가`}
      addSelected={() => {
        addMemberByEmail(newMemberEmail);
        setNewMemberEmail('');
      }}
    >
      <input
        placeholder='추가할 멤버의 이메일 입력'
        className='input input-bordered w-full'
        value={newMemberEmail}
        onChange={(e) => {
          setNewMemberEmail(e.target.value);
        }}
      />
    </ProfileAddModal>
  );
}

export function BandMemberList({
  label,
  bandMembers,
  setBandMembers,
  editing,
  frontmanReading,
}: {
  label: string;
  bandMembers: BandMemberType[];
  setBandMembers: (bandMembers: BandMemberType[]) => void;
  editing: boolean;
  frontmanReading: boolean;
}) {
  const [tempNewMemberID, setTempNewMemberID] = useState<number>(-1);
  // 프론트맨이 아니면 편집 안 되도록 한다.
  const addMemberByEmail = (email: string) => {
    BandProfileAPI.getNewMemberInfo(email)
      .then((res) => {
        // res에는 새로 추가할 사용자의 정보가 들어 있다.
        const curUserID = localStorage.getItem('userID');
        if (curUserID === email) {
          alert('자기 자신은 밴드에 추가할 수 없습니다.');
        } else if (
          bandMembers.find((member) => member.email === email) !== undefined
        ) {
          // TODO : 이미 밴드에 있는 사람이면 에러가 뜬다. 그 경우의 에러 메시지 추가하기
          alert('이미 밴드에 있는 사람입니다.');
        } else {
          console.log(res.data);
          // 새로 받아온 멤버를 추가한다
          setBandMembers([
            ...bandMembers,
            {
              id: tempNewMemberID, // 새로 추가한 멤버의 ID는 음수가 된다.
              age: res.data.age,
              email: email,
              avatarUrl: res.data.avatarUrl,
              name: res.data.name,
              birthday: res.data.birthday,
              positions: [],
              isFrontman: false,
            },
          ]);
          setTempNewMemberID((prev) => prev - 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='w-full flex flex-col my-2'>
      <div className='flex flex-row justify-between'>
        <label className='label w-1/4 py-0 mb-5'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        {editing ? (
          frontmanReading ? (
            <BandMemberAddButton
              label={label}
              addMemberByEmail={addMemberByEmail}
            />
          ) : (
            <small>멤버 편집은 프론트맨만 할 수 있습니다.</small>
          )
        ) : null}
      </div>
      <ul className='w-full flex flex-row flex-wrap gap-x-7 gap-y-2'>
        {bandMembers.map((member, index) => (
          <BandMemberListItem
            key={index}
            member={member}
            setMember={(newMember) => {
              setBandMembers(
                bandMembers.map((m, i) => (i === index ? newMember : m)),
              );
            }}
            editing={editing}
            deleteMember={() => {
              if (frontmanReading === false) {
                // 읽고 있는 사람이 프론트맨이 아니다
                alert('프론트맨만 밴드 멤버를 삭제할 수 있습니다.');
              } else if (frontmanReading && member.isFrontman === true) {
                /* 
                프론트맨만 밴드 멤버를 삭제할 수 있다. 그런데 프론트맨이 프론트맨을 삭제하는 경우
                자기 자신을 삭제하는 것이므로 당연히 에러이다
                */
                alert(
                  '자기 자신을 삭제할 수 없습니다. 탈퇴 기능을 이용해 주세요.',
                );
              } else {
                setBandMembers(
                  bandMembers.map((_member) =>
                    _member.id === member.id
                      ? // 삭제된 멤버의 email을 널로 처리해서 삭제를 표시한다.
                        { ..._member, email: null }
                      : _member,
                  ),
                );
              }
            }}
            frontmanReading={frontmanReading}
            isFrontman={member.isFrontman}
          />
        ))}
      </ul>
      <div className='divider m-0 mt-5' />
    </div>
  );
}

function BandProfileAlbumItem({
  photo,
  editing,
  deletePhoto,
}: {
  photo: PictureType;
  deletePhoto: () => void;
  editing: boolean;
}) {
  //shrink-0 으로 설정하여 사진이 축소되지 않도록 함
  if (photo.name === null) {
    return null;
  } else {
    return (
      <div className='flex flex-row shrink-0 mr-4 items-start'>
        <img
          className='w-32 h-32 rounded-xl mr-1'
          src={photo.name}
          alt={`밴드 사진`}
        />
        {editing ? <button onClick={deletePhoto}>X</button> : null}
      </div>
    );
  }
}

export function BandProfileAlbum({
  label,
  bandPhotos,
  setBandPhotos,
  editing,
}: {
  label: string;
  bandPhotos: PictureType[];
  setBandPhotos: (bandPhotos: PictureType[]) => void;
  editing: boolean;
}) {
  const [tempPhotoID, setTempPhotoID] = useState(-1);

  const addPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onload = () => {
      setBandPhotos([
        ...bandPhotos,
        { id: tempPhotoID, name: reader.result as string },
      ]);
      setTempPhotoID((prev) => prev - 1);
      console.log('사진 추가');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between items-center text-sm h-8 mb-5'>
        <h1>{label}</h1>
        {editing ? (
          <>
            <label
              htmlFor='band-album'
              className='btn btn-primary btn-sm h-8 w-14 mr-1 p-0'
            >
              +추가
            </label>
            <input
              className='hidden'
              type='file'
              id='band-album'
              accept='image/*'
              onChange={addPhoto}
            />
          </>
        ) : null}
      </div>
      <div className='flex flex-row overflow-x-auto items-center'>
        {bandPhotos.map((photo) => (
          <BandProfileAlbumItem
            key={photo.id}
            photo={photo}
            deletePhoto={() => {
              console.log(photo.id);
              setBandPhotos(
                // 지운 사진의 name은 null이 된다.
                bandPhotos.map((_photo) =>
                  _photo.id === photo.id
                    ? { id: _photo.id, name: null }
                    : _photo,
                ),
              );
            }}
            editing={editing}
          />
        ))}
      </div>
      <div className='divider m-0 mt-5' />
    </div>
  );
}
