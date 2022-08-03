import { useState } from 'react';
import ProfileAddModal from './ProfileAddModal';
import { SelectionType } from '../types/types';

function ProfileFieldAddButton({
  label,
  editing,
  selected,
  setSelected,
  options,
}: {
  label: string;
  editing: boolean;
  selected: SelectionType[];
  setSelected: (selected: SelectionType[]) => void;
  options: SelectionType[];
}) {
  const [curOption, setCurOption] = useState<SelectionType>(options[0]);

  if (!editing) {
    return null;
  } else {
    return (
      <ProfileAddModal
        label={`${label} 추가`}
        addSelected={() => {
          setSelected(selected.concat(curOption));
        }}
      >
        <select
          value={JSON.stringify(curOption)}
          onChange={(e) => setCurOption(JSON.parse(e.target.value))}
          className='select select-bordered w-full'
        >
          {options.map((option, index) => (
            <option key={index} value={JSON.stringify(option)}>
              {option.name}
            </option>
          ))}
        </select>
      </ProfileAddModal>
    );
  }
}

function ProfileSelectFieldItem({
  label,
  editing,
  deleteSelected,
}: {
  label: string;
  editing: boolean;
  deleteSelected: () => void;
}) {
  if (editing) {
    return (
      <div className='mr-2'>
        {label} <button onClick={deleteSelected}>X</button>
      </div>
    );
  } else {
    return <div className='mr-2'>{label}</div>;
  }
}

function ProfileSelectField({
  label,
  selected,
  setSelected,
  options,
  editing,
}: {
  label: string;
  selected: SelectionType[];
  setSelected: (selected: SelectionType[]) => void;
  options: SelectionType[];
  editing: boolean;
}) {
  return (
    <>
      <div className='form-control h-10 w-full flex flex-row justify-between items-center my-2'>
        <div className='w-4/5 flex flex-row justify-start'>
          <label className='label w-1/4 py-0'>
            <span className='label-text text-accent'>{label}</span>
          </label>
          <div className='flex flex-row items-center h-10 w-3/4 text-accent'>
            {selected.map((item, index) => (
              <ProfileSelectFieldItem
                key={index}
                label={item.name}
                editing={editing}
                deleteSelected={() => {
                  setSelected(selected.filter((_, i) => i !== index));
                }}
              />
            ))}
          </div>
        </div>

        <ProfileFieldAddButton
          label={label}
          editing={editing}
          selected={selected}
          setSelected={setSelected}
          options={options}
        />
      </div>
      <div className='divider m-0' />
    </>
  );
}

export default ProfileSelectField;
