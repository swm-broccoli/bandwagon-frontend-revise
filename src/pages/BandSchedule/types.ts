export interface ScheduleType {
  type: number;
  title: string;
  date: Date;
  location: string;
  description: string;
  [key: string]: any;
}

export interface CalendarDateType {
  date: Date;
  schedules: ScheduleType[];
}

export type WeekdayType = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';
