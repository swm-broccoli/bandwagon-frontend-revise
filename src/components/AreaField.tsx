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
      <div className='mr-2'>
        {`${area.city} ${area.district} `}
        <button onClick={deleteArea}>X</button>
      </div>
    );
  } else {
    return <div className='mr-2'>{`${area.city} ${area.district}`}</div>;
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
          setAreas(areas.concat(curAreaOption));
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
}: {
  label: string;
  areas: AreaType[];
  setAreas: (areas: AreaType[]) => void;
  options: AreaType[];
}) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className='form-control h-10 w-full flex flex-row justify-between items-center my-2'>
        <div className='flex w-4/5 flex-row justify-start'>
          <label className='label w-1/4 py-0'>
            <span className='label-text text-accent'>{label}</span>
          </label>
          <div className='flex flex-row items-center h-10 w-3/4 mr-2 text-accent'>
            {areas.map((area, index) => (
              <AreaFieldItem
                key={index}
                area={area}
                editing={editing}
                deleteArea={() => {
                  setAreas(areas.filter((_, i) => i !== index));
                }}
              />
            ))}
          </div>
        </div>

        <AreaFieldAddButton
          label={label}
          editing={editing}
          areas={areas}
          setAreas={setAreas}
          options={options}
        />
        <button
          onClick={() => {
            setEditing((prev) => !prev);
          }}
          className='btn btn-sm bg-base-100 hover:bg-base-200 border-base-200 text-accent h-8 w-14 p-0'
        >
          {editing ? '완료' : '수정'}
        </button>
      </div>
      <div className='divider m-0' />
    </>
  );
}

export default AreaField;
