import React, { Dispatch, SetStateAction, useState } from 'react';
import areaOptions from '../assets/options/areaOptions';

function AreaSelect (props:
  {setOption: Dispatch<SetStateAction<string>>}) {

  const [city, setCity] = useState('');
  const cityOptions = areaOptions
  .map((area) => area.city)
  .filter((city, index, self) => self.indexOf(city) === index);

  function handleCityChange (e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setCity(e.target.value);
  }

  function handleDistrictChange (e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    props.setOption(e.target.value);
  }

  return (
    <div className='flex'>
      <select
        className='select select-bordered w-fit md:w-48 h-[3.125rem]' onChange={handleCityChange}>
        <option disabled selected>시/도 선택</option>
        {cityOptions.map((option, index) =>
          <option
           key={index}
           value={option}>
             {option}
          </option>)}
      </select>

      <select
        className='select select-bordered w-fit md:w-48 h-[3.125rem]' onChange={handleDistrictChange}>
        <option disabled selected>시/군/구 선택</option>
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