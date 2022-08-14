/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { thisPatient, idPatient, thisFinances, extractDataType } from '../services/types';

type patientT = thisPatient & idPatient;

const inicialValue = {
  patients: [] as patientT[],
  finances: [] as thisFinances[],
  isLoading: true,
  isLoggedIn: false,
  dataCalendar: [] as extractDataType[],
  patientsToday: 0 as number,
  remainingPatients: 0 as number,
  greetingMessage: '' as string,
  newRequestIfItChanged: false as boolean,
  resetServices: (patient: patientT) => {},
  setIsLoggedIn: (bool: boolean) => {},
  setIsLoading: (bool: boolean) => {},
  setPatients: (patient: patientT[]) => {},
  filterPatientsByDay: (day: number) => [] as patientT[],
  setNewRequestIfItChanged: (bool: boolean) => {},
  handleChangeStatus: (event: boolean, patientId: string, monthDay: number) => {},
};

const MyContext = createContext(inicialValue);

export default MyContext;
