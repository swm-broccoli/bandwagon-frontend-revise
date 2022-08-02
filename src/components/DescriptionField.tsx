import { useState } from 'react';

function DescriptionField({
  label,
  description,
  setDescription,
}: {
  label: string;
  description: string;
  setDescription: (newDescription: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);

  return (
    <div className='w-full grid grid-flow-row mt-5'>
      <label className='label min-w-[52px] p-0 pl-1 justify-between'>
        <span className='label-text text-accent w-4/5 mr-2'>{label}</span>
        <button
          onClick={() => {
            if (editing) {
              //저장
              setDescription(newDescription);
            }
            setEditing(!editing);
          }}
          className='btn btn-sm bg-base-100 hover:bg-base-200 border-base-200 text-accent h-8 w-14 p-0'
        >
          {editing ? '완료' : '수정'}
        </button>
      </label>
      <textarea
        className={`textarea w-full mx-0 mt-5 resize-none ${
          editing ? 'textarea-bordered bg-base-100' : 'bg-success'
        } h-60`}
        value={newDescription}
        onChange={(e) => {
          setNewDescription(e.target.value);
        }}
        readOnly={!editing}
      />
      <div className='divider mt-5' />
    </div>
  );
}

export default DescriptionField;
