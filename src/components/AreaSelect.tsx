import React, { Dispatch, SetStateAction, useState } from 'react';
import areaOptions from '../assets/options/areaOptions';
import { AreaType } from '../types/types';

function AreaSelect (props:
  {setOption: Dispatch<SetStateAction<AreaType>>}) {

  const [city, setCity] = useState('');
  const cityOptions = areaOptions
  .map((area) => area.city)
  .filter((city, index, self) => self.indexOf(city) === index);

  function handleCityChange (e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setCity(e.target.value);
  }

  function handleDistrictChange (e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = areaOptions.find(findOption);

    function findOption(element: AreaType)  {
      if(element.city === city && element.district === e.target.value)  {
        return true;
      }
    }

    console.log(selected);
    if (selected) props.setOption(selected);
  }

  return (
    <div className='flex'>
      <select
        defaultValue=''
        className='select select-bordered w-fit md:w-48 h-[3.125rem]'
        onChange={handleCityChange}>
        <option className='hidden' value=''>시/도 선택</option>
        {cityOptions.map((option, index) =>
          <option
           key={index}
           value={option}>
             {option}
          </option>)}
      </select>

      <select
        defaultValue=''
        className='select select-bordered w-fit md:w-48 h-[3.125rem]' onChange={handleDistrictChange}>
          <option className='hidden' value=''>시/군/구 선택</option>
          {areaOptions
            .filter(option => option.city === city)
            .map((option, index) => (
              <option key={index} value={option.district}>
                {option.district}
              </option>))}
      </select>
    </div>
  );
};

export default AreaSelect;