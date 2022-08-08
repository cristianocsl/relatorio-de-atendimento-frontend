import { addDays, subDays, eachDayOfInterval, lastDayOfMonth } from 'date-fns/fp';
import { TweekDayRefObject, statusObject } from './types';

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

const weekDayRef: TweekDayRefObject = {
  1: 'Sun',
  2: 'Mon',
  3: 'Tue',
  4: 'Wed',
  5: 'Thu',
  6: 'Fri',
  7: 'Sat',
};

export const arraySourceStatus = arrayData.reduce((arrayStatus: Array<statusObject>, data: Date): Array<statusObject> => {
  const weekDay = extractWeekDay(data);
  const monthDay = +extractMonthDay(data);
  const innerObject = { status: '!!!', monthDay, weekDay };
  const array = [ ...arrayStatus, innerObject ];
  
  return array;
}, []);

export const addToSchedule = (weekDayNumbber: number): Array<statusObject> => {
  const weekDayString = weekDayRef[weekDayNumbber];
  const array = arraySourceStatus.filter((status: statusObject) => status.weekDay === weekDayString);
  return array;
}

export const removeFromSchedule = (weekDayNumbber: number, arrayStatus: Array<statusObject>): Array<statusObject> => {
  const weekDayString = weekDayRef[weekDayNumbber];
  const array = arrayStatus.filter((status: statusObject) => status.weekDay !== weekDayString);
  return array;
}

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