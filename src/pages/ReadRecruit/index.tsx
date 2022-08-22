import React, { useEffect, useState } from 'react';
import parser from 'html-react-parser';
import ExamplePic from '../../assets/examplepic.jpeg';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import BandInfoCard from '../../components/BandInfoCard';
import ApplyBox from './ApplyBox';
import RecruitPostAPI from '../../apis/RecruitPostAPI';
import { useParams } from 'react-router-dom';
import { useLoginStore } from '../../stores/LoginStore';
import {
  BandProfileType,
  PostType,
  UserProfileType } from '../../types/types';
import RecruitProcessAPI from '../../apis/RecruitProcessAPI';
import UserInfoCard from '../../components/UserInfoCard';

function BasicInfoBox (props: {
  type: boolean,
  title: string | undefined,
  authorPic: string | undefined,
  authorName: string | undefined
}) {
  return (
    <div className='row-start-1 col-start-2 flex flex-col gap-6 w-fit pb-4'>
      <h3 className='text-accent text-sm'>{props.type ? '구인글' : '구직글'}</h3>
      <h1 className='text-accent text-2xl'>{props.title}</h1>
      <div className='flex flex-row w-fit h-fit items-center'>
        {props.authorPic ?
         <img src={props.authorPic} className='w-7 h-7 mr-2.5 object-cover rounded-full'/> :
         <img src={ExamplePic} className='w-7 h-7 mr-2.5 object-cover rounded-full'/>}
        <div className='py-px text-base text-accent'>
          {props.authorName}
        </div>
      </div>
    </div>
  );
};

function ReadArticleCard (props: {article: string | undefined}) {
  if(!props.article){
    return <></>
  } else {
    return (
      <div className='row-start-3 col-start-2 flex flex-col gap-3 w-full h-fit'>
        <h3 className='text-accent text-base'>밴드 정보</h3>
        <div className='w-full h-fit p-5 border border-[#e5e5e5] border-solid rounded-xl gap-7'>
          {parser(props.article)}
        </div>
      </div>
    );
  }
};

function ReadRecruitPage () {
  const { postID } = useParams();
  const [type, setType] = useState<boolean>(false);
  const [postInfo, setPostInfo] = useState<PostType>();
  const [bandId, setBandId] = useState<number>();
  const { isLoggedIn } = useLoginStore();
  const [bandInfo, setBandInfo] = useState<BandProfileType>();
  const [userId, setUserId] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserProfileType>();

  useEffect(() => {
    RecruitPostAPI.LoadPost(postID)
      .then((res) => {
        console.log(res.data);
        setPostInfo(res.data);
        if (res.data.dtype == 'Band') {
          setType(true);
          setBandId(res.data.bandId);
        } else if (res.data.dtype == 'User') {
          setUserId(res.data.userEmail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (type && bandId) {
      RecruitPostAPI.LoadBandInfo(bandId)
      .then((res) => {
        console.log(res.data);
        setBandInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    } else if (!type && userId) {
      RecruitPostAPI.LoadUserInfo(userId)
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [bandId, userId]);
  
  return (
    <>
      <GlobalNavBar />
      <div className='flex justify-center w-full h-fit'>
        <div className='grid grid-cols-[1fr_6fr_1fr] md:grid-cols-[2fr_6fr_2fr_1fr] auto-rows-auto w-full h-fit gap-y-5 py-10 max-w-7xl'>
          {type ?
            <BasicInfoBox
              type={true}
              title={postInfo?.title}
              authorPic={bandInfo?.avatarUrl}
              authorName={bandInfo?.name} /> :
            <BasicInfoBox
              type={false}
              title={postInfo?.title}
              authorPic={userInfo?.avatarUrl}
              authorName={userInfo?.name}/>}
          <div className='row-start-2 col-start-2'>
            {type ?
            <BandInfoCard type={false} bandId={bandId} /> :
            <UserInfoCard type={false} userId={userId}/>}
          </div>
          <ReadArticleCard article={postInfo?.body}/>
          <div className='row-start-4 col-start-2 md:row-start-2 md:col-start-3 md:mt-9 md:justify-self-end'>
            {postID && postInfo ?
              <ApplyBox
                type={type}
                isLoggedIn={isLoggedIn}
                postId={postID}
                likeCount={postInfo.likeCount}
                isLiked={postInfo.isLiked} /> :
              <></>}
          </div>
        </div>
      </div>
      <GlobalFooter />
    </>
  )
};

export default ReadRecruitPage;