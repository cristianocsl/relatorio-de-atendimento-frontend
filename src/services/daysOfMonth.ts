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

type statusObject = {
  status: string;
  monthDay: number;
  weekDay: string;
}

export const resultRed = arrayData.reduce((arrayStatus: Array<statusObject>, data: Date): Array<statusObject> => {
  const weekDay = extractWeekDay(data);
  const monthDay = +extractMonthDay(data);
  const innerObject = { status: '!!!', monthDay, weekDay };
  const array = [ ...arrayStatus, innerObject ];
  
  return array;
}, []);

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