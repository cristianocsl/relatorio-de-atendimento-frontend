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

export type thisPatient = {
  patient: string,
  neighborhood: string,
  status: string,
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
