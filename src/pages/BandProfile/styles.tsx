import { MdPhotoCamera } from 'react-icons/md';
import { BandMemberType, PictureType } from '../../types/types';
import TagElement from '../../components/TagElement';

//각 포지션을 한글 표기로 바꾸는 배열
const positionToKorean: { [item: string]: string } = {
  'Electric Guitar': '일렉기타',
  'Acoustic Guitar': '어쿠스틱',
  Drum: '드럼',
  'Bass Guitar': '베이스',
  Keyboard: '키보드',
  Vocal: '보컬',
  Others: '그 외',
};

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
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        {editing ? (
          <input
            value={value}
            className='input input-bordered'
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        ) : (
          <div className='flex items-center h-10 w-3/5'>{value}</div>
        )}
      </div>
      <div className='divider m-0' />
    </>
  );
}

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
      <TagElement
        tag={
          member.positions.length
            ? positionToKorean[member.positions[0].name]
            : ''
        }
      />
      {editing ? <button onClick={deleteMember}>X</button> : null}
    </li>
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
  return (
    <div className='w-full flex flex-col my-2'>
      <div className='flex flex-row justify-between'>
        <label className='label w-1/4 py-0 mb-5'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        {editing && frontmanReading ? (
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
  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between items-center h-8 mb-5'>
        <h1>{label}</h1>
        {editing ? (
          <button className='btn btn-primary btn-sm h-8 w-14 mr-1 p-0'>
            +추가
          </button>
        ) : null}
      </div>
      <div className='flex flex-row overflow-x-auto items-center'>
        {bandPhotos.map((photo) => (
          <BandProfileAlbumItem
            key={photo.id}
            photo={photo}
            deletePhoto={() => {
              setBandPhotos(
                bandPhotos.filter((_photo) => _photo.id !== photo.id),
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
