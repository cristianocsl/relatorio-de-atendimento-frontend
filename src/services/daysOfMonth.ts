import { addDays, subDays, eachDayOfInterval, lastDayOfMonth } from 'date-fns/fp';

const today = new Date();

const extractMonthDay = (today: Date) => today.toString().split(' ').slice(2, 3)[0]
const todayInTheMonth: string = extractMonthDay(today);
const lastDayInThisMonth:string = extractMonthDay(lastDayOfMonth(today));
const quantityDayToTheEnd = +lastDayInThisMonth - +todayInTheMonth;

const firstDay = subDays(+todayInTheMonth - 1, today);
const lastDay = addDays(+quantityDayToTheEnd, today);

const arrayData = eachDayOfInterval({
  start: firstDay,
  end: lastDay,
});

const extractWeekDay = (data: Date) => data.toString().split(' ').slice(0, 1)[0];

const getDaysQuantity = (day: string, arrayDays: string[]): number => arrayDays.filter((dayInArray) => day === dayInArray).length;

const arrayWeekDays = arrayData.map((data: Date) => extractWeekDay(data));

type daysOfMonth = {
  [key: number]: string;
};

export const resultRed = arrayData.reduce((objetoStatus: any, data: any) => {
  let obj: daysOfMonth = {};
  console.log('data ->', data);
  const monthDay = +extractMonthDay(data);
  obj = {...objetoStatus, [monthDay]: { status: '!!!' }};
  
  return obj;
}, {});

export type buttonFocusKeys = {
  [key: number]: number
}
const objectCounterWeekDays: buttonFocusKeys = {
  1: getDaysQuantity('Sun', arrayWeekDays),
  2: getDaysQuantity('Mon', arrayWeekDays),
  3: getDaysQuantity('Tue', arrayWeekDays),
  4: getDaysQuantity('Wed', arrayWeekDays),
  5: getDaysQuantity('Thu', arrayWeekDays),
  6: getDaysQuantity('Fri', arrayWeekDays),
  7: getDaysQuantity('Sat', arrayWeekDays),
}

export default objectCounterWeekDays;