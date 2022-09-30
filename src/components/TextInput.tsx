function InputMsg({ message }: { message: string }) {
  return (
    <small className='w-60 md:w-80 text-neutral mt-1 break-words'>
      {message}
    </small>
  );
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
  message?: string | null;
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
        className={`input input-bordered w-60 md:w-80 focus:outline-none focus:border-primary focus:required:invalid:border-error text-accent`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {message === null ? message : <InputMsg message={message} />}
    </div>
  );
}

export default TextInput;
