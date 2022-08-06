import React from 'react';

function TagElement(props: { tag: string }) {
  return (
    <div
      key={props.tag}
      className='flex mr-2 w-fit h-[1.625rem] px-3 items-center border border-solid border-secondary bg-white rounded'
    >
      <p className='text-xs text-secondary'>{props.tag}</p>
    </div>
  );
}

export default TagElement;
