export type thisProps = {
  title: string,
  textButtom: string
  hidden: boolean,
}

export type thisLogin = {
  email: string,
  password: string,
}

export type thisName = {
  name: string,
}

export type thisResponseLogin = {
  name: string,
  token: string,
}

export type thisRespRegister = {
  name: string,
  email: string,
  userId: string,
  message: string,
}

export type statusObject = {
  status: string;
  monthDay: number;
  weekDay: string;
}

export type thisPatient = {
  patient: string,
  neighborhood: string,
  status: Array<statusObject>,
  priority: string,
  days: number[],
  serviceGoal: {
    weekly: number,
    monthly: number,
  },
  servicePerformed: {
    weekly: number,
    monthly: number,
  },
  servicePending: {
    weekly: number,
    monthly: number,
  },
  healthInsurance: string,
  unitPrice: number,
  totalPrice: number,
  evolution: string,
};

export type patientArray = (thisPatient & idPatient)[];

export type idPatient = { _id: string };

export type thisFinances = {
  patientId: string,
  userId: string,
  prevTotalPrice: number,
  doneTotalPrice: number,
  healthInsurance: string,
  createdAt: string,
}

type subObject = {
  portugueseWeekDay: string,
  reference: number,
}

export type genericKeys = {
  [key: string]: subObject,
}

export type genericKeysMonths = {
  [key: string]: string,
}

export type extractDataType = {
  reference: number,
  weekDay: string,
  month: string,
  day: string,
}

export type buttonFocusKeys = {
  [key: number]: { focus: boolean }
}

export type weekMonthT = { monthly: number, weekly: number };

export type bodyDataPatient = {
  patient: string,
  neighborhood: string,
  healthInsurance: string,
  days: number[],
  serviceGoal: weekMonthT,
  servicePerformed: weekMonthT,
  unitPrice: number,
  evolution: string,
  status: Array<statusObject>,
}

export type TweekDayRefObject = {
  [key: number]: string;
}
