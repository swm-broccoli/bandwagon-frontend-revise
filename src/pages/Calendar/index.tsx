import { useEffect, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import {
  prevMonthDates,
  currentMonthDates,
  nextMonthDates,
} from './calculateDate';

interface Schedule {
  type: string;
  title: string;
  date: Date;
  location: string;
  description: string;
}

const BandSchedule: Schedule[] = [
  {
    type: 'concert',
    title: '밴드 콘서트',
    date: new Date(2022, 10, 3),
    location: 'Seoul',
    description: 'Concert in Seoul',
  },
];

const Weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function DateBlock({ date }: { date: Date }) {
  return (
    <button
      onClick={() => {
        console.log(date);
      }}
      className='border border-base-300 h-12'
    >
      {date.getDate()}
    </button>
  );
}

function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  return (
    <section>
      <div className='flex flex-row'>
        {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 달력
        <button onClick={handlePrevMonth} className='btn btn-xs btn-primary'>
          <MdArrowBack />
        </button>
        <button onClick={handleNextMonth} className='btn btn-xs btn-primary'>
          <MdArrowForward />
        </button>
      </div>
      <div className='grid grid-cols-7'>
        {Weekdays.map((weekday) => (
          <div key={weekday} className='border border-base-300 h-12'>
            {weekday}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7'>
        {prevMonthDates(currentDate).map((date) => (
          <DateBlock key={date.getDate()} date={date} />
        ))}
        {currentMonthDates(currentDate).map((date) => (
          <DateBlock key={date.getDate()} date={date} />
        ))}
        {nextMonthDates(currentDate).map((date) => (
          <DateBlock key={date.getDate()} date={date} />
        ))}
      </div>
    </section>
  );
}

function CalendarPage() {
  return (
    <div>
      <h1 className='text-xl font-bold'>우리 밴드 일정</h1>
      <Calendar />
    </div>
  );
}

export default CalendarPage;
