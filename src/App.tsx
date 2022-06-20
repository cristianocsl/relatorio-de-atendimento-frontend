import React from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Register from './pages/register';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
