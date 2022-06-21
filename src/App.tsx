import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import BasePage from './pages/BaseLoginRegister';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <Navigate replace to="/login" /> } />
          <Route path="/register" element={<BasePage title="Cadastro" hidden={false}/>} />
          <Route path="/login" element={<BasePage title="Login" hidden={true}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
