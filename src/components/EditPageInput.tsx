function EditPageInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className='form-control w-full flex flex-row justify-start py-2'>
        <label className='label w-28 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        <input
          type={type}
          placeholder={label}
          name={name}
          className='input input-bordered w-3/5 max-w-xs focus:outline-none focus:border-primary text-accent'
          disabled={name === 'email'}
          value={value}
          onChange={onChange}
        />
      </div>
      <div className='divider m-0 w-5/6' />
    </>
  );
}

export default EditPageInput;
