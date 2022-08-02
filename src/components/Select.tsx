import React from 'react';

function Select (props:
  {label: string,
  options: string[]}) {
  return (
    <select className='select select-bordered w-fit md:w-60 h-[3.125rem]'>
    <option disabled selected>{props.label}</option>
    {props.options.map((option, index) =>
    <option>{option}</option>)}
    </select>
  );
};

export default Select;