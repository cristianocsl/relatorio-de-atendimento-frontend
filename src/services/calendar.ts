import { addDays, subDays } from 'date-fns/fp';
import { genericKeys, extractDataType, genericKeysMonths } from './types';

const weekDays: genericKeys = {
  Sun: { portugueseWeekDay: 'DOM', reference: 1 },
  Mon: { portugueseWeekDay: 'SEG', reference: 2 },
  Tue: { portugueseWeekDay: 'TER', reference: 3 },
  Wed: { portugueseWeekDay: 'QUA', reference: 4 },
  Thu: { portugueseWeekDay: 'QUI', reference: 5 },
  Fri: { portugueseWeekDay: 'SEX', reference: 6 },
  Sat: { portugueseWeekDay: 'SÁB', reference: 7 },
};

const months: genericKeysMonths = {
  Jan: 'Janeiro', Feb: 'Fevereiro', Mar: 'Março', Apr: 'Abril', May: 'Maio', Jun: 'Junho',
  Jul: 'Julho', Aug: 'Agosto', Sep: 'Setembro', Oct: 'Outubro', Nov: 'Novembro', Dec: 'Dezembro',
}


const extractData = (data: any): extractDataType => {
  const sliced = data.toString().split(' ').slice(0, 3);
  const englishWeekDay = sliced[0] as string;
  const englishMonth = sliced[1] as string;
  const day = sliced[2] as string;
  return {
    reference: weekDays[englishWeekDay].reference,
    weekDay: weekDays[englishWeekDay].portugueseWeekDay,
    month: months[englishMonth],
    day,
  };
};

const calendar = (): Array<extractDataType> => {
  const today = new Date();
  const threeDaysBefore = subDays(3, today)
  const twoDaysBefore = subDays(2, today)
  const oneDayBefore = subDays(1, today)
  const oneDayAhead = addDays(1, today);
  const twoDaysAhead = addDays(2, today);
  const threeDaysAhead = addDays(3, today);

  const dayWeekDaysMonthArray = [
    threeDaysBefore,
    twoDaysBefore,
    oneDayBefore,
    today,
    oneDayAhead,
    twoDaysAhead,
    threeDaysAhead
  ].map(extractData);

  return dayWeekDaysMonthArray;
}

export default calendar;

