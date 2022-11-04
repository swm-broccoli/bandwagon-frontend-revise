import { CalendarDateType } from './types';

function CalendarDateBlock({ eventDate }: { eventDate: CalendarDateType }) {
  return (
    <button
      onClick={() => {
        console.log(eventDate.schedules);
      }}
      className='border border-[#f1f1f1] h-16'
    >
      {eventDate.date.getDate()}
      {eventDate.schedules.map((schedule, index) => (
        <div key={index}>{schedule.title}</div>
      ))}
    </button>
  );
}

export default CalendarDateBlock;
