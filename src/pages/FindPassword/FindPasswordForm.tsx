import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FindAccountAPI from '../../apis/FindAccountAPI';
import TextInput from '../../components/TextInput';

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
        if (res.status === 200) {
          alert(
            `입력하신 이메일 ${email}로 임시 비밀번호를 발송했습니다. 발송된 메일을 확인하고 로그인해 주세요.`,
          );
          navigate('/');
        }
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

export default FindPasswordForm;
