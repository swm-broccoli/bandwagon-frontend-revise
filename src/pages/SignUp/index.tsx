import React, { useState } from 'react';
import GlobalNavBar from '../../components/NavBar';
import TextInput from '../../components/TextInput';

function DateInput({ label }: { label: string }) {
  return (
    <div className='flex flex-col mt-5'>
      <label className='text-accent mb-2 text-sm'>{label}</label>
      <input
        type='date'
        placeholder='1997-01-29'
        className='input input-bordered w-60 md:w-80 focus:outline-none focus:border-primary invalid:border-error text-accent'
      />
    </div>
  );
}

function SelectionInput({
  label,
  selectionList,
}: {
  label: string;
  selectionList: string[];
}) {
  const [curSelection, setCurSelection] = useState(selectionList[0]);

  return (
    <div className='flex flex-col mt-5 w-60 md:w-80'>
      <label className='text-accent mb-2 text-sm'>{label}</label>
      <div className='grid grid-flow-col space-x-3'>
        {selectionList.map((selection) => {
          return (
            <button
              key={selection}
              className={`btn text-base-300 font-normal ${
                curSelection === selection
                  ? 'bg-success border-primary text-primary hover:bg-[#bbf7d0] hover:border-primary'
                  : 'bg-base-100 border-base-200 text-[#ababab] hover:bg-success hover:border-primary'
              }`}
              onClick={() => setCurSelection(selection)}
            >
              {selection}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TermAgreeBox({ label }: { label: string }) {
  //약관 동의 박스
  return (
    <div className='flex flex-col mt-5 w-60 md:w-80'>
      <label className='text-accent mb-2 text-sm'>{label}</label>
      <div className='border-base-200'>
        <label className='label cursor-pointer'>
          <input
            type='checkbox'
            className='checkbox checkbox-primary rounded-full bg-base-100 checked:color-base-100'
          />
          <span className='label-text'>약관에 전체 동의합니다.</span>
        </label>
      </div>
    </div>
  );
}

function SignUpForm() {
  const genderSelection = ['남자', '여자'];

  return (
    <form className='mt-5'>
      <TextInput label='이름' placeholder='김성현' required essential />
      <TextInput label='닉네임' placeholder='asdf1234' required essential />
      <TextInput
        label='이메일'
        placeholder='ksh1234@gmail.com'
        required
        essential
      />
      <TextInput
        label='비밀번호'
        placeholder='1234'
        password
        required
        essential
      />
      <TextInput
        label='비밀번호 확인'
        placeholder='1234'
        password
        required
        essential
      />
      <DateInput label='생년월일' />
      <SelectionInput label='성별' selectionList={genderSelection} />
      <TermAgreeBox label='약관 동의' />
    </form>
  );
}

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
      </div>
    </div>
  );
}

export default SignUpPage;
