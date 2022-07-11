import React, { ReactElement, useEffect, useState } from "react";
import axiosServices from "../services";
import { idPatient, thisPatient } from "../services/types";
import MyContext from "./MyContext";

type Props = { children: ReactElement | ReactElement[] };

const Provider = ({ children }: Props) => {
  const [patients, setPatients] = useState([]);
  const [finances, setFinances] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  
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

  const filterPatientsByDay = (day: number) => {
    return patients.filter((patient: thisPatient & idPatient) => patient.days.includes(day));
  }

  const context = {
    patients,
    filterPatientsByDay,
    setIsLoggedIn,
    isLoggedIn,
    setIsLoading,
    isLoading,
  };

  return (
    <MyContext.Provider value={context}>
      { children }
    </MyContext.Provider>
  );
};

export default Provider;
