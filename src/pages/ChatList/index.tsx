import React, { useEffect } from 'react';
import SendbirdChat from '@sendbird/chat';
import { useLoginStore } from '../../stores/LoginStore';
import GlobalNavBar from '../../components/NavBar';
import GlobalFooter from '../../components/Footer';

function ChatListPage () {
  const { VITE_SENDBIRD_API_KEY } = import.meta.env;
  const { userId } = useLoginStore();

  useEffect(() => {
    if (userId) {
      setupUser();
    }
  }, [userId])

  const setupUser = async () => {
    const sendbirdChat = await SendbirdChat.init({
      appId: VITE_SENDBIRD_API_KEY,
  });

    await sendbirdChat.connect(userId);
    await sendbirdChat.setChannelInvitationPreference(true);
    
  }

  return (
    <>
      <GlobalNavBar />
      <GlobalFooter />
    </>
  )
}

export default ChatListPage;