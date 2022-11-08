import React, { useRef, useEffect } from 'react';

const eventTypeColor = [
  'bg-[#fe5e94]',
  'bg-[#fcc306]',
  'bg-[#59c991]',
  'bg-[#59c9c2]',
  'bg-[#62bfef]',
  'bg-[#9979f2]',
];

const eventName = ['일반 활동', '오디션', '합주', '공연', '회식', '기타'];

function ScheduleTypeSelector({
  label,
  selected,
  setSelected,
}: {
  label: string;
  selected: number;
  setSelected: (newSelected: number) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(Number(e.target.value));
  };
  return (
    <div className=''>
      <label>
        {label}
        <select
          className='select select-bordered'
          value={selected}
          onChange={handleChange}
        >
          {eventTypeColor.map((color, index) => (
            <option key={color} value={index}>
              {eventName[index]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function ScheduleTypeOption({ type }: { type: number }) {
  return (
    <li>
      <button
        type='button'
        className='inline-flex w-full text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <div className={`${eventTypeColor[type]} w-3 h-3 rounded-full`} />
        {eventName[type]}
      </button>
    </li>
  );
}

function TempScheduleTypeSelect({
  label,
  selected,
  setSelected,
}: {
  label: string;
  selected: number;
  setSelected: (newSelected: number) => void;
}) {
  const selectRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectButtonClick = () => {
    selectRef.current?.classList.toggle('hidden');
  };

  return (
    <div className=''>
      <label>{label}</label>
      <button
        onClick={selectButtonClick}
        className='btn bg-white border-base-300 hover:bg-base-200 hover:border-gray-400'
        type='button'
      >
        일정
      </button>
      <div tabIndex={-1} ref={selectRef} className='hidden absolute bg-white'>
        <ul className='z-10 mt-1 rounded-md overflow-hidden'>
          <ScheduleTypeOption type={0} />
          <ScheduleTypeOption type={1} />
        </ul>
      </div>
    </div>
  );
}

export default ScheduleTypeSelector;
