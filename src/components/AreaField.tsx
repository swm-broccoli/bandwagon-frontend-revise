import { AreaType } from '../types/types';
import { useState } from 'react';
import ProfileAddModal from './ProfileAddModal';

function AreaFieldItem({
  area,
  editing,
  deleteArea,
}: {
  area: AreaType;
  editing: boolean;
  deleteArea: () => void;
}) {
  if (editing) {
    return (
      <div className='mr-2 min-w-max'>
        {`${area.city} ${area.district} `}
        <button onClick={deleteArea}>{'\u2715'}</button>
      </div>
    );
  } else {
    return (
      <div className='badge badge-outline min-w-max py-3 px-3 mr-2'>{`${area.city} ${area.district}`}</div>
    );
  }
}

function AreaFieldAddButton({
  label,
  editing,
  areas,
  setAreas,
  options,
}: {
  label: string;
  editing: boolean;
  areas: AreaType[];
  setAreas: (areas: AreaType[]) => void;
  options: AreaType[];
}) {
  const [curAreaOption, setCurAreaOption] = useState<AreaType>(options[0]);

  const cityOptions = options
    .map((area) => area.city)
    .filter((city, index, self) => self.indexOf(city) === index);

  if (!editing) {
    return null;
  } else {
    return (
      <ProfileAddModal
        label={`${label} 추가`}
        addSelected={() => {
          if (!areas.find((item) => item.id === curAreaOption.id)) {
            // 없는 것만 추가한다
            setAreas(areas.concat(curAreaOption));
          }
        }}
      >
        <div className='flex flex-row w-full justify-center'>
          <select
            value={curAreaOption.city}
            onChange={(e) =>
              setCurAreaOption(
                options.find((option) => option.city === e.target.value) ||
                  options[0],
              )
            }
            className='select select-bordered w-1/2 mx-2'
          >
            {cityOptions.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={curAreaOption.district}
            onChange={(e) => {
              setCurAreaOption(
                options.find(
                  (option) =>
                    option.city === curAreaOption.city &&
                    option.district === e.target.value,
                ) || options[0],
              );
            }}
            className='select select-bordered w-1/2 mx-2'
          >
            {options
              .filter((area) => {
                return area.city === curAreaOption.city;
              })
              .map((area, index) => (
                <option key={index} value={area.district}>
                  {area.district}
                </option>
              ))}
          </select>
        </div>
      </ProfileAddModal>
    );
  }
}

function AreaField({
  label,
  areas,
  setAreas,
  options,
  editing,
}: {
  label: string;
  areas: AreaType[];
  setAreas: (areas: AreaType[]) => void;
  options: AreaType[];
  editing: boolean;
}) {
  return (
    <>
      <div className='relative form-control h-10 w-full flex flex-row justify-start items-center my-2'>
        <div className='flex w-full flex-row justify-start'>
          <label className='label w-1/4 min-w-[60px] max-w-[120px] py-0'>
            <span className='label-text text-accent'>{label}</span>
          </label>
          <div className='h-full flex flex-row items-center w-full mr-2 text-accent overflow-x-auto'>
            {areas.map((area, index) => (
              <AreaFieldItem
                key={index}
                area={area}
                editing={editing}
                deleteArea={() => {
                  setAreas(areas.filter((_area) => _area.id !== area.id));
                }}
              />
            ))}
          </div>
          <AreaFieldAddButton
            label={label}
            editing={editing}
            areas={areas}
            setAreas={setAreas}
            options={options}
          />
        </div>
      </div>

      <div className='divider m-0' />
    </>
  );
}

export default AreaField;
