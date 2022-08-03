import React, { Dispatch, SetStateAction, useState } from 'react';
import btn_pre from '../assets/btn_pre.svg';
import btn_next from '../assets/btn_next.svg';

function PageButton (props: {
  pageNum: number,
  isClicked: boolean,
  setCurrentPage: Dispatch<SetStateAction<number>>
}) {
  function handleClick () {
    props.setCurrentPage(props.pageNum);
  };

  return (
    <li className='w-5 h-5'>
      {props.isClicked ?
        <button
          className='w-full h-full rounded-full bg-primary text-white text-sm font-medium'>
          {props.pageNum.toString()}
        </button> :
        <button
          className='w-full h-full text-[#6e6e6e] text-sm font-light' 
          onClick={handleClick}>
          {props.pageNum.toString()}
        </button>}
    </li>
  );
};

function Pagination (props: {
  totalPage: number
}) {
  const [currentPage, setCurruentPage] = useState(1);
  
  return (
    <div className='flex flex-row'>
      <button className='flex flex-row items-center mt-1 mr-7'>
        <img src={btn_pre} className='mr-1.5 w-auto h-auto' />
        <div className='text-[#b9b9b9] text-xs'>이전</div>
      </button>
      <ul className='flex flex-row items-center content-center gap-2'>
        <PageButton
          pageNum={1}
          isClicked={true}
          setCurrentPage={setCurruentPage} />
        <PageButton
          pageNum={2}
          isClicked={false}
          setCurrentPage={setCurruentPage} />
      </ul>
      <button className='flex flex-row items-center mt-1 ml-7'>
        <div className='text-[#b9b9b9] text-xs'>다음</div>
        <img src={btn_next} className='ml-1.5' />
      </button>
    </div>
  );
};

export default Pagination