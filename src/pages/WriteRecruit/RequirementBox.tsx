import React, { useState } from 'react';
import ProfileAddModal from '../../components/ProfileAddModal';
import Select from '../../components/Select';
import PrequisiteElement from './PrequisiteElement';

function BandPrequisitesCard () {
  const options = [
    {id: 1, name: '세션'},
    {id: 2, name: '나이'},
    {id: 3, name: '성별'},
    {id: 4, name: '지역'},
    {id: 5, name: '장르'}];
  const [option, setOption] = useState('');
  const [prequisites, setPrequisites] = useState<string[]>([]);

  return (
    <div className='w-full h-fit flex flex-col bg-white border border-solid border-[#e5e5e5] rounded-xl p-5 gap-5'>
      <div className='grid grid-cols-2 items-center'>
        <h3 className='col-start-1 text-accent text-base'>지원 조건</h3>
        <div className='col-start-2 justify-self-end'>
          <ProfileAddModal
            label='지원 조건 추가'
            addSelected={() => {
              console.log(prequisites, option);
              setPrequisites([...prequisites, option]);}}
            children={
              <Select label='추가할 지원 조건을 선택하세요' options={options} setOption={setOption} />
            } />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
          {prequisites.map((prequisite, index) =>
          <div key={index}>
            <PrequisiteElement type={prequisite} />
          </div>)}
        </div>
    </div>
  );
};

function BandFormCard () {
  return (
    <div className='w-full h-fit flex flex-col bg-white border border-solid border-[#e5e5e5] rounded-xl p-5'>
      <div className='grid grid-cols-2 items-center'>
        <h3 className='col-start-1 text-accent text-base'>추가 지원 양식</h3>
        <div className='col-start-2 justify-self-end'>
          <label
          className='btn btn-primary btn-sm h-8 w-14 mr-1 p-0'
          >
          +추가</label>
        </div>
      </div>
    </div>
  );
};

function RequirementBox () {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-accent text-base'>모집 정보</h3>
      <BandPrequisitesCard />
      <BandFormCard />
    </div>
  );
};

export default RequirementBox;