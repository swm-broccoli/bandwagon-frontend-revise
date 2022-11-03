import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
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
import MyPortfolioPage from './pages/Portfolio';
import FindPasswordPage from './pages/FindPassword';
import FindEmailPage from './pages/FindEmail';
import NotFoundPage from './pages/NotFound';
import LikedPost from './pages/LikedPost';
import BandRequest from './pages/BandRequest';
import MyPostPage from './pages/MyPost';
import ChatPage from './pages/Chat';
import UserPortfolioDisplay from './pages/Portfolio/Display';
import SongInfoPage from './pages/SongInfo';
import UserPortfolioDisplay from './pages/Portfolio/UserDisplay';
import CalendarPage from './pages/BandCalendar';
import BandCommunityPage from './pages/BandCommunity';
import BandPortfolioDisplay from './pages/Portfolio/BandDisplay';
import OauthPage from './pages/Oauth';
import RouteChangeTracker from './modules/RouteChangeTracker';

function App() {
  RouteChangeTracker();

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='find'>
          <Route path='email' element={<FindEmailPage />} />
          <Route path='password' element={<FindPasswordPage />} />
        </Route>
        <Route path='signup' element={<SignUpPage />} />

        <Route path='my'>
          <Route path='profile' element={<UserProfilePage />} />
          <Route path='portfolio' element={<MyPortfolioPage />} />
          <Route path='account' element={<AccountEditPage />} />
          <Route path='password' element={<PasswordEditPage />} />
          <Route path='apply' element={<BandRequest />} />
          <Route path='post' element={<MyPostPage />} />
          <Route path='liked' element={<LikedPost />} />
        </Route>

        <Route path='band'>
          <Route path='profile' element={<BandProfilePage />} />
          <Route path='calendar' element={<CalendarPage />} />
          <Route path='community' element={<BandCommunityPage />} />
          <Route path='portfolio' element={<BandPortFolioPage />} />
          <Route path='apply' element={<BandRequest />} />
        </Route>
        <Route path='portfolio' element={<Outlet />}>
          <Route path='' element={<MyPortfolioPage />} />
          <Route path='user' element={<UserPortFolioPage />} />
          <Route path='band' element={<BandPortFolioPage />} />
          <Route path='user/:userEmail' element={<UserPortfolioDisplay />} />
          <Route path='band/:bandId' element={<BandPortfolioDisplay />} />
        </Route>
        <Route path='recruit'>
          <Route path='band' element={<RecruitPage type={true} />} />
          <Route path='user' element={<RecruitPage type={false} />} />
          <Route path='band/write' element={<WriteRecruitPage type={true} />} />
          <Route
            path='band/write/:postId'
            element={<WriteRecruitPage type={true} />}
          />
          <Route
            path='user/write'
            element={<WriteRecruitPage type={false} />}
          />
          <Route
            path='user/write/:postId'
            element={<WriteRecruitPage type={false} />}
          />
          <Route path=':postID' element={<ReadRecruitPage />} />
        </Route>
        <Route path='chat' element={<ChatPage />} />
        <Route path='song' element={<SongInfoPage />} />
        <Route path='calendar' element={<CalendarPage />} />
        <Route path='community' element={<BandCommunityPage />} />
        <Route path='ui' element={<UIPage />} />
        <Route path='oauth2/redirect' element={<OauthPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
