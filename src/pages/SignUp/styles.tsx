import React, { useEffect, useState } from 'react';
import SubmitButton from '../../components/SubmitButton';
import TextInput from '../../components/TextInput';
import CheckBox from '../../components/CheckBox';
import DateInput from '../../components/DateInput';
import SelectionInput from '../../components/SelectionInput';

function TermAgreeBox({
  label,
  setAgreed,
}: {
  label: string;
  setAgreed: (newAgreed: boolean) => void;
}) {
  //약관 동의 박스
  const [checkedList, setCheckedList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    setAgreed(checkedList.every((checked) => checked));
  }, [checkedList]);

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

interface SignUpUserInputType {
  name: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  birthday: string;
  gender: string;
  termAgreed: boolean;
  emailDupChecked: boolean;
}

function SignUpForm() {
  const genderSelection = ['남자', '여자'];

  const [signUpUserInput, setSignUpUserInput] = useState<SignUpUserInputType>({
    name: '',
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
    birthday: '',
    gender: '남자',
    termAgreed: false,
    emailDupChecked: false,
  });

  const signUpSubmissionValidate = (submission: SignUpUserInputType) => {};

  const onSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('회원가입 폼 제출');
    console.log('입력값:', signUpUserInput);
  };

  return (
    <form onSubmit={onSignUpSubmit} className='mt-5'>
      <TextInput
        label='이름'
        value={signUpUserInput.name}
        setValue={(newName) => {
          setSignUpUserInput({ ...signUpUserInput, name: newName });
        }}
        required
      />
      <TextInput
        label='닉네임'
        value={signUpUserInput.nickname}
        setValue={(newNickName) => {
          setSignUpUserInput({ ...signUpUserInput, nickname: newNickName });
        }}
        required
      />
      <div className='flex flex-row'>
        <TextInput
          label='이메일'
          value={signUpUserInput.email}
          setValue={(newEmail) => {
            setSignUpUserInput({ ...signUpUserInput, email: newEmail });
          }}
          required
        />
        <button className='absolute ml-[248px] md:ml-[328px] btn btn-primary self-end'>
          중복확인
        </button>
      </div>

      <TextInput
        label='비밀번호'
        value={signUpUserInput.password}
        setValue={(newPassword) => {
          setSignUpUserInput({ ...signUpUserInput, password: newPassword });
        }}
        password
        required
      />
      <TextInput
        label='비밀번호 확인'
        value={signUpUserInput.passwordCheck}
        setValue={(newPasswordCheck) => {
          setSignUpUserInput({
            ...signUpUserInput,
            passwordCheck: newPasswordCheck,
          });
        }}
        password
        required
      />

      <DateInput
        label='생년월일'
        value={signUpUserInput.birthday}
        setValue={(newBirthday) => {
          setSignUpUserInput({ ...signUpUserInput, birthday: newBirthday });
        }}
      />
      <SelectionInput
        label='성별'
        value={signUpUserInput.gender}
        setValue={(newGender) => {
          setSignUpUserInput({ ...signUpUserInput, gender: newGender });
        }}
        selections={genderSelection}
      />
      <TermAgreeBox
        label='약관 동의'
        setAgreed={(newAgreed) => {
          setSignUpUserInput({ ...signUpUserInput, termAgreed: newAgreed });
        }}
      />
      <SubmitButton label='가입하기' />
    </form>
  );
}

export { SignUpForm };
