import React, { useState } from 'react';
import SubmitButton from '../../components/SubmitButton';
import TextInput from '../../components/TextInput';
import CheckBox from '../../components/CheckBox';
import DateInput from '../../components/DateInput';
import SelectionInput from '../../components/SelectionInput';

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

export { SignUpForm };
