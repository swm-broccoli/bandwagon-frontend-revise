import { useState } from 'react';
import FindAccountAPI from '../../apis/FindAccountAPI';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import TextInput from '../../components/TextInput';
import { useNavigate } from 'react-router-dom';

function FindPasswordForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const onFindPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email);

    FindAccountAPI.findPassword({ name: name, email: email })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(err.response.data.errorMessage);
        navigate('/');
      });
  };

  return (
    <form
      onSubmit={onFindPasswordSubmit}
      className='flex flex-col items-center w-full min-w-[200px] mt-10'
    >
      <TextInput label='이름' value={name} setValue={setName} required />
      <TextInput label='이메일' value={email} setValue={setEmail} required />
      <button
        type='submit'
        className={`btn rounded-lg w-60 md:w-80 mt-7 ${
          name === '' && email === ''
            ? 'disabled text-base-100'
            : 'btn-primary text-base-100'
        }`}
      >
        비밀번호 찾기
      </button>
    </form>
  );
}

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
