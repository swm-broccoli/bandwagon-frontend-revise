import React from "react";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import "@sendbird/uikit-react/dist/index.css";
import Channel from '@sendbird/uikit-react/Channel';
import { useLoginStore } from "../../stores/LoginStore";
import GlobalNavBar from "../../components/NavBar";
import GlobalFooter from "../../components/Footer";
import { useParams } from "react-router-dom";
import kr from 'date-fns/locale/ko';

function ChatPage() {
  const { VITE_SENDBIRD_API_KEY } = import.meta.env;
  const { userId } = useLoginStore();
  const { chatId } = useParams();
  const myColorSet = {
    '--sendbird-light-primary-500': '#59c991',
    '--sendbird-light-primary-400': '#ebfff5',
    '--sendbird-light-primary-300': '#59c991',
};

  return (
    <>
    <GlobalNavBar />
    <div className='flex h-[80vh] pt-8 justify-center'>
      <SendbirdProvider
        appId={VITE_SENDBIRD_API_KEY}
        userId={userId}
        dateLocale={kr}
        colorSet={myColorSet}>
        <div className='w-3/5'>
          {chatId ?
          <Channel
          channelUrl={chatId}
          isReactionEnabled={false} /> :
          <p>Loading...</p>
          }
        </div>
      </SendbirdProvider>
    </div>
    <GlobalFooter />
    </>
  );
}

export default ChatPage;