import React, { ReactElement, useEffect, useState } from "react";
import axiosServices from "../services";
import { idPatient, thisFinances, thisPatient, statusObject, extractDataType } from "../services/types";
import MyContext from "./MyContext";
import calendar from "../services/calendar";
import counter from "../services/counter";
import sendGreetingsMessage from "../services/greetingsMessage";

type Props = { children: ReactElement | ReactElement[] };

const TODAY = new Date().getDay();
const TIME = 3600000;
const TIME2 = 1800000;

const Provider = ({ children }: Props) => {
  const [patients, setPatients] = useState<Array<thisPatient & idPatient>>([]);
  const [finances, setFinances] = useState<Array<thisFinances>>([]);
  const [dataCalendar, setDataCalendar] = useState<Array<extractDataType>>([]);
  const [currentDay, setCurrentDay] = useState<number>(TODAY);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [greetingMessage, setGreetingMessage] = useState('');
  const [observerMessage, setObserverMessage] = useState(true);
  const [newRequestIfItChanged, setNewRequestIfItChanged] = useState(false);
  
  setInterval(() =>{
    const today = new Date().getDay();
    if (today > currentDay) {
      setCurrentDay(today);
    }
  }, TIME);

  setInterval(() =>{
    setObserverMessage((prevState) => !prevState);
  }, TIME2);
  
  useEffect(() => {
    const message = sendGreetingsMessage();
    setGreetingMessage(message);
  }, [observerMessage]);

  useEffect(() => {
    const data = calendar();
    setDataCalendar(data);
  }, [currentDay]);
  
  useEffect(() => {
    axiosServices.setTokenInAxiosInstance();
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    const TOKEN = localStorage.getItem('token');
    
    const getPatients = async () => {
      if (isLoggedIn || TOKEN) {
        const { patients, finances } = await axiosServices.get();
        setPatients(patients);
        setFinances(finances);
        setIsLoading(false);
      }
    };

    getPatients();
  }, [isLoggedIn, newRequestIfItChanged]);

  type infoT = { monthDay: number, daySchedule: statusObject, patientData: (thisPatient & idPatient), status: string };

  const changeScheduleStatus = (info: infoT): patientT => {
    const { monthDay, daySchedule, patientData, status } = info;
    const updatedStatus = {
      ...daySchedule,
      status,
    };

    const updatedSchedule = patientData?.schedule.map((daySchedule: statusObject) => {
      if (daySchedule.monthDay === monthDay) {
        return updatedStatus;
      }
      return daySchedule;
    })

    const updatedData = {...patientData, schedule: updatedSchedule};
    
    return updatedData;
  }

  type patientT = thisPatient & idPatient;

  type infoPatientsListT = { copyState: patientT[], updatedPatientInfo: patientT, patientId: string };

  const updatedListOfPatients = (arrayPatients: infoPatientsListT): patientT[] => {
    const { copyState, updatedPatientInfo, patientId } = arrayPatients;
    return copyState.map((patient: thisPatient & idPatient) => {
      if (patient._id === patientId) {
        return updatedPatientInfo;
      }
      return patient;
    })
  }

  const serviceCounter = (patientData: patientT, checked: boolean): patientT => {
    const { servicePerformed, serviceGoal } = patientData;
    
    if (checked) {
      servicePerformed.weekly += 1;
      servicePerformed.weekly = servicePerformed.weekly > serviceGoal.weekly ? serviceGoal.weekly : servicePerformed.weekly;
      servicePerformed.monthly += 1;
      return { ...patientData, servicePerformed };
    } else {
      servicePerformed.weekly -= 1;
      servicePerformed.weekly = servicePerformed.weekly < 0 ? 0 : servicePerformed.weekly;
      servicePerformed.monthly -= 1;
      servicePerformed.monthly = servicePerformed.monthly < 0 ? 0 : servicePerformed.monthly;
      return { ...patientData, servicePerformed };
    }
  }

  const handleChangeStatus = async (checked: boolean, patientId: string, monthDay: number) => {
    const copyState = [...patients];
    
    const todayMonthDay = new Date().getDate();
    
    if (todayMonthDay === monthDay) {
      const patientData = copyState.find((patient: thisPatient & idPatient) => patient._id === patientId);

      const daySchedule = patientData?.schedule.find((daySchedule: statusObject) => daySchedule.monthDay === monthDay);

      const infoUpdate = { monthDay, daySchedule, patientData, status: 'OK' };

      if (checked) {
        const updatedSchedule = changeScheduleStatus(infoUpdate as infoT);
        const updatedPatientInfo = serviceCounter(updatedSchedule, checked);
        const { _id: patientId, ...updatedPatientInfoWithoutId } = updatedPatientInfo;
        await axiosServices.update(patientId, updatedPatientInfoWithoutId);
        const updatedList = updatedListOfPatients({ copyState, updatedPatientInfo, patientId });
        setPatients(updatedList);
      } else {
        const updatedSchedule = changeScheduleStatus({...infoUpdate, status: '!!!'} as infoT);
        const updatedPatientInfo = serviceCounter(updatedSchedule, checked);
        const { _id: patientId, ...updatedPatientInfoWithoutId } = updatedPatientInfo;
        await axiosServices.update(patientId, updatedPatientInfoWithoutId);
        const updatedList = updatedListOfPatients({ copyState, updatedPatientInfo, patientId });
        setPatients(updatedList);
      }
    }
  }

  const filterPatientsByDay = (day: number): Array<thisPatient & idPatient> => {
    return patients.filter((patient: thisPatient & idPatient) => patient.days.includes(day));
  }
  
  const patientsToday = counter.patientsToday(patients);
  // const remainingPatients = counter.remainingPatients(patients);
  // const patientsPending = counter.patientsPending(patients);
  
  const context = {
    isLoading,
    isLoggedIn,
    patients,
    finances,
    dataCalendar,
    patientsToday,
    // patientsPending,
    // remainingPatients,
    greetingMessage,
    newRequestIfItChanged,
    filterPatientsByDay,
    setIsLoggedIn,
    setIsLoading,
    setNewRequestIfItChanged,
    setPatients,
    handleChangeStatus,
  };

  return (
    <MyContext.Provider value={context}>
      { children }
    </MyContext.Provider>
  );
};

export default Provider;
