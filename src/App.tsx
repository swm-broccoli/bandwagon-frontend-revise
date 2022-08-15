import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import UIPage from './pages/TempUI';
import SignUpPage from './pages/SignUp';
import BandProfilePage from './pages/BandProfile';
import UserProfilePage from './pages/UserProfile';
import PasswordEditPage from './pages/EditPassword';
import AccountEditPage from './pages/EditAccount';
import RecruitPage from './pages/Recruit';
import WriteRecruitPage from './pages/WriteRecruit';
import ReadRecruitPage from './pages/ReadRecruit';
import BandPortFolioPage from './pages/Portfolio/Band';
import UserPortFolioPage from './pages/Portfolio/User';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path='profile'>
          <Route path='user' element={<UserProfilePage />} />
          <Route path='band' element={<BandProfilePage />} />
        </Route>
        <Route path='portfolio'>
          <Route path='user' element={<UserPortFolioPage />} />
          <Route path='band' element={<BandPortFolioPage />} />
        </Route>
        <Route path='edit'>
          <Route path='password' element={<PasswordEditPage />} />
          <Route path='account' element={<AccountEditPage />} />
        </Route>
        <Route path='recruit' element={<RecruitPage />} />
        <Route path='recruit/write' element={<WriteRecruitPage />} />
        <Route path='/recruit/:articleID' element={<ReadRecruitPage />} />
        <Route path='ui' element={<UIPage />} />
      </Routes>
    </div>
  );
}

export default App;
