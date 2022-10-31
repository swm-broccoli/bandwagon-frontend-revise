import React, { Children, useEffect, useState } from 'react';
import btn_like from '../../assets/btn_like.svg';
import btn_like_on from '../../assets/btn_like_on.svg';
import btn_chat from '../../assets/btn_chat.svg';
import btn_apply from '../../assets/btn_apply.svg';
import ico_circle from '../../assets/ico_circle.svg';
import ico_x from '../../assets/ico_x.svg';
import RecruitProcessAPI from '../../apis/RecruitProcessAPI';
import { AreaType, PrequisiteResponseType, SelectionType } from '../../types/types';
import RecruitPostAPI from '../../apis/RecruitPostAPI';
import BandRequestAPI from '../../apis/BandRequestAPI';
import { Link, useParams } from 'react-router-dom';
import { useLoginStore } from '../../stores/LoginStore';
import SendbirdChat from '@sendbird/chat';
import {
  GroupChannelCreateParams,
    GroupChannelHandler,
    GroupChannelModule,
} from '@sendbird/chat/groupChannel';

function PrequisiteTooltip (props: {
  checked: PrequisiteResponseType[]
  checkedAll: boolean}) {

  return (
    <div className='hidden group-hover:flex flex-col gap-[0.325rem] w-56 h-fit p-4 mt-8 -ml-40 bg-white border border-solid border-[#f2f2f2] rounded-xl shadow-md absolute'>
      <ul className='flex flex-col gap-[0.325rem]'>
      {props.checked.map((preq, index) =>
        <li key={index}><PrequisiteElementBox element={preq} /></li>
      )}
      </ul>
      {props.checkedAll ?
      <p className='mt-1 w-fit ml-1 text-accent text-xs'>
        ※ 지금 바로 지원해 보세요!
      </p> :
      <p className='mt-1 w-fit ml-1 text-accent text-xs'>
        ※ 조건이 맞지 않아 지원이 불가합니다.
      </p>}
    </div>
  )
}

function AreaElement (props: {areaList: AreaType[]}) {
  return (
    <ul className='flex flex-col gap-1 justify-items-start'>
      {props.areaList.map((area, index) =>
        <li key={index} className='w-fit text-accent text-sm'>
          {area.city + ' ' + area.district}
        </li>)}
    </ul>
  )
}

function AgeElement (props: {
  minAge: number | null,
  maxAge: number | null}) {
  return (
    <>
      {props.minAge && props.maxAge ? 
        <p className='text-accent text-sm'>
          {props.minAge?.toString() + '세 ~ ' + props.maxAge?.toString() + '세'}
        </p> :
        props.minAge ?
          <p className='text-accent text-sm'>
            {props.minAge?.toString() + '세 ~ '}
          </p> :
          <p className='text-accent text-sm'>
          {'~ ' + props.maxAge?.toString() + '세'}
          </p>
        }
    </>
  )
}

function PositionElement (props: {positionList: SelectionType[]}) {
  return (
    <ul className='flex flex-col gap-1 justify-items-start'>
      {props.positionList.map((position, index) =>
        <li key={index} className='w-fit text-accent text-sm'>
          {position.name + ' 연주'}
        </li>)}
    </ul>
  )
}

function GenderElement (props: {preqGender: boolean | null}) {
  return (
    <>
      {props.preqGender ?
        <p className='text-accent text-sm'>성별 여자</p> :
        <p className='text-accent text-sm'>성별 남자</p>
      }
    </>
  )
}

function GenreElement (props: {genreList: SelectionType[]}) {
  return (
    <ul className='flex flex-col gap-1 justify-items-start'>
      {props.genreList.map((genre, index) =>
        <li key={index} className='w-fit text-accent text-sm'>
          {genre.name + ' 선호'}
        </li>)}
    </ul>
  )
}

function PrequisiteElement (props: {
  checked: boolean,
  children: React.ReactNode}) {
  return (
    <>
    {props.checked ?
      <div className='flex w-48 h-fit gap-4 pl-4 py-1 bg-[#f4f9f9] rounded-2xl'>
        <img src={ico_circle} />
        {props.children}
      </div> :
      <div className='flex w-48 h-fit gap-4 bg-[#f9f4f7] pl-4 py-1 rounded-2xl'>
        <img src={ico_x} />
        {props.children}
    </div>
    }
    </>
  )
}

