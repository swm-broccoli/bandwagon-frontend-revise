import { MdPhotoCamera } from 'react-icons/md';

export function UserProfileAvatar({
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
        <div className='w-full rounded-full border border-base-300'>
          <img src={avatarURL} alt='프로필 사진' />
        </div>
        {editing ? (
          <>
            <label
              htmlFor='user-avatar'
              className='bottom-0 right-0 w-10 h-10 p-0 absolute btn btn-sm bg-base-200 hover:bg-base-300 outline outline-base-100 border-none rounded-full'
            >
              <MdPhotoCamera size={20} />
            </label>
            <input
              className='hidden'
              type='file'
              id='user-avatar'
              accept='image/*'
              onChange={avatarChange}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
