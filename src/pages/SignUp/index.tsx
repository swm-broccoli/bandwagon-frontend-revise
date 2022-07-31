import React, { useState } from 'react';
import GlobalNavBar from '../../components/NavBar';
import SubmitButton from '../../components/SubmitButton';
import TextInput from '../../components/TextInput';
import { Link } from 'react-router-dom';
import GlobalFooter from '../../components/Footer';

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
                  ? 'bg-success border-primary border-2 text-primary hover:bg-[#bbf7d0] hover:border-primary'
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

function CheckBox({
  text,
  checked = false,
  onClick,
}: {
  text: string;
  checked?: boolean;
  onClick: () => void;
}) {
  return (
    <label className='label cursor-pointer flex flex-row justify-start pt-2'>
      <input
        type='checkbox'
        className='checkbox checkbox-primary rounded-full bg-base-100 checked:color-base-100'
        checked={checked}
        onChange={onClick}
      />
      <span className='label-text text-neutral ml-3'>{text}</span>
    </label>
  );
}

function TermAgreeBox({ label }: { label: string }) {
  //약관 동의 박스
  const [checkedList, setCheckedList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className='flex flex-col mt-5 w-60 md:w-80'>
      <label className='text-accent mb-2 text-sm'>{label}</label>
      <div className='border border-base-200 rounded-lg px-3 md:px-5'>
        <div className='mt-2'>
          <CheckBox
            text='약관 전체 동의'
            checked={checkedList.every((checked) => checked === true)}
            onClick={() => {
              if (checkedList.every((checked) => checked === true)) {
                //만약 모두 true
                setCheckedList([false, false, false, false]);
              } else {
                setCheckedList([true, true, true, true]);
              }
            }}
          />
        </div>

        <div className='divider m-0' />
        <CheckBox
          text='만 14세 이상입니다.'
          checked={checkedList[0]}
          onClick={() => {
            setCheckedList((prev) => {
              return prev.map((_, i) => (i === 0 ? !prev[i] : prev[i]));
            });
          }}
        />
        <CheckBox
          text='이용약관 동의'
          checked={checkedList[1]}
          onClick={() => {
            setCheckedList((prev) => {
              return prev.map((_, i) => (i === 1 ? !prev[i] : prev[i]));
            });
          }}
        />
        <CheckBox
          text='개인정보 수집 및 이용 동의'
          checked={checkedList[2]}
          onClick={() => {
            setCheckedList((prev) => {
              return prev.map((_, i) => (i === 2 ? !prev[i] : prev[i]));
            });
          }}
        />
        <CheckBox
          text='마케팅 정보 수신 동의'
          checked={checkedList[3]}
          onClick={() => {
            setCheckedList((prev) => {
              return prev.map((_, i) => (i === 3 ? !prev[i] : prev[i]));
            });
          }}
        />
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
        placeholder='비밀번호'
        password
        required
        essential
      />
      <TextInput
        label='비밀번호 확인'
        placeholder='비밀번호를 한 번 더 입력해 주세요.'
        password
        required
        essential
      />
      <DateInput label='생년월일' />
      <SelectionInput label='성별' selectionList={genderSelection} />
      <TermAgreeBox label='약관 동의' />
      <SubmitButton label='가입하기' />
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
