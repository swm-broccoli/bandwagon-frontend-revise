import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

const Weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 참고 https://bigtop.tistory.com/64?category=827794
function prevMonthDates(date: Date) {
  const prevDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const prevLastDate = prevDate.getDate();
  const prevLastDay = prevDate.getDay();

  const prevDates = [];
  for (let i = prevLastDay + 1; i > 0; i--) {
    prevDates.push(prevLastDate - i + 1);
  }
  return prevDates;
}

function nextMonthDates(date: Date) {
  const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const nextLastDay = nextDate.getDay();

  const nextDates = [];
  for (let i = 1; i <= 7 - nextLastDay; i++) {
    nextDates.push(i);
  }
  return nextDates;
}

function currentMonthDates(date: Date) {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const currentLastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dates = [];
  for (let i = 1; i <= currentLastDate; i++) {
    dates.push(i);
  }
  return dates;
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
          <div key={weekday}>{weekday}</div>
        ))}
      </div>
      <div className='grid grid-cols-7'>
        {prevMonthDates(currentDate).map((date) => (
          <div key={date}>{date}</div>
        ))}
        {currentMonthDates(currentDate).map((date) => (
          <div key={date}>{date}</div>
        ))}
        {nextMonthDates(currentDate).map((date) => (
          <div key={date}>{date}</div>
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
