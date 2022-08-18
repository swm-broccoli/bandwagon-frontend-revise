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
    props.setCurrentPage(props.pageNum - 1);
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
  type: boolean,
  totalPage: number
}) {
  const [currentPage, setCurruentPage] = useState(0);
  const [firstPage, setfirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(10);
  const {changePage} = useSearchPostStore();

  useEffect(() => {
    console.log(props.totalPage);

    if (props.totalPage && props.totalPage < 10) {
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
          console.log('last');
          setfirstPage(props.totalPage - 9);
          setLastPage(props.totalPage);
        } else {
          console.log('basic');
          setfirstPage(currentPage - 4)
          setLastPage(currentPage + 5);
        }
      }
    }

    changePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurruentPage(0);
  }, [props.type]);

  function ButtonList () {
    const list = [];
  
    for (let i = firstPage; i <= lastPage; i++) {
      list.push(<PageButton
        pageNum={i + 1}
        isClicked={currentPage == i ? true : false}
        setCurrentPage={setCurruentPage} />);
    }
    return list;
  }  
  
  return (
    <div className='flex flex-row'>
      <button className='flex flex-row items-center mt-1 mr-7'>
        <img src={btn_pre} className='mr-1.5 w-auto h-auto' />
        <div className='text-[#b9b9b9] text-xs'>이전</div>
      </button>
      <ul className='flex flex-row items-center content-center gap-2'>
        {ButtonList()}
      </ul>
      <button className='flex flex-row items-center mt-1 ml-7'>
        <div className='text-[#b9b9b9] text-xs'>다음</div>
        <img src={btn_next} className='ml-1.5' />
      </button>
    </div>
  );
};

export default Pagination