import React from 'react';
import btn_like from '../../assets/btn_like.svg';
import btn_chat from '../../assets/btn_chat.svg';
import btn_apply from '../../assets/btn_apply.svg';
import ico_circle from '../../assets/ico_circle.svg';
import ico_x from '../../assets/ico_x.svg';

function PrequisiteTooltip () {
  return (
    <div className='hidden group-hover:flex flex-col gap-[0.325rem] w-60 h-fit p-4 mt-8 -ml-44 bg-white border border-solid border-[#f2f2f2] rounded-xl shadow-md absolute'>
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
      <div className='flex w-52 h-7 gap-2 pl-4 bg-[#f4f9f9] rounded-2xl items-center'>
        <img src={ico_circle} />
        <p className='text-accent text-sm'>나이 30대 초반</p>
      </div> :
      <div className='flex w-52 h-7 gap-2 bg-[#f9f4f7] pl-4 rounded-2xl items-center'>
      <img src={ico_x} />
      <p className='text-accent text-sm'>선호 장르 케이팝</p>
    </div>
    }
    </>
  )
}

function BandApplyBox () {
  return (
    <div className='row-start-4 col-start-2 flex flex-row w-full max-w-3xl h-fit justify-between p-4'>
      <div className='flex flex-col gap-[0.325rem]'>
        <button>
          <img src={btn_like} />
        </button>
        <p className='text-neutral text-sm text-center'>10</p>
      </div>
      <div className='flex flex-col gap-[0.325rem]'>
        <button>
          <img src={btn_chat} />
        </button>
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