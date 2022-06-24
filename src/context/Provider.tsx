import React, { ReactElement, useEffect, useState } from "react";
import axiosServices from "../services";
import MyContext from "./MyContext";


type Props = { children: ReactElement | ReactElement[] };

const Provider = ({ children }: Props) => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const getPatients = async () => {
      const patients = await axiosServices.get();
      setPatients(patients);
      console.log(patients);
    };

    getPatients();
  }, []);
  const hello = 'Hello Word!';

  const context = {
    hello,
    patients,
  };

  return (
    <MyContext.Provider value={context}>
      { children }
    </MyContext.Provider>
  );
};

export default Provider;
