/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { thisPatient, idPatient, thisFinances, extractDataType } from '../services/types';

type patientArray = thisPatient & idPatient;

const inicialValue = {
  patients: [] as patientArray[],
  finances: [] as thisFinances[],
  isLoading: true,
  isLoggedIn: false,
  dataCalendar: [] as extractDataType[],
  patientsToday: 0 as number,
  patientsPending: 0 as number,
  remainingPatients: 0 as number,
  greetingMessage: '' as string,
  newRequestIfItChanged: false as boolean,
  setIsLoggedIn: (bool: boolean) => {},
  setIsLoading: (bool: boolean) => {},
  filterPatientsByDay: (day: number) => [] as patientArray[],
  setNewRequestIfItChanged: (newRequest: boolean) => {},
};

const MyContext = createContext(inicialValue);

export default MyContext;
