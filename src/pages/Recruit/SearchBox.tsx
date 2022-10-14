import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Select from '../../components/Select';
import genreOptions from '../../assets/options/genreOptions';
import btn_x from '../../assets/btn_x.svg';
import AreaSelect from '../../components/AreaSelect';
import positionOptions from '../../assets/options/positionOptions';
import { useSearchPostStore } from '../../stores/SearchPostStore';
import { AreaType, SelectionType } from '../../types/types';
import weekdayOptions from '../../assets/options/weekdayOptions';

function SearchTextField () {
  const [title, setTitle] = useState<string>('');
  const {changeTitle} = useSearchPostStore();

  useEffect(() => {
    changeTitle(title);
  }, [title]);

  return (
    <input
      placeholder='검색어를 입력하세요'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className='input input-bordered w-full max-w-[40rem] h-full focus:outline-none focus:border-primary text-accent text-base'/>
  );
};

function ConditionLabel (props: {label: string, row: string}) {
  const pStyle = 'row-start-' + props.row + ' col-start-1 hidden md:flex text-base text-accent mt-3 mr-3 max-w-[7.25rem] min-w-max'
  return (
    <p className={pStyle}>{props.label}</p>
  );
};

function SelectAnyCondition (props: {type: string}) {
  const {changeAnyStore} = useSearchPostStore();

  function handleClick (e: React.MouseEvent<HTMLInputElement>) {
    changeAnyStore(props.type);
  }

  return (
    <div className='flex gap-2 items-center ml-3'>
      <input type='checkbox' onClick={handleClick} className='checkbox' />
      <p className='flex text-sm text-[#888888]'>조건 무관</p>
    </div>
  )
}

function SelectSessionButton (props: {
  label: SelectionType}) {
  const [clicked, setClicked] = useState<boolean>(false);
  const {
    addSelectStore,
    deleteSelectStore} = useSearchPostStore();

  useEffect(() => {
    if (clicked) {
      addSelectStore('position', props.label.id);
    } else {
      deleteSelectStore('position', props.label.id);
    }
  }, [clicked]);

  return (
    <>
    {clicked ?
      <button
        className='w-28 h-[3.125rem] md:w-36 text-base text-primary font-medium border border-primary border-solid rounded-lg bg-success'
        onClick={(e) => setClicked(false)}>
        {props.label.name}
      </button> :
      <button
        className='w-28 h-[3.125rem] md:w-36 text-base text-[#888888] border border-solid border-base-200 rounded-lg bg-white'
        onClick={(e) => setClicked(true)}>
        {props.label.name}
      </button>}
    </>
  );
};

function SelectPracticeDayButton (props: {
  label: SelectionType}) {
  const [clicked, setClicked] = useState<boolean>(false);
  const {
    addSelectStore,
    deleteSelectStore} = useSearchPostStore();

  useEffect(() => {
    if (clicked) {
      addSelectStore('day', props.label.id);
    } else {
      deleteSelectStore('day', props.label.id);
    }
  }, [clicked]);

  return (
    <>
    {clicked ?
      <button
        className='w-12 h-[3.125rem] md:w-20 text-base text-primary font-medium border border-primary border-solid rounded-lg bg-success'
        onClick={(e) => setClicked(false)}>
        {props.label.name}
      </button> :
      <button
        className='w-12 h-[3.125rem] md:w-20 text-base text-[#888888] border border-solid border-base-200 rounded-lg bg-white'
        onClick={(e) => setClicked(true)}>
        {props.label.name}
      </button>}
    </>
  );
};

function SelectGenderButton (props: {
  label: {type: string, name: string}}) {
  const [clicked, setClicked] = useState<boolean>(false);
  const {
    addGender,
    deleteGender} = useSearchPostStore();

  useEffect(() => {
    if (clicked) {
      addGender('gender', props.label.type);
    } else {
      deleteGender('gender', props.label.type);
    }
  }, [clicked]);

  return (
    <>
    {clicked ?
      <button
        className='w-16 h-[3.125rem] md:w-24 text-base text-primary font-medium border border-primary border-solid rounded-lg bg-success'
        onClick={(e) => setClicked(false)}>
        {props.label.name}
      </button> :
      <button
        className='w-16 h-[3.125rem] md:w-24 text-base text-[#888888] border border-solid border-base-200 rounded-lg bg-white'
        onClick={(e) => setClicked(true)}>
        {props.label.name}
      </button>}
    </>
  );
};

function SelectSession () {
  return (
    <ul className='row-start-3 col-start-1 col-end-3 md:col-start-2 flex flex-row flex-wrap gap-[0.625rem]'>
      {positionOptions.map((position, index) => 
      <li key={index}>
        <SelectSessionButton label={position} />
      </li>)}
      <SelectAnyCondition type='session'/>
    </ul>
  )
}

