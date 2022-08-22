import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { SelectionType } from '../types/types';

function Select (props:
  {label: string,
  options: SelectionType[],
  curOption: SelectionType,
  setOption: Dispatch<SetStateAction<SelectionType>>}) {
  function handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(JSON.parse(e.target.value));
    props.setOption(JSON.parse(e.target.value));
  }

  return (
    <select
      value={JSON.stringify(props.curOption)}
      className='select select-bordered w-fit md:w-60 h-[3.125rem]'
      onChange={handleChange}>
      <option className='hidden' value=''>{props.label}</option>
      {props.options.map((option, index) =>
      <option key={index} value={JSON.stringify(option)}>{option.name}</option>)}
    </select>
  );
};

export default Select;