function PrequisiteElementBox (props: {
  element: PrequisiteResponseType}) {
  switch (props.element.dtype) {
    case 'Area': {
      return (
      <PrequisiteElement
        checked={props.element.check}
        children={<AreaElement areaList={props.element.areas}/>}  />)
    }
    case 'Age': {
      return (
        <PrequisiteElement
          checked={props.element.check}
          children={
            <AgeElement
              minAge={props.element.min}
              maxAge={props.element.max} />}  />)
    }
    case 'Position': {
      return (
        <PrequisiteElement
          checked={props.element.check}
          children={<PositionElement
            positionList={props.element.positions} />}  />)
    }
    case 'Gender': {
      return (
        <PrequisiteElement
          checked={props.element.check}
          children={<GenderElement
            preqGender={props.element.gender} />}  />)
    }
    case 'Genre': {
      return (
        <PrequisiteElement
          checked={props.element.check}
          children={<GenreElement
            genreList={props.element.genres} />}  />)
    }
    default: return <></>
  }

}

// true: 구인, false: 구직
function ApplyBox (props: {
  type: boolean,
  postId: string,
  author: string,
  isLoggedIn: boolean,
  isLiked: boolean,
  likeCount: number}) {
  const {postID} = useParams();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [preqCheck, setPreqCheck] = useState<PrequisiteResponseType[]>();
  const [checkedAll, setCheckedAll] = useState<boolean>(true);
  const { isLoggedIn, userId } = useLoginStore();

  useEffect(() => {
    setLikeCount(props.likeCount);
    setIsLiked(props.isLiked);
  }, [props]);

  useEffect(() => {
    if (props.isLoggedIn && props.type) {
      RecruitProcessAPI.checkPrequisites(props.postId)
      .then((res) => {
        console.log(res.data);
        setPreqCheck(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [props.postId, props.type])

  useEffect(() => {
    preqCheck?.map((preq) => {
      if (!preq.check) {
        setCheckedAll(false);
      }
    })
  }, [preqCheck]);
  
  const makeChat = async (email: string) => {
    const { VITE_SENDBIRD_API_KEY } = import.meta.env;
  
    const sendbirdChat = await SendbirdChat.init({
      appId: VITE_SENDBIRD_API_KEY,
      modules: [new GroupChannelModule()]
    });
  
    await sendbirdChat.connect(email);

    try {
      const params: GroupChannelCreateParams = {
        invitedUserIds: [userId, props.author],
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

  function handleHeartClick (e: React.MouseEvent<HTMLButtonElement>) {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    RecruitPostAPI.ChangeLike(isLiked, props.postId);
    setIsLiked(!isLiked);
  }

  function handleChatClick (e: React.MouseEvent<HTMLButtonElement>) {
    console.log(props.author);
    if (isLoggedIn) {
      makeChat(userId);
    } else {
      window.alert('로그인 후 이용해 주세요!');
    }
  }

  function handleApplyClick (e: React.MouseEvent<HTMLButtonElement>) {
    if (checkedAll && postID) {
      BandRequestAPI.ApplyBand(postID)
      .then((res) => {
        console.log(res);
        if (res) {window.alert('지원이 완료되었습니다!');}
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      window.alert('조건이 맞지 않아 지원이 불가합니다!')
    }
  }

  return (
    <div className='flex flex-row md:flex-col md:gap-7 md:p-0 h-fit justify-between p-4'>
      <div className='flex flex-col gap-[0.325rem]'>
        {isLiked ?
          <button onClick={handleHeartClick}><img src={btn_like_on} /></button> :
          <button onClick={handleHeartClick}><img src={btn_like} /></button>
        }
        {isLiked ?
        <p className='text-error text-sm text-center'>
          {likeCount}
        </p> :
        <p className='text-neutral text-sm text-center'>
          {likeCount}
        </p>
        }
      </div>
      <div className='flex flex-col gap-[0.325rem]'>
      <Link to='/chat'>
        <button onClick={handleChatClick}><img src={btn_chat} /></button>
      </Link>
      <p className='text-neutral text-sm text-center'>채팅하기</p>
      </div>
      {props.type ? 
        <div className='flex flex-col gap-[0.325rem]'>
          <button
            onClick={handleApplyClick}
            className='group'>
              <img src={btn_apply} />
              {preqCheck ?
                  <PrequisiteTooltip
                    checked={preqCheck}
                    checkedAll={checkedAll}/> :
                  <></>}
          </button>
          <p className='text-neutral text-sm text-center'>지원하기</p>
        </div> :
        <></>}
    </div>
  );
};

export default ApplyBox;