import React from 'react';

function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type='submit'
      className='btn btn-primary text-base-100 rounded-lg w-60 md:w-80 mt-7'
    >
      {label}
    </button>
  );
}

export default SubmitButton;
