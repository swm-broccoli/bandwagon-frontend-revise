import React, { Dispatch, SetStateAction, TouchEventHandler, useEffect, useState } from 'react';
import btn_pre from '../assets/btn_pre.svg';
import btn_next from '../assets/btn_next.svg';
import { useSearchPostStore } from '../stores/SearchPostStore';

function PageButton (props: {
  pageNum: number,
  isClicked: boolean,
  setCurrentPage: Dispatch<SetStateAction<number>>
}) {

  function handleClick () {
    console.log('page num', props.pageNum);
    props.setCurrentPage(props.pageNum - 1);
  };

  return (
    <>
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
    </>
  );
};

function Pagination (props: {
  type: boolean,
  totalPage: number
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [firstPage, setfirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const {changePage} = useSearchPostStore();

  useEffect(() => {
    console.log('total page', props.totalPage);
    if (props.totalPage < 10 && props.totalPage !== -1) {
        setLastPage(props.totalPage);
    } else if (props.totalPage >= 10) {
      setLastPage(9);
    }
  }, [props.totalPage]);

  useEffect(() => {
    if (props.totalPage > 10) {
      if (currentPage - 4 < 0) {
        setfirstPage(0);
        setLastPage(9);
      } else {
        if (currentPage + 5 > props.totalPage) {
          setfirstPage(props.totalPage - 9);
          setLastPage(props.totalPage);
        } else {
          setfirstPage(currentPage - 4)
          setLastPage(currentPage + 5);
        }
      }
    }

    changePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [props.type]);

  function ButtonList () {
    const list = [];
  
    for (let i = firstPage; i <= lastPage; i++) {
      list.push(<li key={i} className='w-5 h-5'>
        <PageButton
        pageNum={i + 1}
        isClicked={currentPage == i ? true : false}
        setCurrentPage={setCurrentPage} />
      </li>);
    }
    return list;
  }  
  
  return (
    <div className='flex flex-row justify-center'>
      <button
        onClick={(e) => {
          if (currentPage > 0) setCurrentPage(currentPage - 1)}}
        className='flex flex-row items-center mt-1 mr-7'>
        <img src={btn_pre} className='mr-1.5 w-auto h-auto' />
        <div className='text-[#b9b9b9] text-xs'>??????</div>
      </button>
      <ul className='flex flex-row items-center content-center gap-2'>
        {ButtonList()}
      </ul>
      <button
        onClick={(e) => {
          if (currentPage < props.totalPage) setCurrentPage(currentPage + 1)}}
        className='flex flex-row items-center mt-1 ml-7'>
        <div className='text-[#b9b9b9] text-xs'>??????</div>
        <img src={btn_next} className='ml-1.5' />
      </button>
    </div>
  );
};

export default Pagination