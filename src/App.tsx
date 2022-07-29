import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import UIPage from './pages/TempUI';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='ui' element={<UIPage />} />
      </Routes>
    </div>
  );
}

export default App;
