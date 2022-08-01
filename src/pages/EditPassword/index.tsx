import React, { FormEvent } from 'react';
import GlobalNavBar from '../../components/NavBar';
import { Link, useLocation } from 'react-router-dom';
import MyPageMenu, { myPageMenuItems } from '../../components/MyPageMenu';

function EditInput({
  label,
  password = false,
  name,
}: {
  label: string;
  name?: string;
  password?: boolean;
}) {
  return (
    <>
      <div className='form-control w-full flex flex-row justify-start py-2'>
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        <input
          type={password ? 'password' : 'text'}
          placeholder='Type here'
          name={name}
          className='input input-bordered w-3/5 max-w-xs focus:outline-none focus:border-primary text-accent'
        />
      </div>
      <div className='divider m-0 w-5/6' />
    </>
  );
}

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
          <EditInput label='아이디' name='id' />
          <EditInput label='현재 비밀번호' password name='curPassword' />
          <EditInput label='새 비밀번호' password name='newPassword' />
          <EditInput
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
