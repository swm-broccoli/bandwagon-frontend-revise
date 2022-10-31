import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { useLoginStore } from './stores/LoginStore';
import ReactGA from 'react-ga4'

const TRACKING_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

if (!window.location.href.includes('localhost')) {
  ReactGA.initialize(TRACKING_ID);
};

useLoginStore.getState().checkNotification();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
