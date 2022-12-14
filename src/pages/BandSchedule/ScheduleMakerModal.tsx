import { ScheduleType } from './types';
import { useState, useRef } from 'react';
import ScheduleTypeSelector from './ScheduleTypeSelect';

const defaultSchedule: ScheduleType = {
  type: 1,
  title: '',
  date: new Date(),
  location: '',
  description: '',
};

function ScheduleMaker({
  addSchedule,
}: {
  addSchedule: (schedule: ScheduleType) => void;
}) {
  const [currentSchedule, setCurrentSchedule] =
    useState<ScheduleType>(defaultSchedule);

  const newScheduleFormOpen = useRef<HTMLInputElement>(null);

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
    if (newScheduleFormOpen.current) {
      console.log(
        (newScheduleFormOpen.current.checked =
          !newScheduleFormOpen.current.checked),
      );
    }
    setCurrentSchedule(defaultSchedule);
  };

  return (
    <div>
      <label
        htmlFor='new-schedule-modal'
        className='btn btn-sm btn-primary w-20 h-10'
      >
        + 추가
      </label>

      <input
        type='checkbox'
        id='new-schedule-modal'
        className='modal-toggle'
        ref={newScheduleFormOpen}
      />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box relative'>
          <h3 className='font-bold text-lg'>일정 추가</h3>
          <label
            htmlFor='new-schedule-modal'
            className='btn btn-sm btn-circle btn-primary absolute right-4 top-4'
          >
            ✕
          </label>
          <form className='flex flex-col' onSubmit={onSubmit}>
            <ScheduleTypeSelector
              label='일정 타입'
              selected={currentSchedule.type}
              setSelected={(type) =>
                setCurrentSchedule({ ...currentSchedule, type })
              }
            />
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
            <button type='submit' className='btn btn-primary'>
              추가
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ScheduleMaker;
