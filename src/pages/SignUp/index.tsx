import React, { useState } from 'react';
import GlobalNavBar from '../../components/NavBar';
import SubmitButton from '../../components/SubmitButton';
import TextInput from '../../components/TextInput';
import { Link } from 'react-router-dom';
import GlobalFooter from '../../components/Footer';
import CheckBox from '../../components/CheckBox';
import DateInput from '../../components/DateInput';
import SelectionInput from '../../components/SelectionInput';
import { SignUpForm } from './styles';

function SignUpPage() {
  return (
    <div>
      <GlobalNavBar />
      <div className='flex flex-col items-center mt-10'>
        <h1 className='text-3xl font-bold'>Sign Up</h1>
        <p className='mt-3 text-neutral'>
          <span className='text-error'>*</span> 는 필수 입력 사항
        </p>
        <SignUpForm />
        <div className='text-accent text-sm w-60 md:w-80 mt-5 flex justify-between'>
          <span>이미 계정이 있나요?</span>
          <Link to='/login' className='text-primary'>
            로그인하러 가기
          </Link>
        </div>
      </div>
      <GlobalFooter />
    </div>
  );
}

export default SignUpPage;
