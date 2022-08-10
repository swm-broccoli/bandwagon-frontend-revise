import { MdPhotoCamera } from 'react-icons/md';
import { BandMemberType } from '../../types/types';
import TagElement from '../../components/TagElement';

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

export function BandMemberList({
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
    <div className='w-full flex flex-col my-2'>
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
      <div className='divider m-0 mt-5' />
    </div>
  );
}
