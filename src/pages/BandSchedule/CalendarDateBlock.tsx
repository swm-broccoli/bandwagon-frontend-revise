import { CalendarDateType, ScheduleType } from './types';

const eventTypeColor = [
  'bg-[#fe5e94]',
  'bg-[#fcc306]',
  'bg-[#59c991]',
  'bg-[#59c9c2]',
  'bg-[#62bfef]',
  'bg-[#9979f2]',
];

function DateEventBlock({ event }: { event: ScheduleType }) {
  return (
    <div className={`${eventTypeColor[event.type]} text-xs md:text-sm`}>
      {event.title}
    </div>
  );
}

function CalendarDateBlock({ eventDate }: { eventDate: CalendarDateType }) {
  return (
    <button
      onClick={() => {
        console.log(eventDate.schedules);
      }}
      className='border border-[#f1f1f1] h-20 flex flex-col'
    >
      <h3 className='place-self-start mx-1 my-0.5 text-sm md:text-base'>
        {eventDate.date.getDate()}
      </h3>

      {eventDate.schedules.map((schedule, index) => (
        <DateEventBlock key={index} event={schedule} />
      ))}
    </button>
  );
}

export default CalendarDateBlock;
