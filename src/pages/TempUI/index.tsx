import React, { useEffect } from 'react';
import SiteLogo from '../../components/Logo';
import GlobalNavBar from '../../components/NavBar';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import UserProfileAPI from '../../apis/UserProfileAPI';
import UserAccountAPI from '../../apis/UserAccountAPI';

const queryClient = new QueryClient();

function TestDiv() {
  const { data, error } = useQuery(
    ['/api/users'],
    UserAccountAPI.getUserAccountInfo,
  );

  return (
    <button
      onClick={() => {
        console.log(data);
        console.log(error);
      }}
    >
      test
    </button>
  );
}

function UIPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalNavBar />
      <TestDiv />
      <div>임시로 UI들을 만들어 넣어 놓는 페이지입니다.</div>
      <h1 className='text-4xl underline'>Vite + React</h1>
      <button
        className='
        btn-primary
       text-white
        rounded
        w-80
        h-12
       '
      >
        기본버튼
      </button>
      <SiteLogo />
    </QueryClientProvider>
  );
}

export default UIPage;
