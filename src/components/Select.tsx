import React, { Dispatch, SetStateAction } from 'react';

function Select (props:
  {label: string,
  options: string[],
  setOption: Dispatch<SetStateAction<string>>}) {
  function handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    props.setOption(e.target.value);
  }

  return (
    <select className='select select-bordered w-fit md:w-60 h-[3.125rem]' onChange={handleChange}>
    <option disabled selected>{props.label}</option>
    {props.options.map((option, index) =>
    <option key={index} value={option}>{option}</option>)}
    </select>
  );
};

export default Select;