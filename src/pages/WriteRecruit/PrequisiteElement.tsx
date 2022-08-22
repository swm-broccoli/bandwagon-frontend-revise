import React, { useEffect, useState } from 'react';
import positionOptions from '../../assets/options/positionOptions';
import genreOptions from '../../assets/options/genreOptions';
import Select from '../../components/Select';
import btn_x from '../../assets/btn_x.svg'
import AreaSelect from '../../components/AreaSelect';
import { useBandRequirementStore } from '../../stores/BandRequirementStore';
import { AreaType, PrequisiteElementType, SelectionType } from '../../types/types';
import areaOptions from '../../assets/options/areaOptions';
import { useParams } from 'react-router-dom';

function PositionPrequisiteElement (props: {id: number, type: string}) {
  const [position, setPosition] = useState<SelectionType>({
    id: 0,
    name: ''});
  const {positionStore, changePosition} = useBandRequirementStore();

  useEffect(() => {
    function findPreq(element: PrequisiteElementType) {
      if (element.preqId == props.id) return true;
    }

    function findOption(element: SelectionType) {
      if (element.id == curPreq?.id) return true;
    }

    const curPreq = positionStore.find(findPreq);
    const curOption = positionOptions.find(findOption);

    if (curOption) setPosition(curOption);
  }, [])

  useEffect(() => {
    if (position.id) changePosition(props.id, position.id)
  }, [position]);

  return (
    <div className='flex gap-7 items-center'>
      <Select
        label='세션 선택'
        curOption={position}
        options={positionOptions}
        setOption={setPosition} />
      <p className='text-accent text-base'>를 연주</p>
      <DeleteButton id={props.id} type={props.type}/>
    </div>
  );
};

function AgePrequisiteElement (props: {id: number, type: string}) {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const {preqId, minStore, maxStore, changeAge} = useBandRequirementStore();

  useEffect(() => {
    if (preqId.age) {
      if (minStore) setMin(minStore.toString())
      if (maxStore) setMax(maxStore.toString());
    }
  }, [preqId.age])

  useEffect(() => {
    if (min && max) {
      changeAge(parseInt(min), parseInt(max));
    } else if (min) {
      changeAge(parseInt(min), null);
    } else if (max) {
      changeAge(null, parseInt(max));
    }
  }, [min, max]);

  return (
    <div className='flex flex-wrap gap-3 items-center'>
      <input       
      placeholder='최소 나이 입력'
      className='input input-bordered w-fit h-[3.125rem] focus:outline-none focus:border-primary text-accent text-base'
      value={min}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMin(e.target.value)}/>
      <p className='text-accent text-base'>~</p>
      <input       
      placeholder='최대 나이 입력'
      className='input input-bordered w-fit h-[3.125rem] focus:outline-none focus:border-primary text-accent text-base'
      value={max}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMax(e.target.value)}/>
      <p className='text-accent text-base'>의 나이대</p>
      <DeleteButton id={props.id} type={props.type}/>
    </div>
  );
};

function GenderPrequisiteElement (props: {id: number, type: string}) {
  const genderOptions = [{id: 0, name: '남자'}, {id: 1, name: '여자'}]
  const [gender, setGender] = useState<SelectionType>({
    id: 0,
    name: ''});
  const {preqId, genderStore, changeGender} = useBandRequirementStore();

  useEffect(() => {
    if (preqId.gender) {
      if (genderStore) setGender(genderOptions[1])
      else setGender(genderOptions[0]);
    }
  }, [preqId])

  useEffect(() => {
    if (gender.name == '남자') {
      changeGender(false);
    } else if (gender.name == '여자') {
      changeGender(true);
    }
  }, [gender]);

  return (
    <div className='flex gap-7 items-center'>
      <Select
        label='성별 선택'
        options={genderOptions}
        curOption={gender}
        setOption={setGender}/>
      <p className='text-accent text-base'>의 성별</p>
      <DeleteButton id={props.id} type={props.type}/>
    </div>
  );
};

function AreaPrequisiteElement (props: {id: number, type: string}) {
  const [area, setArea] = useState<AreaType>({
    id: 0,
    city: '',
    district: ''
  });
  const {areaStore, changeArea} = useBandRequirementStore();

  useEffect(() => {
    function findPreq(element: PrequisiteElementType) {
      if (element.preqId == props.id) return true;
    }

    function findOption(element: AreaType) {
      if (element.id == curPreq?.id) return true;
    }

    const curPreq = areaStore.find(findPreq);
    const curOption = areaOptions.find(findOption);

    if (curOption) setArea(curOption);
  }, [])

  useEffect(() => {
    if (area.id) changeArea(props.id, area.id)
  }, [area]);

  return (
    <div className='flex gap-7 items-center'>
      <AreaSelect curOption={area} setOption={setArea}/>
      <p className='text-accent text-base'>에서 활동</p>
      <DeleteButton id={props.id} type={props.type}/>
    </div>
  );
};

function GenrePrequisiteElement (props: {id: number, type: string}) {
  const [genre, setGenre] = useState<SelectionType>({
    id: 0,
    name: ''});
  const {genreStore, changeGenre} = useBandRequirementStore();

    useEffect(() => {
      function findPreq(element: PrequisiteElementType) {
        if (element.preqId == props.id) return true;
      }
  
      function findOption(element: SelectionType) {
        if (element.id == curPreq?.id) return true;
      }
  
      const curPreq = genreStore.find(findPreq);
      const curOption = genreOptions.find(findOption);
  
      if (curOption) setGenre(curOption);
    }, [])

    useEffect(() => {
      if (genre.id) changeGenre(props.id, genre.id)
    }, [genre]);

  return (
    <div className='flex gap-7 items-center'>
      <Select
        label='장르 선택'
        options={genreOptions}
        curOption={genre}
        setOption={setGenre}/>
      <p className='text-accent text-base'>장르를 선호</p>
      <DeleteButton id={props.id} type={props.type}/>
    </div>
  );
};

function DeleteButton (props: {id: number, type: string}) {
  const {deletePrequisite} = useBandRequirementStore();

  function handleClick () {
    console.log('delete', props.id);
    deletePrequisite(props.id, props.type);
  }

  return <button onClick={handleClick}><img src={btn_x} /></button>
}

function PrequisiteElement (props: {id: number, type: string}) {
  switch (props.type) {
    case '세션':
      return <PositionPrequisiteElement id={props.id} type={props.type} />;
    case '나이':
      return <AgePrequisiteElement id={props.id} type={props.type} />;
    case '성별':
      return <GenderPrequisiteElement id={props.id} type={props.type} />;
    case '지역':
      return <AreaPrequisiteElement id={props.id} type={props.type} />;
    case '장르':
      return <GenrePrequisiteElement id={props.id} type={props.type} />;
    default:
      return (
        <></>
      )
  };
};

export default PrequisiteElement