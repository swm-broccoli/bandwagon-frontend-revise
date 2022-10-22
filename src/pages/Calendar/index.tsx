import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import {
  prevMonthDates,
  currentMonthDates,
  nextMonthDates,
} from './calculateDate';

const Weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function DateBlock({ dateText }: { dateText: string }) {
  return <div className='border border-base-300 h-12'>{dateText}</div>;
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
          <DateBlock key={weekday} dateText={weekday} />
        ))}
      </div>
      <div className='grid grid-cols-7'>
        {prevMonthDates(currentDate).map((date) => (
          <DateBlock key={date} dateText={date.toString()} />
        ))}
        {currentMonthDates(currentDate).map((date) => (
          <DateBlock key={date} dateText={date.toString()} />
        ))}
        {nextMonthDates(currentDate).map((date) => (
          <DateBlock key={date} dateText={date.toString()} />
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
