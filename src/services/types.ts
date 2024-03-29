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
  schedule: Array<statusObject>,
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
  doneTotalPrice?: number,
  prevTotalPrice?: number,
  evolution: string,
  createdAt?: string,
  updatedAt?: string,
  activeService?: string,
};

export type updatePatientT = {
  patient: string,
  neighborhood: string,
  schedule: Array<statusObject>,
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
  unitPrice: string,
  totalPrice: number,
  doneTotalPrice?: number,
  prevTotalPrice?: number,
  evolution: string,
  createdAt?: string,
  updatedAt?: string,
  activeService?: string,
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

export type Tfinances = {
  prevTotalPrice: number,
  doneTotalPrice: number,
  healthInsurance: string,
  userId: string,
  createdAt: string,
  patientId: string,
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
  monthDay: number,
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
  unitPrice: string,
  evolution: string,
  schedule: Array<statusObject>,
  activeService: string,
}

export type TweekDayRefObject = {
  [key: number]: string;
}
