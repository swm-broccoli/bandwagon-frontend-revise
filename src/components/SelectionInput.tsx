import React, { useState } from 'react';

function SelectionInput({
  label,
  selectionList,
}: {
  label: string;
  selectionList: string[];
}) {
  const [curSelection, setCurSelection] = useState(selectionList[0]);

  return (
    <div className='flex flex-col mt-5 w-60 md:w-80'>
      <label className='text-accent mb-2 text-sm'>{label}</label>
      <div className='grid grid-flow-col space-x-3'>
        {selectionList.map((selection) => {
          return (
            <button
              key={selection}
              className={`btn text-base-300 font-normal ${
                curSelection === selection
                  ? 'bg-success border-primary border-2 text-primary hover:bg-[#bbf7d0] hover:border-primary'
                  : 'bg-base-100 border-base-200 text-[#ababab] hover:bg-success hover:border-primary'
              }`}
              onClick={() => setCurSelection(selection)}
            >
              {selection}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SelectionInput;
