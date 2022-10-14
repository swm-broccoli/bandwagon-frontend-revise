import React, { useEffect, useState } from 'react';
import TextInput from '../../components/TextInput';

import DateInput from '../../components/DateInput';
import SelectionInput from '../../components/SelectionInput';
import AuthAPI from '../../apis/AuthAPI';
import { useNavigate } from 'react-router-dom';
import { SignUpUserInputType } from '../../types/types';
import { validateSignUpForm } from './validateSignUpForm';
import SendbirdChat from '@sendbird/chat';
import TermAgreeBox from './TermAgreeBox';

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function SignUpForm() {
  const genderSelection = ['남자', '여자'];

  const [signUpUserInput, setSignUpUserInput] = useState<SignUpUserInputType>({
    name: '',
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
    birthday: getTodayDate(),
    gender: '남자',
  });

  const [termAgreed, setTermAgreed] = useState(false);
  const [emailDupChecked, setEmailDupChecked] = useState(false);

  const userEmailDuplicationCheck = () => {
    AuthAPI.checkEmail({ email: signUpUserInput.email })
      .then((res) => {
        if (res.data) {
          setEmailDupChecked(true);
          alert(`${res.data.email} 은(는) 사용 가능한 이메일입니다.`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUpSubmissionValidate = (submission: SignUpUserInputType) => {
    const validateInputResult = validateSignUpForm(submission);
    if (validateInputResult) {
      // 유효성 검사 실패해서 그 실패 원인이 담겨 있다
      alert(validateInputResult);
      return false;
    } else if (!termAgreed) {
      alert('약관에 동의해 주세요.');
      return false;
    } else if (!emailDupChecked) {
      alert('이메일 중복 체크를 해주세요.');
    } else {
      return true;
      //유효성 검사 통과!
    }
  };

  const navigate = useNavigate();

  const setupUser = async (nickname: string, email: string) => {
    const { VITE_SENDBIRD_API_KEY } = import.meta.env;

    const sendbirdChat = await SendbirdChat.init({
      appId: VITE_SENDBIRD_API_KEY,
    });

    await sendbirdChat.connect(email);

    const userUpdateParams = {
      nickname: nickname,
      userId: email,
    };
    await sendbirdChat.updateCurrentUserInfo(userUpdateParams);

    sendbirdChat.disconnect();
  };

  const onSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('회원가입 폼 제출');
    setupUser(signUpUserInput.nickname, signUpUserInput.email);
    if (signUpSubmissionValidate(signUpUserInput)) {
      AuthAPI.signUp({
        ...signUpUserInput,
        gender: signUpUserInput.gender === '남자' ? false : true,
      })
        .then((res) => {
          alert(res.data.id + ' 로 회원가입 성공!');
          navigate('/');
        })
        .catch(() => {
          alert('회원가입 실패!');
        });
    }
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
        <button
          type='button'
          onClick={userEmailDuplicationCheck}
          className='font-sans-kr px-0 w-14 text-sm absolute ml-[248px] md:ml-[328px] btn btn-primary self-end'
        >
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
        message='알파벳과 숫자, 특수문자를 포함하여 8-20자로 입력해주세요.'
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
        message='비밀번호를 한번 더 입력해주세요.'
      />

      <DateInput
        label='생년월일'
        value={signUpUserInput.birthday}
        setValue={(newBirthday) => {
          setSignUpUserInput({ ...signUpUserInput, birthday: newBirthday });
        }}
        required
      />
      <SelectionInput
        label='성별'
        value={signUpUserInput.gender}
        setValue={(newGender) => {
          setSignUpUserInput({ ...signUpUserInput, gender: newGender });
        }}
        selections={genderSelection}
      />
      <TermAgreeBox label='약관 동의' setAgreed={setTermAgreed} />
      <button
        type='submit'
        className='btn btn-primary text-base-100 rounded-lg w-60 md:w-80 mt-7'
      >
        가입하기
      </button>
    </form>
  );
}

export { SignUpForm };
