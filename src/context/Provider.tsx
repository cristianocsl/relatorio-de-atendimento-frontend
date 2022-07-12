import React, { ReactElement, useEffect, useState } from "react";
import axiosServices from "../services";
import { idPatient, thisFinances, thisPatient, extractDataType } from "../services/types";
import MyContext from "./MyContext";
import calendar from "../services/calendar";

type Props = { children: ReactElement | ReactElement[] };

const TODAY = new Date().getDay();
const TIME = 3600000;

const Provider = ({ children }: Props) => {
  const [patients, setPatients] = useState<Array<thisPatient & idPatient>>([]);
  const [finances, setFinances] = useState<Array<thisFinances>>([]);
  const [dataCalendar, setDataCalendar] = useState<Array<extractDataType>>([]);
  const [currentDay, setCurrentDay] = useState<number>(TODAY);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  setInterval(() =>{
    const today = new Date().getDay();
    if (today > currentDay) {
      setCurrentDay(today);
    }
  }, TIME);

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
  }, [isLoggedIn]);

  const filterPatientsByDay = (day: number): Array<thisPatient & idPatient> => {
    return patients.filter((patient: thisPatient & idPatient) => patient.days.includes(day));
  }

  const context = {
    isLoading,
    isLoggedIn,
    patients,
    finances,
    filterPatientsByDay,
    setIsLoggedIn,
    setIsLoading,
  };

  return (
    <MyContext.Provider value={context}>
      { children }
    </MyContext.Provider>
  );
};

export default Provider;
