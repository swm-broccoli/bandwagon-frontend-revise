function EditPageInput({
  label,
  password = false,
  name,
}: {
  label: string;
  name?: string;
  password?: boolean;
}) {
  return (
    <>
      <div className='form-control w-full flex flex-row justify-start py-2'>
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        <input
          type={password ? 'password' : 'text'}
          placeholder='Type here'
          name={name}
          className='input input-bordered w-3/5 max-w-xs focus:outline-none focus:border-primary text-accent'
        />
      </div>
      <div className='divider m-0 w-5/6' />
    </>
  );
}

export default EditPageInput;
