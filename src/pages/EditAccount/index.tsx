import MyPageTemplate from '../../components/MyPageTemplate';
import EditPageInput from '../../components/EditPageInput';
import UserAccountAPI from '../../apis/UserAccountAPI';
import { useEffect, useState } from 'react';

interface UserAccountFormType {
  name: string;
  nickname: string;
  email: string;
  gender: boolean;
  birthday: string;
}

function parseAccountEditForm(form: UserAccountFormType) {
  return {
    ...form,
    birthday: form.birthday.split('T')[0],
  };
}

function AccountEditForm({ label }: { label: string }) {
  const [userAccountInfo, setUserAccountInfo] = useState<UserAccountFormType>({
    name: '',
    nickname: '',
    email: '',
    gender: false,
    birthday: '',
  });

  const onAccountEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserAccountAPI.updateUserAccountInfo(userAccountInfo)
      .then((res) => {
        alert('수정 성공');
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    UserAccountAPI.getUserAccountInfo()
      .then((res) => {
        setUserAccountInfo(parseAccountEditForm(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onEditInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(userAccountInfo);
    setUserAccountInfo({
      ...userAccountInfo,
      [e.target.name]: e.target.value,
    });
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
            label='이메일'
            name='email'
            value={userAccountInfo.email}
            onChange={onEditInfo}
          />
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
            label='생년월일'
            type='date'
            name='birthday'
            value={userAccountInfo.birthday}
            onChange={onEditInfo}
          />
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
