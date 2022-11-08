import { ScheduleType } from './types';
import { useState } from 'react';

function useSchedule(initialSchedules: ScheduleType[]) {
  const [schedules, setSchedules] = useState(initialSchedules);

  const addSchedule = (schedule: ScheduleType) => {
    setSchedules([...schedules, schedule]);
  };

  const removeSchedule = (schedule: ScheduleType) => {
    setSchedules(schedules.filter((item) => item !== schedule));
  };

  return { schedules, addSchedule, removeSchedule };
}

export default useSchedule;
