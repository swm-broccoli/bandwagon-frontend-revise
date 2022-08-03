import { useState } from 'react';
import ProfileAddModal from './ProfileAddModal';

function ProfileFieldAddButton({
  label,
  editing,
  selected,
  setSelected,
  options,
}: {
  label: string;
  editing: boolean;
  selected: string[];
  setSelected: (selected: string[]) => void;
  options: string[];
}) {
  const [curOption, setCurOption] = useState(options[0]);

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
          value={curOption}
          onChange={(e) => setCurOption(e.target.value)}
          className='select select-bordered w-full'
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </ProfileAddModal>
    );
  }
}

function ProfileFieldEditButton({
  editing,
  toggleEditing,
}: {
  editing: boolean;
  toggleEditing: () => void;
}) {
  return (
    <button
      onClick={toggleEditing}
      className='btn btn-sm bg-base-100 hover:bg-base-200 border-base-200 text-accent h-8 w-14 p-0'
    >
      {editing ? '완료' : '수정'}
    </button>
  );
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
  name,
  selected,
  setSelected,
  options,
}: {
  label: string;
  name: string;
  selected: string[];
  setSelected: (selected: string[]) => void;
  options: string[];
}) {
  const [editing, setEditing] = useState(false);

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
                label={item}
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
        <ProfileFieldEditButton
          editing={editing}
          toggleEditing={() => {
            setEditing((prev) => !prev);
          }}
        />
      </div>
      <div className='divider m-0' />
    </>
  );
}

export default ProfileSelectField;
