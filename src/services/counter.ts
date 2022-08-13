import { patientArray, statusObject } from './types';

function patientsToday(patients: patientArray): number {
  const weekDay = new Date().getDay();
  const count = patients.filter((patient) => patient.days.includes(weekDay + 1)).length;
  return count;
}

function remainingPatients(patients: patientArray): number {
  const weekDay = new Date().getDay();
  const monthDayToday = new Date().getDate();
  const patientsToday: patientArray = patients.filter((patient) => patient.days.includes(weekDay + 1));
  const count: statusObject[] = [];
  
  patientsToday.forEach(({ schedule }) => {
    const info = schedule.filter((daySchedule) => daySchedule.monthDay === monthDayToday && daySchedule.status === '!!!')
    count.push(...info);
  });
  return count.length;
}

const counter = {
  patientsToday,
  remainingPatients,
}

export default counter;