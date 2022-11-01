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
