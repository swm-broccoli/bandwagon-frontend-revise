import EditPageInput from '../../components/EditPageInput';
import MyPageTemplate from '../../components/MyPageTemplate';

function PasswordChangeForm({ label }: { label: string }) {
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
          <EditPageInput label='아이디' name='id' />
          <EditPageInput
            label='현재 비밀번호'
            type='password'
            name='curPassword'
          />
          <EditPageInput
            label='새 비밀번호'
            type='password'
            name='newPassword'
          />
          <EditPageInput
            label='새 비밀번호 확인'
            type='password'
            name='newPasswordConfirm'
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
