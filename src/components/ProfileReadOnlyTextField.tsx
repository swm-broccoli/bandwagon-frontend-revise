function ProfileReadOnlyTextField({
  label,
  value,
  editing = false,
}: {
  label: string;
  value: string;
  editing?: boolean;
}) {
  return (
    <>
      <div className='form-control h-10 w-full flex flex-row justify-start items-center my-2'>
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        {editing ? (
          <input value={value} className='input input-bordered' disabled />
        ) : (
          <div className='flex items-center h-10 w-3/5'>{value}</div>
        )}
      </div>
      <div className='divider m-0' />
    </>
  );
}

export default ProfileReadOnlyTextField;
