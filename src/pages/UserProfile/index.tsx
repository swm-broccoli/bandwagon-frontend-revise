import MyPageTemplate from '../../components/MyPageTemplate';

function ProfileTextField({
  label,
  name,
  editing = false,
}: {
  label: string;
  name: string;
  editing: boolean;
}) {
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
          className='input input-bordered h-10 w-3/5 mr-10 max-w-xs focus:outline-none focus:border-primary text-accent'
        />
        <button className='btn btn-sm bg-base-100 hover:bg-base-200 border-base-200 text-accent h-8 w-14 p-0'>
          수정
        </button>
      </div>
      <div className='divider m-0' />
    </>
  );
}

function UserProfile() {
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
          <ProfileTextField label='이름' name='username' editing={false} />
          <ProfileTextField label='나이' name='age' editing={false} />
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
