import React, { ReactElement, useEffect, useState } from "react";
import axiosServices from "../services";
import { idPatient, thisFinances, thisPatient, extractDataType } from "../services/types";
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
        const { patients, finances} = await axiosServices.get();
        setPatients(patients);
        setFinances(finances);
        setIsLoading(false);
      }
    };

    getPatients();
  }, [isLoggedIn, newRequestIfItChanged]);

  const handleChangeStatus = async (event: any, patientId: string, monthDay: number) => {
    const copyState = [...patients];
    const index = copyState.find((patient: thisPatient & idPatient) => patient._id === patientId);
    console.log(index);
    if (status === '!!!') {
      // copyState[index].status = 'OK';
      setPatients(copyState);
    } else {
      // copyState[index].status = '!!!';
      setPatients(copyState);
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
