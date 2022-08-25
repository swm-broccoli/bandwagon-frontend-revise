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
        <label className='label w-20 md:w-32 min-w-[60px] max-w-[120px] py-0'>
          <span className='label-text text-accent w-full'>{label}</span>
        </label>
        {editing ? (
          <input
            value={value}
            className='input input-bordered w-full'
            disabled
          />
        ) : (
          <div className='flex items-center h-10 w-full'>{value}</div>
        )}
      </div>
      <div className='divider m-0' />
    </>
  );
}

export default ProfileReadOnlyTextField;
