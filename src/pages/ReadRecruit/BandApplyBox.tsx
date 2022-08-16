import React, { useEffect, useState } from 'react';
import btn_like from '../../assets/btn_like.svg';
import btn_like_on from '../../assets/btn_like_on.svg';
import btn_chat from '../../assets/btn_chat.svg';
import btn_apply from '../../assets/btn_apply.svg';
import ico_circle from '../../assets/ico_circle.svg';
import ico_x from '../../assets/ico_x.svg';
import RecruitProcessAPI from '../../apis/RecruitProcessAPI';
import { PrequisiteResponseType } from '../../types/types';

function PrequisiteTooltip () {
  return (
    <div className='hidden group-hover:flex flex-col gap-[0.325rem] w-56 h-fit p-4 mt-8 -ml-40 bg-white border border-solid border-[#f2f2f2] rounded-xl shadow-md absolute'>
      <PrequisiteElement satisfied={true} />
      <PrequisiteElement satisfied={false} />
      <p className='mt-1 text-accent text-xs'>※ 조건이 맞지 않아 지원이 불가합니다.</p>
    </div>
  )
}

function PrequisiteElement (props: {satisfied: boolean}) {
  return (
    <>
    {props.satisfied ?
      <div className='flex w-48 h-7 gap-2 pl-4 bg-[#f4f9f9] rounded-2xl items-center'>
        <img src={ico_circle} />
        <p className='text-accent text-sm'>나이 30대 초반</p>
      </div> :
      <div className='flex w-48 h-7 gap-2 bg-[#f9f4f7] pl-4 rounded-2xl items-center'>
      <img src={ico_x} />
      <p className='text-accent text-sm'>선호 장르 케이팝</p>
    </div>
    }
    </>
  )
}

function BandApplyBox (props:
  {postId: string | undefined,
  isLoggedIn: boolean}) {
  const [isHeartChecked, setIsHeartChecked] = useState(false);
  const [preqCheck, setPreqCheck] = useState<PrequisiteResponseType[]>();

  useEffect(() => {
    if (props.isLoggedIn) {
      RecruitProcessAPI.checkPrequisites(props.postId)
      .then((res) => {
        console.log(res.data);
        setPreqCheck(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [props.postId])

  function handleHeartClick (e: React.MouseEvent<HTMLButtonElement>) {
    setIsHeartChecked(!isHeartChecked);
  }

  return (
    <div className='flex flex-row md:flex-col md:gap-7 md:p-0 h-fit justify-between p-4'>
      <div className='flex flex-col gap-[0.325rem]'>
        {isHeartChecked ?
          <button onClick={handleHeartClick}><img src={btn_like_on} /></button> :
          <button onClick={handleHeartClick}><img src={btn_like} /></button>
        }
        {isHeartChecked ?
        <p className='text-error text-sm text-center'>10</p> :
        <p className='text-neutral text-sm text-center'>10</p>
        }
      </div>
      <div className='flex flex-col gap-[0.325rem]'>
        <button><img src={btn_chat} /></button>
        <p className='text-neutral text-sm text-center'>채팅하기</p>
      </div>
        <div className='flex flex-col gap-[0.325rem]'>
          <button className='group'>
              <img src={btn_apply} />
              <PrequisiteTooltip />
          </button>
          <p className='text-neutral text-sm text-center'>지원하기</p>
        </div>
    </div>
  );
};

export default BandApplyBox;