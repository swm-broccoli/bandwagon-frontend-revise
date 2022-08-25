import { useState } from 'react';
import ProfileAddModal from './ProfileAddModal';
import { SelectionType } from '../types/types';
import TagElement from './TagElement';
import { positionToKorean } from '../assets/options/positionOptions';

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
          if (!selected.find((item) => item.id === curOption.id)) {
            // 없는 것만 추가한다
            setSelected(selected.concat(curOption));
          }
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
      <div className='mr-2 min-w-fit'>
        {label} <button onClick={deleteSelected}>{'\u2715'}</button>
      </div>
    );
  } else {
    return <TagElement tag={label} />;
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
        <div className='w-full flex flex-row justify-start'>
          <label className='label w-1/4 py-0 min-w-[60px] max-w-[120px]'>
            <span className='label-text text-accent'>{label}</span>
          </label>
          <div
            className={`flex flex-row items-center h-full w-full text-accent overflow-x-auto overflow-y-hidden`}
          >
            {selected.map((item, index) => (
              <ProfileSelectFieldItem
                key={index}
                label={item.name}
                editing={editing}
                deleteSelected={() => {
                  setSelected(
                    selected.filter((selection) => item.id !== selection.id),
                  );
                }}
              />
            ))}
          </div>
          <ProfileFieldAddButton
            label={label}
            editing={editing}
            selected={selected}
            setSelected={setSelected}
            options={options}
          />
        </div>
      </div>
      <div className='divider m-0' />
    </>
  );
}

export default ProfileSelectField;
