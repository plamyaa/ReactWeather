import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherApp from './WeatherApp';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HelpLink from './routes/HelpLink';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<WeatherApp />} />
      <Route path='Help' element={<HelpLink />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
