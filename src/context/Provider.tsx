import React, { ReactElement, useEffect, useState } from "react";
import axiosServices from "../services";
import { idPatient, thisPatient } from "../services/types";
import MyContext from "./MyContext";


type Props = { children: ReactElement | ReactElement[] };

const Provider = ({ children }: Props) => {
  const [patients, setPatients] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const getPatients = async () => {
      if (isLoggedIn) {
        const patients = await axiosServices.get();
        setPatients(patients);
      }
    };

    getPatients();
  }, [isLoggedIn]);

  const patientsByDay = (day: number) => patients.filter((patient: thisPatient & idPatient) => patient.days.includes(day));

  const context = {
    patients,
    patientsByDay,
    setIsLoggedIn,
  };

  return (
    <MyContext.Provider value={context}>
      { children }
    </MyContext.Provider>
  );
};

export default Provider;
