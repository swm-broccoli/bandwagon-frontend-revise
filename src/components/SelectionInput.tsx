import React, { useEffect, useState } from 'react';

function SelectionInput({
  label,
  value,
  setValue,
  selections,
}: {
  label: string;
  value: string;
  setValue: (newValue: string) => void;
  selections: string[];
}) {
  return (
    <div className='flex flex-col mt-5 w-60 md:w-80'>
      <label className='text-accent mb-2 text-sm'>{label}</label>
      <select
        defaultValue={selections[0]}
        onChange={(e) => {
          setValue(e.target.value);
          console.log(value);
        }}
        className='select select-bordered w-full '
      >
        {selections.map((selection) => (
          <option key={selection} value={selection}>
            {selection}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectionInput;
