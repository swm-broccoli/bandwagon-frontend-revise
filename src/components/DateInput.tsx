import React from 'react';

function DateInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (newValue: string) => void;
}) {
  return (
    <div className='flex flex-col mt-5'>
      <label className='text-accent mb-2 text-sm'>{label}</label>
      <input
        type='date'
        placeholder='1997-01-29'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='input input-bordered w-60 md:w-80 focus:outline-none focus:border-primary invalid:border-error text-accent'
      />
    </div>
  );
}

export default DateInput;
