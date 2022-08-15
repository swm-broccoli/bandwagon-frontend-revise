import React, { useEffect, useState } from 'react';
import parser from 'html-react-parser';
import ExamplePic from '../../assets/examplepic.jpeg';
import GlobalFooter from '../../components/Footer';
import GlobalNavBar from '../../components/NavBar';
import BandInfoCard from '../../components/BandInfoCard';
import BandApplyBox from './BandApplyBox';
import RecruitPostAPI from '../../apis/RecruitPostAPI';
import { useParams } from 'react-router-dom';
import { PostType } from '../../types/types';
import RecruitProcessAPI from '../../apis/RecruitProcessAPI';

function BasicInfoBox (props: {
  title: string | undefined
}) {
  return (
    <div className='row-start-1 col-start-2 flex flex-col gap-6 w-fit pb-4'>
      <h3 className='text-accent text-sm'>구인글</h3>
      <h1 className='text-accent text-2xl'>{props.title}</h1>
      <div className='flex flex-row w-fit h-fit items-center'>
        <img src={ExamplePic} className='w-7 h-7 mr-2.5 object-cover rounded-full'/>
        <div className='py-px text-base text-accent'>
          김도하
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
  const [postInfo, setPostInfo] = useState<PostType>();
  const [bandId, setBandId] = useState<number>();

  useEffect(() => {
    RecruitPostAPI.LoadPost(postID)
      .then((res) => {
        console.log(res.data);
        setPostInfo(res.data);
        setBandId(res.data.bandId);
        if (postID) {
          RecruitProcessAPI.getPrequisites(postID)
          .then((res) =>  console.log(res.data))
          .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <>
      <GlobalNavBar />
      <div className='flex justify-center w-full h-fit'>
        <div className='grid grid-cols-[1fr_6fr_1fr] md:grid-cols-[2fr_6fr_2fr_1fr] auto-rows-auto w-full h-fit gap-y-5 py-10 max-w-7xl'>
          <BasicInfoBox title={postInfo?.title} />
          <div className='row-start-2 col-start-2'>
            <BandInfoCard type={false} bandId={bandId} />
          </div>
          <ReadArticleCard article={postInfo?.body}/>
          <div className='row-start-4 col-start-2 md:row-start-2 md:col-start-3 md:mt-9 md:justify-self-end'>
            <BandApplyBox />
          </div>
        </div>
      </div>
      <GlobalFooter />
    </>
  )
};

export default ReadRecruitPage;