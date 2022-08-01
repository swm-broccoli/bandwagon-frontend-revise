import React, { FormEvent } from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link, useLocation } from 'react-router-dom';
import MyPageMenu, { myPageMenuItems } from '../../components/MyPageMenu';
import EditPageInput from '../../components/EditPageInput';

function PasswordChangeForm({ label }: { label: string }) {
  return (
    <div className='grid auto-rows-min'>
      <form>
        <div className='flex flex-row justify-between'>
          <h1 className='text-bold text-2xl font-bold'>{label}</h1>
          <button type='submit' className='btn btn-primary h-10'>
            비밀번호 변경
          </button>
        </div>

        <div className='mt-6 row-start-2 col-span-full'>
          <EditPageInput label='아이디' name='id' />
          <EditPageInput label='현재 비밀번호' password name='curPassword' />
          <EditPageInput label='새 비밀번호' password name='newPassword' />
          <EditPageInput
            label='새 비밀번호 확인'
            password
            name='newPasswordConfirm'
          />
        </div>
      </form>
    </div>
  );
}

function PasswordEditPage() {
  return (
    <div>
      <GlobalNavBar />
      <div className='grid grid-cols-6'>
        <div className='col-start-2 col-end-6 flex flex-col md:flex-row'>
          <div className='w-full md:w-1/5 md:col-span-1 min-w-[150px] mt-10'>
            <MyPageMenu menuList={myPageMenuItems} />
          </div>
          <div className='pl-5 pt-5 md:pt-12 w-full'>
            <PasswordChangeForm label={`비밀번호 변경`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordEditPage;
