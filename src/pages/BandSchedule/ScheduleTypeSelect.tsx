import { useRef, useEffect } from 'react';

const eventTypeColor = [
  'bg-[#fe5e94]',
  'bg-[#fcc306]',
  'bg-[#59c991]',
  'bg-[#59c9c2]',
  'bg-[#62bfef]',
  'bg-[#9979f2]',
];

function ScheduleTypeOption({ type }: { type: number }) {
  return (
    <li>
      <button
        type='button'
        className='inline-flex py-2 px-4 w-full text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <div className={`${eventTypeColor[type]} w-3 h-3 rounded-full`} />
        일정 타입 {type}
      </button>
    </li>
  );
}

function ScheduleTypeSelect({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (newSelected: number) => void;
}) {
  const selectDropdown = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label>일정 타입</label>
      <button
        className='btn bg-white border-base-300'
        type='button'
        onClick={() => {
          selectDropdown.current?.focus();
          console.log(selectDropdown.current);
        }}
      >
        일정
      </button>
      <div
        tabIndex={0}
        className='h-0 focus:h-auto overflow-hidden'
        ref={selectDropdown}
      >
        <ul className='z-10 mt-1 rounded-md'>
          <ScheduleTypeOption type={0} />
          <ScheduleTypeOption type={1} />
        </ul>
      </div>
    </div>
  );
}

export default ScheduleTypeSelect;
