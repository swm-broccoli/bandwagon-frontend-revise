import React from 'react';

function TextInput({
  label,
  placeholder,
  password = false,
  required = false,
}: {
  label: string;
  placeholder: string;
  password?: boolean;
  required?: boolean;
}) {
  return (
    <div className='flex flex-col my-2'>
      <label className='text-accent mb-2'>{label}</label>
      <input
        required={required}
        type={password ? 'password' : 'text'}
        placeholder={placeholder}
        className='input input-bordered w-60 md:w-80 focus:outline-none focus:border-primary invalid:border-error text-accent'
      />
    </div>
  );
}

export default TextInput;
