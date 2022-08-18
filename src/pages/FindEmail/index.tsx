import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import FindEmailForm from './FindEmailForm';

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
