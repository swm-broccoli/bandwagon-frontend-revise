import EditPageInput from '../../components/EditPageInput';
import MyPageTemplate from '../../components/MyPageTemplate';
import UserAccountAPI from '../../apis/UserAccountAPI';
import { useEffect, useState } from 'react';

interface PasswordChangeFormType {
  email: string;
  curPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

function PasswordChangeForm({ label }: { label: string }) {
  const [passwordChangeForm, setPasswordChangeForm] =
    useState<PasswordChangeFormType>({
      email: '',
      curPassword: '',
      newPassword: '',
      newPasswordCheck: '',
    });

  useEffect(() => {
    UserAccountAPI.getUserAccountInfo()
      .then((res) => {
        console.log(res.data);
        setPasswordChangeForm({
          ...passwordChangeForm,
          email: res.data.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    setPasswordChangeForm({
      ...passwordChangeForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='grid auto-rows-min'>
      <form>
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
            value={passwordChangeForm.email}
            onChange={onChangeForm}
          />
          <EditPageInput
            label='현재 비밀번호'
            type='password'
            name='curPassword'
            value={passwordChangeForm.curPassword}
            onChange={onChangeForm}
          />
          <EditPageInput
            label='새 비밀번호'
            type='password'
            name='newPassword'
            value={passwordChangeForm.newPassword}
            onChange={onChangeForm}
          />
          <EditPageInput
            label='새 비밀번호 확인'
            type='password'
            name='newPasswordConfirm'
            value={passwordChangeForm.newPasswordCheck}
            onChange={onChangeForm}
          />
        </div>
      </form>
    </div>
  );
}

function PasswordEditPage() {
  return (
    <MyPageTemplate>
      <PasswordChangeForm label='비밀번호 변경' />
    </MyPageTemplate>
  );
}

export default PasswordEditPage;
