import { SignUpUserInputType } from '../../types/types';

function validateUserName(userName: string) {
  const name_regexp = /^[가-힣a-zA-Z0-9]{2,15}$/;
  return name_regexp.test(userName);
}

function validateEmail(email: string) {
  const email_regexp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return email_regexp.test(email);
}

function validatePassword(password: string) {
  // 8자에서 20자, 하나 이상의 문자, 하나 이상의 숫자, 하나 이상의 특수 문자가 들어갔는지 검증
  const password_regexp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  return password_regexp.test(password);
}

export function validateSignUpForm(signUpForm: SignUpUserInputType): string {
  // 테스트를 위해 일단 이름, 이메일, 비밀번호 테스트는 미사용
  /*if (!validateUserName(signUpForm.name)) {
    return '한글 이름을 입력해주세요.';
  }
  if (!validateEmail(signUpForm.email)) {
    return '이메일 형식에 맞게 입력해주세요.';
  }
  if (!validatePassword(signUpForm.password)) {
    return '비밀번호를 형식에 맞게 입력해주세요.';
  }*/
  if (signUpForm.password !== signUpForm.passwordCheck) {
    return '비밀번호 확인이 일치하지 않습니다.';
  }
  return '';
}
