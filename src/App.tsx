import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import BandProfilePage from './pages/BandProfile';
import UserProfilePage from './pages/UserProfile';
import PasswordEditPage from './pages/EditPassword';
import AccountEditPage from './pages/EditAccount';
import RecruitPage from './pages/Recruit';
import WriteRecruitPage from './pages/WriteRecruit';
import ReadRecruitPage from './pages/ReadRecruit';
import FindPasswordPage from './pages/FindPassword';
import FindEmailPage from './pages/FindEmail';
import NotFoundPage from './pages/NotFound';
import LikedPost from './pages/LikedPost';
import BandRequest from './pages/BandRequest';
import MyPostPage from './pages/MyPost';
import ChatPage from './pages/Chat';
import SongInfoPage from './pages/SongInfo';
import SchedulePage from './pages/BandSchedule';
import BandCommunityPage from './pages/BandCommunity';
import OauthPage from './pages/Oauth';
import RouteChangeTracker from './modules/RouteChangeTracker';
import UserPortfolioPage from './pages/Portfolio/User';
import BandPortfolioPage from './pages/Portfolio/Band';
import UserPortFolioPrintPage from './pages/PortfolioPrint/User';
import BandPortFolioPrintPage from './pages/PortfolioPrint/Band';
import UserPortfolioDisplay from './pages/PortfolioDisplay/User';
import BandPortfolioDisplay from './pages/PortfolioDisplay/Band';
import BandTempPage from './pages/BandTempPage';
import TempPage from './pages/TempPage';

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
          <Route path='portfolio' element={<UserPortfolioPage />} />
          <Route path='account' element={<AccountEditPage />} />
          <Route path='password' element={<PasswordEditPage />} />
          <Route path='apply' element={<BandRequest />} />
          <Route path='post' element={<MyPostPage />} />
          <Route path='liked' element={<LikedPost />} />
        </Route>

        <Route path='band'>
          <Route path='profile' element={<BandProfilePage />} />
          {/*<Route path='schedule' element={<SchedulePage />} />
          <Route path='community' element={<BandCommunityPage />} />*/}
          <Route path='schedule' element={<BandTempPage />} />
          <Route path='community' element={<BandTempPage />} />
          <Route path='portfolio' element={<BandPortfolioPage />} />
          <Route path='apply' element={<BandRequest />} />
        </Route>
        <Route path='portfolio' element={<Outlet />}>
          <Route path='user/print' element={<UserPortFolioPrintPage />} />
          <Route path='band/print' element={<BandPortFolioPrintPage />} />
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
        {/*<Route path='song' element={<SongInfoPage />} />*/}
        <Route path='song' element={<TempPage />} />
        <Route path='oauth2/redirect' element={<OauthPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
