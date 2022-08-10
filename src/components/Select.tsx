import React, { Dispatch, SetStateAction } from 'react';
import { SelectionType } from '../types/types';

function Select (props:
  {label: string,
  options: SelectionType[],
  setOption: Dispatch<SetStateAction<string>>}) {
  function handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(JSON.parse(e.target.value).name);
    props.setOption(JSON.parse(e.target.value).name);
  }

  return (
    <select className='select select-bordered w-fit md:w-60 h-[3.125rem]' onChange={handleChange}>
    <option disabled selected>{props.label}</option>
    {props.options.map((option, index) =>
    <option key={index} value={JSON.stringify(option)}>{option.name}</option>)}
    </select>
  );
};

export default Select;