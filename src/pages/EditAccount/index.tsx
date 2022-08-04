import MyPageTemplate from '../../components/MyPageTemplate';
import EditPageInput from '../../components/EditPageInput';
import UserAccountAPI from '../../apis/UserAccountAPI';
import { useEffect } from 'react';

function AccountEditForm({ label }: { label: string }) {
  useEffect(() => {
    UserAccountAPI.getUserAccountInfo().then((res) => {
      console.log(res.data);
    });
  });

  return (
    <div>
      <form>
        <div className='flex flex-row justify-between'>
          <h1 className='text-bold text-2xl font-bold'>{label}</h1>
          <button type='submit' className='btn btn-primary h-10'>
            수정 완료
          </button>
        </div>

        <div className='mt-6 row-start-2 col-span-full'>
          <EditPageInput label='이름' name='name' />
          <EditPageInput label='생년월일' type='date' name='birthday' />
          <EditPageInput label='이메일' name='email' />
          <EditPageInput
            label='현재 비밀번호'
            type='password'
            name='password'
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
