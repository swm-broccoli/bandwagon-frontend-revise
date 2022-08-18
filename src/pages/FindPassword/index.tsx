import { useState } from 'react';
import FindAccountAPI from '../../apis/FindAccountAPI';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import TextInput from '../../components/TextInput';
import FindPasswordForm from './FindPasswordForm';
import { useNavigate } from 'react-router-dom';

function FindPasswordPage() {
  return (
    <div>
      <GlobalNavBar />
      <main className='flex flex-col items-center'>
        <h1 className='mt-10 text-3xl font-extrabold'>비밀번호 찾기</h1>
        <div className='text-neutral mt-3'>
          가입할 때 입력한 이름과 이메일을 입력해 주세요.
        </div>
        <FindPasswordForm />
      </main>
      <GlobalFooter />
    </div>
  );
}

export default FindPasswordPage;
