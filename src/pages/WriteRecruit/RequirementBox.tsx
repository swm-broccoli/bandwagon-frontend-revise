import React from 'react';
import ProfileAddModal from '../../components/ProfileAddModal';
import Select from '../../components/Select';

function BandPrequisitesCard () {
  const options = ['세션', '나이', '성별', '지역', '장르'];

  return (
    <div className='w-full h-fitflex flex-col bg-white border border-solid border-[#e5e5e5] rounded-xl p-5'>
      <div className='grid grid-cols-2 items-center'>
        <h3 className='col-start-1 text-accent text-base'>지원 조건</h3>
        <div className='col-start-2 justify-self-end'><ProfileAddModal label='지원 조건 추가' addSelected={() => console.log('add')} children={<Select label='추가할 지원 조건을 선택하세요' options={options}/>} /></div>
      </div>
    </div>
  );
};

function BandFormCard () {
  return (
    <div className='w-full h-fitflex flex-col bg-white border border-solid border-[#e5e5e5] rounded-xl p-5'>
      <div className='grid grid-cols-2 items-center'>
        <h3 className='col-start-1 text-accent text-base'>추가 지원 양식</h3>
        <div className='col-start-2 justify-self-end'>
          <label
          className='btn btn-primary btn-sm h-8 w-14 mr-1 p-0 modal-button'
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