import { addDays, subDays } from 'date-fns/fp';
import { genericKeys, extractDataType } from './types';

const weekDays: genericKeys = {
  Sun: 'DOM', Mon: 'SEG', Tue: 'TER', Wed: 'QUA', Thu: 'QUI', Fri: 'SEX', Sat: 'SÁB',
};

const months: genericKeys = {
  Jan: 'Janeiro', Feb: 'Fevereiro', Mar: 'Março', Apr: 'Abril', May: 'Maio', Jun: 'Junho',
  Jul: 'Julho', Aug: 'Agosto', Sep: 'Setembro', Oct: 'Outubro', Nov: 'Novembro', Dec: 'Dezembro',
}

const extractData = (data: any): extractDataType => {
  const sliced = data.toString().split(' ').slice(0, 3);
  const wd = sliced[0] as string;
  const m = sliced[1] as string;
  const day = sliced[2] as string;
  return { weekDay: weekDays[wd] , month: months[m], day };
};

const calendary = (): Array<extractDataType> => {
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

export default calendary;

