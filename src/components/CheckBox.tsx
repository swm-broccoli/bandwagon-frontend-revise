import React from 'react';

function CheckBox({
  text,
  checked = false,
  onClick,
}: {
  text: string;
  checked?: boolean;
  onClick: () => void;
}) {
  return (
    <label className='label cursor-pointer flex flex-row justify-start pt-2'>
      <input
        type='checkbox'
        className='checkbox checkbox-primary rounded-full bg-base-100 checked:color-base-100'
        checked={checked}
        onChange={onClick}
      />
      <span className='label-text text-neutral ml-3'>{text}</span>
    </label>
  );
}

export default CheckBox;
