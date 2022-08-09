import React from 'react';

function InputMsg({ message }: { message: { type: string; msg: string } }) {
  switch (message.type) {
    case 'success':
      return <small className='text-primary mt-1'>✓ {message.msg}</small>;
    case 'fail':
      return <small className='text-error'>x {message.msg}</small>;
    default:
      return <small>{message.msg}</small>;
  }
}

function TextInput({
  label,
  value,
  setValue,
  password = false,
  required = false,
  // 회원가입 등 입력 항목에서 필수 항목인지
  message = null,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  password?: boolean;
  required?: boolean;
  message?: { type: string; msg: string } | null;
}) {
  return (
    <div className='flex flex-col mt-5'>
      <label className='text-accent mb-2 text-sm'>
        {label} {required ? <span className='text-error'>*</span> : null}
      </label>
      <input
        required={required}
        type={password ? 'password' : 'text'}
        placeholder={label}
        className={`input input-bordered w-60 md:w-80 focus:outline-none focus:border-primary focus:required:invalid:border-error text-accent ${
          message?.type === 'fail' ? 'border-error' : ''
        }`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {message === null ? message : <InputMsg message={message} />}
    </div>
  );
}

export default TextInput;
