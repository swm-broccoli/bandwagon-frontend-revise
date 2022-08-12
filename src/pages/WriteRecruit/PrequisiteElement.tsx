import React, { useEffect, useState } from 'react';
import areaOptions from '../../assets/options/areaOptions';
import positionOptions from '../../assets/options/positionOptions';
import genreOptions from '../../assets/options/genreOptions';
import Select from '../../components/Select';
import btn_x from '../../assets/btn_x.svg'
import AreaSelect from '../../components/AreaSelect';
import { useBandRequirementStore } from '../../stores/BandRequirementStore';

function PositionPrequisiteElement (props: {id: number}) {
  const [position, setPosition] = useState('');

  return (
    <div className='flex gap-7 items-center'>
      <Select label='세션 선택' options={positionOptions} setOption={setPosition}/>
      <p className='text-accent text-base'>를 연주</p>
      <button><img src={btn_x} /></button>
    </div>
  );
};

function AgePrequisiteElement (props: {id: number}) {
  return (
    <div className='flex flex-wrap gap-3 items-center'>
      <input       
      placeholder='최소 나이 입력'
      className='input input-bordered w-fit h-[3.125rem] focus:outline-none focus:border-primary text-accent text-base'/>
      <p className='text-accent text-base'>~</p>
      <input       
      placeholder='최대 나이 입력'
      className='input input-bordered w-fit h-[3.125rem] focus:outline-none focus:border-primary text-accent text-base'/>
      <p className='text-accent text-base'>의 나이대</p>
      <button><img src={btn_x} /></button>
    </div>
  );
};

function GenderPrequisiteElement (props: {id: number}) {
  const genderOptions = [{id: 0, name: '남자'}, {id: 1, name: '여자'}]
  const [gender, setGender] = useState('');

  return (
    <div className='flex gap-7 items-center'>
      <Select label='성별 선택' options={genderOptions} setOption={setGender}/>
      <p className='text-accent text-base'>의 성별</p>
      <button><img src={btn_x} /></button>
    </div>
  );
};

function AreaPrequisiteElement (props: {id: number}) {
  const [area, setArea] = useState('');

  return (
    <div className='flex gap-7 items-center'>
      <AreaSelect setOption={setArea}/>
      <p className='text-accent text-base'>에서 활동</p>
      <button><img src={btn_x} /></button>
    </div>
  );
};

function GenrePrequisiteElement (props: {id: number}) {
  const [genre, setGenre] = useState('');

  return (
    <div className='flex gap-7 items-center'>
      <Select label='장르 선택' options={genreOptions} setOption={setGenre}/>
      <p className='text-accent text-base'>장르를 선호</p>
      <button><img src={btn_x} /></button>
    </div>
  );
};

function PrequisiteElement (props: {id: number, type: string}) {
  switch (props.type) {
    case '세션':
      return <PositionPrequisiteElement id={props.id}/>;
    case '나이':
      return <AgePrequisiteElement id={props.id}/>;
    case '성별':
      return <GenderPrequisiteElement id={props.id}/>;
    case '지역':
      return <AreaPrequisiteElement id={props.id}/>;
    case '장르':
      return <GenrePrequisiteElement id={props.id}/>;
    default:
      return (
        <></>
      )
  };
};

export default PrequisiteElement