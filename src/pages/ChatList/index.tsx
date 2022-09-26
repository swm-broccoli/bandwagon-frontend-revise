import React, { useEffect, useState } from 'react';
import SendbirdChat from '@sendbird/chat';
import { useLoginStore } from '../../stores/LoginStore';
import GlobalNavBar from '../../components/NavBar';
import GlobalFooter from '../../components/Footer';
import { GroupChannel, GroupChannelModule } from '@sendbird/chat/groupChannel';
import { Link } from 'react-router-dom';

function ChatListPage () {
  const { VITE_SENDBIRD_API_KEY } = import.meta.env;
  const { userId } = useLoginStore();
  const [channels, setChannels] = useState<GroupChannel[]>([]);

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
      setChannels(channels);
      } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <GlobalNavBar />
      <div className='flex flex-col items-center py-7'>
        {channels.map(channel => {
          return (
            <Link to={'/chat/' + channel.url} key={channel.url}>
              <div className='w-72 h-32 p-5 border-solid border-[#e9e9e9] border bg-white rounded-xl' >
                  <h2
                    className=''>
                      {channel.members.filter(member => member.userId != userId)[0].nickname}
                  </h2>
              </div>
            </Link>
          );
        })} 
      </div>
      <GlobalFooter />
    </>
  )
}

export default ChatListPage;