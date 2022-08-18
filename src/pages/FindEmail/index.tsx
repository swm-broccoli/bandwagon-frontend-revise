import { useState } from 'react';
import FindAccountAPI from '../../apis/FindAccountAPI';
import DateInput from '../../components/DateInput';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import TextInput from '../../components/TextInput';

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function FindEmailForm() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState(getTodayDate());
  const [emailList, setEmailList] = useState([]);

  const onFindEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, birthday);
    FindAccountAPI.findEmail({ name: name, birthday: birthday })
      .then((res) => {
        console.log(res.data.emails);
        setEmailList((prev) => res.data.emails);
        console.log(emailList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (emailList.length > 0) {
    return (
      <div>
        <div className='text-xl mt-10'>가입하신 아이디는 다음과 같습니다.</div>
        {emailList.map((email) => (
          <span>{email}</span>
        ))}
      </div>
    );
  } else {
    return (
      <form
        onSubmit={onFindEmailSubmit}
        className='flex flex-col items-center w-full min-w-[200px] mt-10'
      >
        <TextInput label='이름' value={name} setValue={setName} required />
        <DateInput
          label='생일'
          value={birthday}
          setValue={setBirthday}
          required
        />
        <button
          type='submit'
          className={`btn rounded-lg w-60 md:w-80 mt-7 ${
            name === '' && birthday === getTodayDate()
              ? 'disabled text-base-100'
              : 'btn-primary text-base-100'
          }`}
        >
          아이디 찾기
        </button>
      </form>
    );
  }
}

function FindEmailPage() {
  return (
    <div>
      <GlobalNavBar />
      <main className='flex flex-col items-center'>
        <h1 className='mt-10 text-3xl font-extrabold'>아이디 찾기</h1>
        <div className='text-neutral mt-3'>
          가입할 때 입력한 이름과 생일을 입력해 주세요.
        </div>
        <FindEmailForm />
      </main>
      <GlobalFooter />
    </div>
  );
}

export default FindEmailPage;
