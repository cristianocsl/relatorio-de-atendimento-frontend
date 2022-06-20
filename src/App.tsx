import React, { useContext } from 'react';
import MyContext from './context/MyContext';
import logo from './logo.svg';
import './App.css';

function App() {
  const { hello } = useContext(MyContext);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          { hello }
        </p>
      </header>
    </div>
  );
}

export default App;
