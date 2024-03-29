import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AddPatient from './components/AddPatient';
import UpdatePatient from './components/UpdatePatient';
import PatientsTable from './components/PatientsTable';
import BasePage from './pages/BaseLoginRegister';
import Finances from './components/Finances';
import AllPatients from './components/AllPatients';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <Navigate replace to="/login" /> } />
          <Route path="/register" element={<BasePage title="Cadastro" textButtom="Enviar" hidden={false}/>} />
          <Route path="/login" element={<BasePage title="Login" textButtom="Entrar" hidden={true}/>} />
          <Route path="/patients" element={ <PatientsTable /> } />
          <Route path="/addPatient" element={ <AddPatient /> } />
          <Route path="/finances" element={ <Finances /> } />
          <Route path="/allPatients" element={ <AllPatients /> } />
          <Route path="/updatePatient/:patientId" element={ <UpdatePatient /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
