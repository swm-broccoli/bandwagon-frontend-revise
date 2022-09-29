import React, { useEffect, useState } from "react";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import "@sendbird/uikit-react/dist/index.css";
import Channel from '@sendbird/uikit-react/Channel';
import ChannelPreview from '@sendbird/uikit-react/ChannelList/components/ChannelPreview';
import { useLoginStore } from "../../stores/LoginStore";
import GlobalNavBar from "../../components/NavBar";
import GlobalFooter from "../../components/Footer";
import kr from 'date-fns/locale/ko';
import { GroupChannel, GroupChannelModule } from "@sendbird/chat/groupChannel";
import './style.css'
import SendbirdChat from "@sendbird/chat";

function ChatPage() {
  const { VITE_SENDBIRD_API_KEY } = import.meta.env;
  const { userId } = useLoginStore();
  const [currentChannelUrl, setCurrentChannelUrl] = useState('');
  const [showList, setShowList] = useState(true);
  const [channels, setChannels] = useState<GroupChannel[]>([]);

  const myColorSet = {
    '--sendbird-light-primary-500': '#59c991',
    '--sendbird-light-primary-400': '#ebfff5',
    '--sendbird-light-primary-300': '#59c991',
    '--sendbird-light-primary-200': '#ebfff5',
    '--sendbird-light-primary-100': '#ebfff5',
  };

  useEffect(() => {
    if (userId) {
      getChatList();
    }
  }, [userId]);


  const getChatList = async () => {
    const sendbirdChat = await SendbirdChat.init({
      appId: VITE_SENDBIRD_API_KEY,
      modules: [new GroupChannelModule()]
  });

    await sendbirdChat.connect(userId);
    await sendbirdChat.setChannelInvitationPreference(true);

    try {
      const groupChannelQuery = sendbirdChat.groupChannel.createMyGroupChannelListQuery({
        includeEmpty: true });
      const channels = await groupChannelQuery.next();
      console.log(channels);
      setChannels(channels);
      } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setShowList(false);
  }, [currentChannelUrl]);

  return (
    <>
    <GlobalNavBar />
    <div className='flex flex-col w-full pt-8'>
      {showList ?
        <></> :
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => setShowList(true) }
          className='btn btn-primary btn-sm self-end h-2 mr-[5%] mb-2 md:hidden'>목록</button>
      }
      <div className='flex w-[90%] md:w-2/3 h-[70vh] self-center justify-items-center'>
      <div className={showList ? 'flex flex-col w-full md:w-80' : 'hidden md:flex flex-col w-full md:w-80 '}>
        {channels.map((channel, index) => {
          return (
            <div key={index} className='w-full h-20 border-[#e9e9e9] border '>
              <ChannelPreview
                channel={channel}
                onClick={() => setCurrentChannelUrl(channel.url)}
                renderChannelAction={(channel) => <></>}
                tabIndex={0} />
            </div>
          );
        })}
      </div>
      <SendbirdProvider
        appId={VITE_SENDBIRD_API_KEY}
        userId={userId}
        dateLocale={kr}
        colorSet={myColorSet}>
        <div className={showList ? 'w-full md:w-full hidden md:flex' : 'w-full md:w-full'}>
          <Channel
          channelUrl={currentChannelUrl}
          isReactionEnabled={false} />
        </div>
      </SendbirdProvider>
      </div>
    </div>
    <GlobalFooter />
    </>
  );
}

export default ChatPage;