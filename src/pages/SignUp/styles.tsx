import React, { useEffect, useState } from 'react';
import SubmitButton from '../../components/SubmitButton';
import TextInput from '../../components/TextInput';
import CheckBox from '../../components/CheckBox';
import DateInput from '../../components/DateInput';
import SelectionInput from '../../components/SelectionInput';
import AuthAPI from '../../apis/AuthAPI';
import { useNavigate } from 'react-router-dom';

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
  });

  const [termAgreed, setTermAgreed] = useState(false);
  const [emailDupChecked, setEmailDupChecked] = useState(false);

  const userEmailDuplicationCheck = () => {
    AuthAPI.checkEmail({ email: signUpUserInput.email })
      .then((res) => {
        console.log(res);
        setEmailDupChecked(true);
        alert(`${res.data.email} 은(는) 사용 가능한 이메일입니다.`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUpSubmissionValidate = (submission: SignUpUserInputType) => {
    if (submission.password !== submission.passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
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

  const onSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('회원가입 폼 제출');
    console.log('입력값:', signUpUserInput);
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
          onClick={userEmailDuplicationCheck}
          className='absolute ml-[248px] md:ml-[328px] btn btn-primary self-end'
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
      <TermAgreeBox label='약관 동의' setAgreed={setTermAgreed} />
      <SubmitButton label='가입하기' />
    </form>
  );
}

export { SignUpForm };
