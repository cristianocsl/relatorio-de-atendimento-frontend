import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Provider from './context/Provider';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import themeMaterial from './theme/themeMUI';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={themeMaterial}>
    <ChakraProvider theme={theme}>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
