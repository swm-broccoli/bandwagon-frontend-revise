export interface ScheduleType {
  type: string;
  title: string;
  date: Date;
  location: string;
  description: string;
}

export interface CalendarDateType {
  date: Date;
  schedules: ScheduleType[];
}

export type WeekdayType = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';
