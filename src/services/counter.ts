import { patientArray } from './types';

function patientsToday(patients: patientArray): number {
  const today = new Date().getDay();
  const count = patients.filter((patient) => (patient.days.includes(today + 1) && patient.status === 'OK')).length;
  return count;
}

function patientsPending(patients: patientArray): number {
  const count = patients.filter((patient) => (patient.status === '!!!')).length;
  return count;
}

const counter = {
  patientsToday,
  patientsPending,
}

export default counter;