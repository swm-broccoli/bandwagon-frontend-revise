import React from 'react';
import { BandRequestType } from '../../types/types';
import ExamplePic from '../../assets/examplepic.png';
import BandRequestAPI from '../../apis/BandRequestAPI';
import { GroupChannelCreateParams, GroupChannelModule } from '@sendbird/chat/groupChannel';
import SendbirdChat from '@sendbird/chat';
import { useLoginStore } from '../../stores/LoginStore';

function InviteCard(props: {
  type: boolean
  request: BandRequestType}) {
  
  const { userId } = useLoginStore();

  const makeChat = async (inviteEmail: string) => {
    const { VITE_SENDBIRD_API_KEY } = import.meta.env;
  
    const sendbirdChat = await SendbirdChat.init({
      appId: VITE_SENDBIRD_API_KEY,
      modules: [new GroupChannelModule()]
    });
    
    await sendbirdChat.connect(userId);
  
    try {
      const params: GroupChannelCreateParams = {
        invitedUserIds: [userId, inviteEmail],
        name: '',
        isDistinct: true
      };
  
      const groupChannel = await sendbirdChat.groupChannel.createChannel(params);
        console.log(groupChannel);
    } catch (error) {
      console.log(error)
    }
  
    sendbirdChat.disconnect();
  }
  
  function handleAcceptClick (e: React.MouseEvent<HTMLButtonElement>) {
    BandRequestAPI.AcceptInvite(true, props.request.id)
    .then((res) => {
      window.alert(props.request.band.name + '의 멤버가 되었습니다!');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  function handleRejectClick (e: React.MouseEvent<HTMLButtonElement>) {
    BandRequestAPI.AcceptInvite(true, props.request.id)
    .then((res) => {
      window.alert('초대를 거절하였습니다');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  function handleDeleteClick (e: React.MouseEvent<HTMLButtonElement>) {
    BandRequestAPI.DeleteInvite(props.request.id)
    .then((res) => {
      window.alert('초대를 취소하였습니다');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleChatClick (e: React.MouseEvent<HTMLButtonElement>) {
    makeChat(props.type ? props.request.band.email : props.request.user.email)
  }

  return (
    <div className='w-full h-full grid grid-cols-[100px_auto] grid-rows-2 gap-x-4 gap-y-2'>
      {props.type ?
        <img src={props.request.user.avatarUrl ?
          props.request.user.avatarUrl :
          ExamplePic}
          className='hidden sm:flex row-start-1 row-end-3 col-start-1 w-full h-[100px] self-center rounded-full object-cover' /> :
        <img src={props.request.band.avatarUrl ?
          props.request.band.avatarUrl :
          ExamplePic}
          className='hidden sm:flex row-start-1 row-end-3 col-start-1 w-full h-[100px] self-center rounded-full object-cover' />
      }
      {props.type ?
        <h2 className='row-start-1 col-start-1 col-end-3 sm:col-start-2 w-full truncate font-medium text-lg text-accent mt-2'>
        {props.request.user.name + ' 님에게 초대를 보냈습니다!'}
        </h2> :
        <h2 className='row-start-1 col-start-1 col-end-3 sm:col-start-2 w-full truncate font-medium text-lg text-accent mt-2'>
        {props.request.band.name + ' 밴드의 초대 요청입니다!'}
        </h2>
      }
      {props.type ?
      <div className='row-start-2 col-start-1 col-end-3 md:col-start-2 h-8 self-end justify-self-end flex gap-2'>
        <button
          onClick={handleChatClick}
          className='btn btn-ghost min-h-fit h-full text-sm'>채팅</button>
        <button
          onClick={handleDeleteClick}
          className='btn bg-base-300 border-base-300 text-gray-700 min-h-fit h-8 row-start-2 col-start-2 self-end justify-self-end'>취소</button>
      </div> :
      <div className='row-start-2 col-start-1 col-end-3 md:col-start-2 h-8 self-end justify-self-end flex gap-2'>
        <button
          onClick={handleChatClick}
          className='btn btn-ghost min-h-fit h-full text-sm'>채팅</button>
        <button
          onClick={handleAcceptClick}
          className='btn btn-primary min-h-fit h-full text-sm'>수락</button>
        <button
          onClick={handleRejectClick}
          className='btn btn-error min-h-fit h-full text-sm'>거절</button>
      </div>}
    </div>
  )
}

export default InviteCard;