import React from 'react';

function TextInput({
  label,
  placeholder,
  value,
  setValue,
  password = false,
  required = false,
  essential = false,
  ...props
}: // 회원가입 등 입력 항목에서 필수 항목인지
{
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  password?: boolean;
  required?: boolean;
  essential?: boolean;
}) {
  return (
    <div className='flex flex-col mt-5'>
      <label className='text-accent mb-2 text-sm'>
        {label} {essential ? <span className='text-error'>*</span> : null}
      </label>
      <input
        required={required}
        type={password ? 'password' : 'text'}
        placeholder={placeholder}
        className='input input-bordered w-60 md:w-80 focus:outline-none focus:border-primary focus:required:invalid:border-error text-accent'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default TextInput;
