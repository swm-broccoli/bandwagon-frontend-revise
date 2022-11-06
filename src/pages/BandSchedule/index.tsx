import { useEffect, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import BandPageTemplate from '../../components/BandPageTemplate';
import {
  prevMonthDates,
  currentMonthDates,
  nextMonthDates,
} from './calculateDate';
import { ScheduleType, CalendarDateType, WeekdayType } from './types';
import CalendarDateBlock from './CalendarDateBlock';
import WeekdayBlock from './WeekdayBlock';
import useSchedule from './useSchedule';
import ScheduleMaker from './ScheduleMakerModal';

const Weekdays: WeekdayType[] = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
];

const BandSchedule: ScheduleType[] = [
  {
    type: 'concert',
    title: '일정 타입',
    date: new Date('2022-10-03'),
    location: 'Seoul',
    description: 'Concert in Seoul',
  },
  {
    type: 'concert',
    title: '밴드 합주',
    date: new Date('2022-10-20'),
    location: 'Seoul',
    description: 'Concert in Seoul',
  },
];

function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [currentMonthEvents, setCurrentMonthEvents] = useState<
    CalendarDateType[]
  >([]);

  const { schedules, addSchedule, removeSchedule } = useSchedule(BandSchedule);

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

  useEffect(() => {
    const prevMonth = prevMonthDates(currentDate);
    const currentMonth = currentMonthDates(currentDate);
    const nextMonth = nextMonthDates(currentDate);

    const calendarEventDates: CalendarDateType[] = [];

    [...prevMonth, ...currentMonth, ...nextMonth].forEach((date) => {
      const dateSchedules = schedules.filter((schedule) => {
        return (
          schedule.date.getFullYear() === date.getFullYear() &&
          schedule.date.getMonth() === date.getMonth() &&
          schedule.date.getDate() === date.getDate()
        );
      });

      calendarEventDates.push({
        date,
        schedules: dateSchedules,
      });
    });

    setCurrentMonthEvents(calendarEventDates);
  }, [currentDate, schedules]);

  return (
    <section>
      <div className='flex flex-row justify-between mb-3'>
        <div className='flex flex-row items-center font-bold text-lg md:text-2xl'>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          <button
            onClick={handlePrevMonth}
            className='btn btn-xs btn-circle bg-base-300 border-none ml-1'
          >
            <MdArrowBack />
          </button>
          <button
            onClick={handleNextMonth}
            className='btn btn-xs btn-circle bg-base-300 border-none ml-1'
          >
            <MdArrowForward />
          </button>
        </div>
        <ScheduleMaker addSchedule={addSchedule} />
      </div>

      <div className='grid grid-cols-7'>
        {Weekdays.map((weekday) => (
          <WeekdayBlock key={weekday} weekday={weekday} />
        ))}
      </div>
      <div className='grid grid-cols-7'>
        {currentMonthEvents.map((eventDate) => (
          <CalendarDateBlock
            key={eventDate.date.toString()}
            eventDate={eventDate}
          />
        ))}
      </div>
    </section>
  );
}

function SchedulePage() {
  return (
    <BandPageTemplate>
      <Calendar />
    </BandPageTemplate>
  );
}

export default SchedulePage;
