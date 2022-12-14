import MyPageTemplate from '../../components/MyPageTemplate';
import EditPageInput from '../../components/EditPageInput';
import UserAccountAPI from '../../apis/UserAccountAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendbirdChat from '@sendbird/chat';

interface UserAccountFormType {
  name: string;
  nickname: string;
  email: string;
  gender: string;
  birthday: string;
}

function parseUserProfile(userProfile: UserAccountFormType) {
  return {
    ...userProfile,
    birthday: userProfile.birthday ? userProfile.birthday : '2000-01-01',
  };
}

const setupUser = async (nickname: string, email: string) => {
  const { VITE_SENDBIRD_API_KEY } = import.meta.env;

  const sendbirdChat = await SendbirdChat.init({
    appId: VITE_SENDBIRD_API_KEY,
  });

  await sendbirdChat.connect(email);
  
  const userUpdateParams = {
    nickname: nickname,
    userId: email
  };
  await sendbirdChat.updateCurrentUserInfo(userUpdateParams);

  sendbirdChat.disconnect();
}

function AccountEditForm({ label }: { label: string }) {
  const [userAccountInfo, setUserAccountInfo] = useState<UserAccountFormType>({
    name: '',
    nickname: '',
    email: '',
    gender: 'false',
    birthday: '',
  });

  const onAccountEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setupUser(userAccountInfo.nickname, userAccountInfo.email);
    UserAccountAPI.updateUserAccountInfo(userAccountInfo)
      .then((res) => {
        alert('수정 성공');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    UserAccountAPI.getUserAccountInfo()
      .then((res) => {
        setUserAccountInfo(parseUserProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onEditInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    setUserAccountInfo({
      ...userAccountInfo,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const onUnregister = () => {
    let isConfirm = window.confirm('정말 밴드웨건을 탈퇴하시겠습니까?');
    if (isConfirm) {
      UserAccountAPI.unregisterUserAccount()
        .then((res) => {
          console.log(res.data);
          alert('탈퇴 성공');
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <form onSubmit={onAccountEditSubmit}>
        <div className='flex flex-row justify-between'>
          <h1 className='text-bold text-2xl font-bold'>{label}</h1>
          <button type='submit' className='btn btn-primary h-10'>
            수정 완료
          </button>
        </div>

        <div className='mt-6 row-start-2 col-span-full'>
          <EditPageInput
            label='이름'
            name='name'
            value={userAccountInfo.name}
            onChange={onEditInfo}
          />
          <EditPageInput
            label='닉네임'
            name='nickname'
            value={userAccountInfo.nickname}
            onChange={onEditInfo}
          />
          <EditPageInput
            label='이메일'
            name='email'
            value={userAccountInfo.email}
            onChange={onEditInfo}
          />
          <EditPageInput
            label='생년월일'
            type='date'
            name='birthday'
            value={userAccountInfo.birthday}
            onChange={onEditInfo}
          />
          <>
            <div className='form-control w-full flex flex-row justify-start py-2'>
              <label className='label w-28 py-0'>
                <span className='label-text text-accent'>{label}</span>
              </label>
              <select
                name='gender'
                value={userAccountInfo.gender}
                onChange={onEditInfo}
                className='select select-bordered w-3/5 max-w-xs focus:outline-none focus:border-primary text-accent'
              >
                <option value='false'>남자</option>
                <option value='true'>여자</option>
              </select>
            </div>
            <div className='divider m-0 w-5/6' />
          </>
          <button
            type='button'
            className='btn btn-neutral text-base-100 w-40 mt-2'
            onClick={onUnregister}
          >
            회원 탈퇴
          </button>
        </div>
      </form>
    </div>
  );
}

function AccountEditPage() {
  return (
    <MyPageTemplate>
      <AccountEditForm label='계정 정보 수정' />
    </MyPageTemplate>
  );
}

export default AccountEditPage;
