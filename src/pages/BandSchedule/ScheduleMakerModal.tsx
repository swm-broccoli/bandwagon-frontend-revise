import { ScheduleType } from './types';
import { useState } from 'react';

function ScheduleMaker({
  addSchedule,
}: {
  addSchedule: (schedule: ScheduleType) => void;
}) {
  const [currentSchedule, setCurrentSchedule] = useState<ScheduleType>({
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
