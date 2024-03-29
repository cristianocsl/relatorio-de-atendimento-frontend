/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import PatientsList from '../components/PatientsListCards';
import PatientsTable from '../components/PatientsTable';
import { thisPatient, idPatient, thisFinances, extractDataType } from '../services/types';

type patientT = thisPatient & idPatient;
type userIdT = { userId: string };
type updateT = patientT & userIdT;

const inicialValue = {
  patients: [] as patientT[],
  finances: [] as thisFinances[],
  isLoading: true,
  isLoggedIn: false,
  dataCalendar: [] as extractDataType[],
  patientsToday: 0 as number,
  remainingPatients: 0 as number,
  greetingMessage: '' as string | undefined,
  newRequestIfItChanged: false as boolean,
  resetWeeklyServices: (patient: patientT) => {},
  resetMonthlyServices: (patient: patientT) => {},
  setIsLoggedIn: (bool: boolean) => {},
  setIsLoading: (bool: boolean) => {},
  setPatients: (patient: patientT[]) => {},
  filterPatientsByDay: (day: number) => [] as patientT[],
  setNewRequestIfItChanged: (bool: boolean) => {},
  handleChangeStatus: (event: boolean, patientId: string, monthDay: number) => {},
  getPatientInfoById: (patientId: string | undefined) => {},
};

const MyContext = createContext(inicialValue);

export default MyContext;
