import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherApp from './WeatherApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HelpLink from './routes/HelpLink';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WeatherApp />} />
        <Route path='Help' element={<HelpLink />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

