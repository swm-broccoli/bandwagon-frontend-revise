import React from "react";
import Button from "../../components/Button";
import Select from "../../components/Select";
import btn_x from '../../assets/btn_x.svg';

const sessionList = ['보컬', '기타', '베이스', '키보드', '드럼'];
const genreList = ['Pop', 'Rock', 'Metal'];
const ageList = ['10대 후반', '20대 초반', '20대 후반', '30대 초반', '30대 후반', '40대 초반', '40대 후반'];
const provinceList = ['서울특별시', '인천광역시', '경기도'];
const cityList = ['강남구', '연수구', '성남시'];
const practiceDayList = ['월', '화', '수', '목', '금', '토', '일'];

function SearchTextField () {
  return (
    <input
      placeholder='검색어를 입력하세요'
      className='input input-bordered w-full max-w-[40rem] h-full focus:outline-none focus:border-primary text-accent text-base'/>
  );
};

function ConditionLabel (props: {label: string, row: string}) {
  const pStyle = 'row-start-' + props.row + ' col-start-1 text-base text-accent mt-3 mr-3 max-w-[7.25rem] min-w-max'
  return (
    <p className={pStyle}>{props.label}</p>
  );
};

function SelectSessionButton (props: {
  label: string,
  clicked: boolean}) {

  return (
    <>
    {props.clicked ?
      <button className='w-28 h-[3.125rem] md:w-36 text-base text-primary font-medium border border-primary border-solid rounded-lg bg-success'>
      {props.label}
      </button> :
      <button className='w-28 h-[3.125rem] md:w-36 text-base text-[#888888] border border-solid border-base-200 rounded-lg bg-white'>
      {props.label}
      </button>}
    </>
  );
};

function SelectPracticeDayButton (props: {
  label: string,
  clicked: boolean}) {

  return (
    <>
    {props.clicked ?
      <button className='w-12 h-[3.125rem] md:w-20 text-base text-primary font-medium border border-primary border-solid rounded-lg bg-success'>
      {props.label}
      </button> :
      <button className='w-12 h-[3.125rem] md:w-20 text-base text-[#888888] border border-solid border-base-200 rounded-lg bg-white'>
      {props.label}
      </button>}
    </>
  );
};

function SelectSession () {
  return (
    <ul className='row-start-3 col-start-2 flex flex-row flex-wrap gap-[0.625rem]'>
      {sessionList.map((session, index) => 
      <li key={index}><SelectSessionButton label={session} clicked={true} /></li>)}
    </ul>
  )
}

function SelectGenre () {
  return (
    <div className='flex flex-col flex-wrap gap-4 row-start-4 col-start-2'>
      <div className='flex flex-row flex-wrap gap-[0.625rem]'>
        <Select label='장르를 선택하세요' options={genreList} />
        <Button label='+ 추가' x='w-20 ' y='h-[3.125rem] ' textSize='text-base' />
      </div>
      <ul>
        <li className='flex flex-row gap-[0.625rem]'>
          <div className='text-base text-accent'>어쿠스틱</div>
          <img src={btn_x} />
        </li>
      </ul>
    </div>
  )
}

function SelectAge () {
  return (
    <div className='flex flex-row flex-wrap gap-[0.625rem] items-center row-start-5 col-start-2'>
        <Select label='연령대를 선택하세요' options={ageList} />
        <div className='text-base text-[#ababab]'>~</div>
        <Select label='연령대를 선택하세요' options={ageList} />
    </div>
  )
}

function SelectArea () {
  return (
    <div className='flex flex-col flex-wrap gap-4 row-start-6 col-start-2'>
      <div className='flex flex-row flex-wrap gap-[0.625rem]'>
        <Select label='시/도 선택하세요' options={provinceList} />
        <Select label='시/군/구 선택하세요' options={cityList} />
        <Button label='+ 추가' x='w-20 ' y='h-[3.125rem] ' textSize='text-base' />
      </div>
      <ul>
        <li className='flex flex-row gap-[0.625rem]'>
          <div className='text-base text-accent'>강남구</div>
          <img src={btn_x} />
        </li>
      </ul>
    </div>
  )
}

function SelectPracticeDay () {
  return (
    <ul className='row-start-7 col-start-2 flex flex-row flex-wrap gap-[0.625rem]'>
      {practiceDayList.map((day, index) => 
      <li key={index}><SelectPracticeDayButton label={day} clicked={false} /></li>)}
    </ul>
  )
}

function SearchBox () {
  return (
    <div className='w-full h-fit row-start-2 col-start-2 col-end-4 grid grid-row-[50px_9px_repeat(5,_minmax(50px,_auto))] grid-cols-[minmax(auto,_116px)_auto] gap-4 p-10 max-w-7xl border border-solid border-base-200 rounded-xl bg-white mt-5'>
      <div className='flex flex-row gap-3 row-start-1 col-start-1 col-end-3 w-full h-[3.125rem]'>
        <SearchTextField />
        <Button label='조회' x='w-[6.25rem] ' y='h-full ' textSize='text-base' />
      </div>
      <div className='row-start-2 col-start-1 col-end-3 w-full h-px bg-[#e2e2e2] my-1' />
      <ConditionLabel label='세션' row='3' />
      <SelectSession />
      <ConditionLabel label='장르' row='4' />
      <SelectGenre />
      <ConditionLabel label='연령' row='5' />
      <SelectAge />
      <ConditionLabel label='장소' row='6' />
      <SelectArea />
      <ConditionLabel label='합주 요일' row='7' />
      <SelectPracticeDay />
    </div>
  );
};

export default SearchBox;