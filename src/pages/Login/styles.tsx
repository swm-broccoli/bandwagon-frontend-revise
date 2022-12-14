import naverIcon from '../../assets/naver_icon.png';
import KakaoLogin from '../../assets/kakao_login.png';

const { VITE_BASE_URL } = import.meta.env;

const NaverLoginClick = () => {
  window.location.replace(`${VITE_BASE_URL}oauth2/authorization/naver`);
};

const KakaoLoginClick = () => {
  window.location.replace(`${VITE_BASE_URL}oauth2/authorization/kakao`);
};

export function NaverLoginButton() {
  return (
    <button
      onClick={NaverLoginClick}
      className='btn bg-[#03c75a] pr-12 hover:bg-[#03c75a] rounded-xl text-base-100 w-60 md:w-80 border-none font-normal mt-4'
    >
      <img className='w-10 h-10 mr-5' src={naverIcon} alt='네이버 로그인' />
      네이버 로그인
    </button>
  );
}

export function KaKaoLoginButton() {
  return (
    <button
      onClick={KakaoLoginClick}
      className='btn bg-contain bg-[#FEE500] hover:bg-[#FEE500] rounded-xl text-base-100 w-60 md:w-80 border-none font-normal mt-4'
    >
      <img src={KakaoLogin} alt='카카오 로그인' className='h-11' />
    </button>
  );
}
