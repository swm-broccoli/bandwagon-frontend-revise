import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

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
