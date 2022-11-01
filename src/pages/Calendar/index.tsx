import { useEffect, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import BandPageTemplate from '../../components/BandPageTemplate';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
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

interface CalendarEventDate {
  date: Date;
  schedules: Schedule[];
}

const BandSchedule: Schedule[] = [
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

const Weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function ScheduleMaker({
  addSchedule,
}: {
  addSchedule: (schedule: Schedule) => void;
}) {
  const [currentSchedule, setCurrentSchedule] = useState<Schedule>({
    type: '',
    title: '',
    date: new Date(),
    location: '',
    description: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'date') {
      setCurrentSchedule({
        ...currentSchedule,
        [name]: new Date(value),
      });
    } else {
      setCurrentSchedule({
        ...currentSchedule,
        [name]: value,
      });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(currentSchedule);
    addSchedule(currentSchedule);
  };

  return (
    <div>
      <h1>새로운 일정 추가</h1>
      <form className='flex flex-col' onSubmit={onSubmit}>
        <label>
          일정 타입
          <input
            className='input input-bordered'
            name='type'
            value={currentSchedule.type}
            onChange={onChange}
            placeholder='일정 타입'
          />
        </label>
        <label>
          일정 제목
          <input
            className='input input-bordered'
            name='title'
            value={currentSchedule.title}
            onChange={onChange}
            placeholder='일정 제목'
          />
        </label>
        <label>
          일정 날짜
          <input
            type='date'
            className='input input-bordered'
            name='date'
            value={currentSchedule.date.toISOString().split('T')[0]}
            onChange={onChange}
          />
        </label>
        <label>
          일정 장소
          <input
            className='input input-bordered'
            name='location'
            value={currentSchedule.location}
            onChange={onChange}
            placeholder='일정 장소'
          />
        </label>
        <label>
          일정 설명
          <input
            className='input input-bordered'
            name='description'
            value={currentSchedule.description}
            onChange={onChange}
            placeholder='일정 설명'
          />
        </label>
        <button className='btn btn-primary w-60'>일정 추가</button>
      </form>
    </div>
  );
}

function EventDateBlock({ eventDate }: { eventDate: CalendarEventDate }) {
  return (
    <button
      onClick={() => {
        console.log(eventDate.schedules);
      }}
      className='border border-base-300 h-16'
    >
      {eventDate.date.getDate()}
      {eventDate.schedules.map((schedule, index) => (
        <div key={index}>{schedule.title}</div>
      ))}
    </button>
  );
}

function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [currentMonthEvents, setCurrentMonthEvents] = useState<
    CalendarEventDate[]
  >([]);

  const [bandSchedules, setBandSchedules] = useState<Schedule[]>(BandSchedule);

  const addBandSchedule = (schedule: Schedule) => {
    setBandSchedules([...bandSchedules, schedule]);
  };

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

    const calendarEventDates: CalendarEventDate[] = [];

    [...prevMonth, ...currentMonth, ...nextMonth].forEach((date) => {
      const schedules = bandSchedules.filter((schedule) => {
        return (
          schedule.date.getFullYear() === date.getFullYear() &&
          schedule.date.getMonth() === date.getMonth() &&
          schedule.date.getDate() === date.getDate()
        );
      });

      calendarEventDates.push({
        date,
        schedules,
      });
    });

    setCurrentMonthEvents(calendarEventDates);
  }, [currentDate, bandSchedules]);

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
        {currentMonthEvents.map((eventDate) => (
          <EventDateBlock
            key={eventDate.date.toString()}
            eventDate={eventDate}
          />
        ))}
      </div>
      <ScheduleMaker addSchedule={addBandSchedule} />
    </section>
  );
}

function CalendarPage() {
  return (
    <BandPageTemplate>
      <Calendar />
    </BandPageTemplate>
  );
}

export default CalendarPage;
