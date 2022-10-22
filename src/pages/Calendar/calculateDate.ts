// 참고 https://bigtop.tistory.com/64?category=827794
export function prevMonthDates(date: Date) {
  const prevDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const prevLastDate = prevDate.getDate();
  const prevLastDay = prevDate.getDay();

  const prevDates = [];
  for (let i = prevLastDay + 1; i > 0; i--) {
    prevDates.push(prevLastDate - i + 1);
  }
  return prevDates;
}

export function currentMonthDates(date: Date) {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const currentLastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dates = [];
  for (let i = 1; i <= currentLastDate; i++) {
    dates.push(i);
  }
  return dates;
}

export function nextMonthDates(date: Date) {
  const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const nextLastDay = nextDate.getDay();

  const nextDates = [];
  for (let i = 1; i <= 7 - nextLastDay; i++) {
    nextDates.push(i);
  }
  return nextDates;
}
