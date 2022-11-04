import { WeekdayType } from './types';

function WeekdayBlock({ weekday }: { weekday: WeekdayType }) {
  return (
    <div
      key={weekday}
      className='border border-[#f1f1f1] bg-[#f9f9f9] text-neutral h-8 flex justify-center items-center'
    >
      {weekday}
    </div>
  );
}

export default WeekdayBlock;
