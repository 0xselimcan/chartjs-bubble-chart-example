import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import App from './App';
import CustomThemeProvider from './components/CustomThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </React.StrictMode>
);