function SelectGenre () {
  const [genre, setGenre] = useState<SelectionType>({id: 0, name: ''});
  const {
    selectStore,
    genreArray,
    addSelectStore,
    deleteSelectStore,
    addGenre,
    deleteGenre} = useSearchPostStore();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (selectStore.find((e) => e.type == 'genre' && e.id == genre.id.toString())) {
      window.alert('이미 추가된 조건입니다!');
    } else {
      addGenre(genre);
      addSelectStore('genre', genre.id);
    }
  }

  return (
    <div className='flex flex-col flex-wrap gap-4 row-start-4 col-start-1 col-end-3 md:col-start-2'>
      <div className='flex flex-row flex-wrap gap-[0.625rem]'>
        <Select
          label='장르를 선택하세요'
          options={genreOptions}
          curOption={genre}
          setOption={setGenre} />
        <Button
          label='+ 추가'
          x='w-20 '
          y='h-[3.125rem] '
          textSize='text-base'
          onclick={handleClick} />
        <SelectAnyCondition type='genre'/>
      </div>
      <ul className='flex flex-wrap gap-4'>
        {genreArray.map((genre, index) =>
          <li key={index} className='flex flex-row gap-[0.625rem]'>
            <div className='text-base text-accent'>{genre.name}</div>
            <button onClick={(e) => {
              deleteSelectStore('genre', genre.id);
              deleteGenre(genre.id)}}>
              <img src={btn_x} />
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

function SelectAge () {
  const [minAge, setMinAge] = useState<string>('');
  const [maxAge, setMaxAge] = useState<string>('');
  const {changeMinAge, changeMaxAge} = useSearchPostStore();

  useEffect(() => {
    changeMinAge(minAge);
    changeMaxAge(maxAge);
  }, [minAge, maxAge]);

  return (
    <div className='row-start-5 col-start-1 col-end-3 md:col-start-2 flex flex-row flex-wrap gap-[0.625rem] w-full h-fit items-center'>
      <input
      placeholder='최소 나이 입력'
      value={minAge}
      onChange={((e) => setMinAge(e.target.value))}
      className='input input-bordered w-fit h-[3.125rem] focus:outline-none focus:border-primary text-accent text-base'/>
      <div className='text-base text-[#ababab]'>~</div>
      <input
      placeholder='최대 나이 입력'
      value={maxAge}
      onChange={((e) => setMaxAge(e.target.value))}
      className='input input-bordered w-fit h-[3.125rem] focus:outline-none focus:border-primary text-accent text-base'/>
    </div>
  )
}

function SelectArea () {
  const [area, setArea] = useState<AreaType>({
    id: 0,
    city: '',
    district: ''});
  const {
    selectStore,
    areaArray,
    addSelectStore,
    deleteSelectStore,
    addArea,
    deleteArea} = useSearchPostStore();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (selectStore.find((e) => e.type == 'area' && e.id == area.id.toString())) {
      window.alert('이미 추가된 조건입니다!');
    } else {
      addArea(area);
      addSelectStore('area', area.id);
    }
  }

  return (
    <div className='flex flex-col flex-wrap gap-4 row-start-6 col-start-1 col-end-3 md:col-start-2'>
      <div className='flex flex-row flex-wrap gap-[0.625rem]'>
        <AreaSelect curOption={area} setOption={setArea} />
        <Button
          label='+ 추가'
          x='w-20 '
          y='h-[3.125rem] '
          textSize='text-base'
          onclick={handleClick} />
        <SelectAnyCondition type='area'/>
      </div>
      <ul className='flex flex-wrap gap-4'>
        {areaArray.map((area, index) =>
          <li key={index} className='flex flex-row gap-[0.625rem]'>
            <div className='text-base text-accent'>
              {area.city + ' ' + area.district}
            </div>
            <button onClick={(e) => {
              deleteSelectStore('area', area.id);
              deleteArea(area.id)}}>
              <img src={btn_x} />
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

function SelectPracticeDay () {
  return (
    <ul className='row-start-7 col-start-1 col-end-3 md:col-start-2 flex flex-row flex-wrap gap-[0.625rem]'>
      {weekdayOptions.map((day, index) => 
      <li key={index}>
        <SelectPracticeDayButton label={day} />
      </li>)}
    </ul>
  )
}

function SelectGender () {
  const genderOptions = [
    {type: 'false', name: '남자'},
    {type: 'true', name: '여자'}];

  return (
    <ul className='row-start-7 col-start-1 col-end-3 md:col-start-2 flex flex-row flex-wrap gap-[0.625rem]'>
      {genderOptions.map((gender, index) => 
      <li key={index}>
        <SelectGenderButton label={gender} />
      </li>)}
    </ul>
  )
}

function SearchBox (props: {
  type: boolean,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void}) {
  return (
    <div className='w-full h-fit row-start-2 col-start-2 col-end-4 grid auto-rows-auto grid-cols-[minmax(auto,_116px)_auto] gap-4 p-4 md:p-10 max-w-7xl border border-solid border-base-200 rounded-xl bg-white mt-5'>
      <div className='flex flex-row gap-3 row-start-1 col-start-1 col-end-3 w-full h-[3.125rem]'>
        <SearchTextField />
        <Button
          label='조회'
          x='w-[6.25rem] '
          y='h-full '
          textSize='text-base'
          onclick={props.onClick} />
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
      {props.type ?
        <ConditionLabel label='합주 요일' row='7' /> :
        <ConditionLabel label='성별' row='7' />
      }
      {props.type ?
        <SelectPracticeDay /> :
        <SelectGender />
      }
    </div>
  );
};

export default SearchBox;