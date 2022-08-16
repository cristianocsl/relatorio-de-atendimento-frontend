import React, { ReactElement, useEffect, useState } from "react";
import axiosServices from "../services";
import { idPatient, thisFinances, thisPatient, statusObject, extractDataType } from "../services/types";
import MyContext from "./MyContext";
import calendar from "../services/calendar";
import counter from "../services/counter";
import sendGreetingsMessage from "../services/greetingsMessage";
import { useToast } from '@chakra-ui/react';


type Props = { children: ReactElement | ReactElement[] };
type patientT = thisPatient & idPatient;

const TODAY = new Date().getDay();
const TIME = 3600000;
const TIME2 = 1800000;

const Provider = ({ children }: Props) => {
  const toast = useToast();
  const [patients, setPatients] = useState<Array<patientT>>([]);
  const [finances, setFinances] = useState<Array<thisFinances>>([]);
  const [dataCalendar, setDataCalendar] = useState<Array<extractDataType>>([]);
  const [currentDay, setCurrentDay] = useState<number>(TODAY);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [greetingMessage, setGreetingMessage] = useState<string | undefined>('');
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

  type infoT = { monthDay: number, daySchedule: statusObject, patientData: patientT, status: string };

  const successfullyResetMsg = () => toast({
    title: 'Contagem reiniciada!',
    status: 'success',
    duration: 4000,
    isClosable: true,
  });

  type TupdateAndSendMsg = {
    copyState: patientT[];
    patientId: string;
  }

  const updateAndSendMsg = async (info: TupdateAndSendMsg, updatedInfo: thisPatient) => {
    const { copyState, patientId } = info;
    const { servicePerformed, ...otherInfos } = updatedInfo;
    const updatedPatientInfoResponse = await axiosServices.update(patientId, { ...otherInfos, servicePerformed });
    const updatedList = updatedListOfPatients({ copyState, updatedPatientInfoResponse, patientId });
    setPatients(updatedList);
    if (updatedPatientInfoResponse.message) {
      successfullyResetMsg();
    }
  }

  const resetMonthlyServices = async (patient: patientT) => {
    const copyState = [...patients];
    const { _id: patientId, servicePerformed, ...otherInfos } = patient;
    if (servicePerformed.monthly === otherInfos.serviceGoal.monthly) {
      servicePerformed.monthly = 0;
      const updatedInfo: thisPatient = { ...otherInfos, servicePerformed };
      updateAndSendMsg({ copyState, patientId }, updatedInfo);
    }
  };

  const resetWeeklyServices = async (patient: patientT) => {
    const copyState = [...patients];
    const { _id: patientId, servicePerformed, ...otherInfos } = patient;
    
    if (servicePerformed.weekly === otherInfos.serviceGoal.weekly) {
      servicePerformed.weekly = 0;
      const updatedInfo: thisPatient = { ...otherInfos, servicePerformed };
      updateAndSendMsg({ copyState, patientId }, updatedInfo);
    }
  }

  const changeScheduleStatus = (info: infoT): patientT => {
    const { monthDay, daySchedule, patientData, status } = info;
    const updatedStatus = { ...daySchedule, status };

    const updatedSchedule = patientData?.schedule.map((daySchedule: statusObject) => {
      if (daySchedule.monthDay === monthDay) {
        return updatedStatus;
      }
      return daySchedule;
    });
    const updatedData = {...patientData, schedule: updatedSchedule};
    
    return updatedData;
  }

  type infoPatientsListT = { copyState: patientT[], updatedPatientInfoResponse: patientT, patientId: string };

  const updatedListOfPatients = (arrayPatients: infoPatientsListT): patientT[] => {
    const { copyState, updatedPatientInfoResponse, patientId } = arrayPatients;
    return copyState.map((patient: patientT) => {
      if (patient._id === patientId) {
        return updatedPatientInfoResponse;
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
      servicePerformed.monthly = servicePerformed.monthly > serviceGoal.monthly ? serviceGoal.monthly : servicePerformed.monthly;
      return { ...patientData, servicePerformed };
    } else {
      servicePerformed.weekly -= 1;
      servicePerformed.weekly = servicePerformed.weekly < 0 ? 0 : servicePerformed.weekly;
      servicePerformed.monthly -= 1;
      servicePerformed.monthly = servicePerformed.monthly < 0 ? 0 : servicePerformed.monthly;
      return { ...patientData, servicePerformed };
    }
  }

  const findPatient = (patients: patientT[], patientId: string) => patients.find((patient: patientT) => patient._id === patientId);

  const handleChangeStatus = async (checked: boolean, patientId: string, monthDay: number) => {
    const copyState = [...patients];
    
    const todayMonthDay = new Date().getDate();
    
    if (todayMonthDay === monthDay) {
      const patientData = findPatient(copyState, patientId);

      const daySchedule = patientData?.schedule.find((daySchedule: statusObject) => daySchedule.monthDay === monthDay);

      const infoUpdate = { monthDay, daySchedule, patientData, status: 'OK' };

      if (checked) {
        const updatedSchedule = changeScheduleStatus(infoUpdate as infoT);
        const updatedPatientInfo = serviceCounter(updatedSchedule, checked);
        const { _id: patientId, ...updatedPatientInfoWithoutId } = updatedPatientInfo;
        const updatedPatientInfoResponse: patientT = await axiosServices.update(patientId, updatedPatientInfoWithoutId);
        const updatedList = updatedListOfPatients({ copyState, updatedPatientInfoResponse, patientId });
        setPatients(updatedList);
      } else {
        const updatedSchedule = changeScheduleStatus({...infoUpdate, status: '!!!'} as infoT);
        const updatedPatientInfo = serviceCounter(updatedSchedule, checked);
        const { _id: patientId, ...updatedPatientInfoWithoutId } = updatedPatientInfo;
        const updatedPatientInfoResponse: patientT = await axiosServices.update(patientId, updatedPatientInfoWithoutId);
        const updatedList = updatedListOfPatients({ copyState, updatedPatientInfoResponse, patientId });
        setPatients(updatedList);
      }
    }
  }

  const filterPatientsByDay = (day: number): Array<patientT> => {
    return patients.filter((patient: patientT) => patient.days.includes(day));
  }

  const getPatientInfoById = (patientId: string): patientT | undefined => {
    return patients.find((patient: patientT) => patient._id === patientId);
  }
  
  const patientsToday = counter.patientsToday(patients);
  const remainingPatients = counter.remainingPatients(patients);
  
  const context = {
    isLoading,
    isLoggedIn,
    patients,
    finances,
    dataCalendar,
    patientsToday,
    remainingPatients,
    greetingMessage,
    newRequestIfItChanged,
    filterPatientsByDay,
    setIsLoggedIn,
    setIsLoading,
    setNewRequestIfItChanged,
    setPatients,
    handleChangeStatus,
    resetWeeklyServices,
    resetMonthlyServices,
    getPatientInfoById,
  };

  return (
    <MyContext.Provider value={context}>
      { children }
    </MyContext.Provider>
  );
};

export default Provider;
