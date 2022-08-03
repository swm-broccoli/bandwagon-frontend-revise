import { useState } from 'react';
import { RecordLinkType, PerformanceRecordType } from '../types/types';

const linkPlatformOptions = [
  {
    id: 1,
    name: '유튜브',
  },
  {
    id: 2,
    name: '사운드클라우드',
  },
  {
    id: 3,
    name: '오디오클라우드',
  },
];

function RecordLinkItem({
  recordLink,
  editing,
  platformOptions,
}: {
  recordLink: RecordLinkType;
  editing: boolean;
  platformOptions: Array<{ id: number; name: string }>;
}) {
  if (editing) {
    return (
      <div className='flex justify-between'>
        <select className='select select-bordered select-sm'>
          {platformOptions.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
        <input
          className='input w-full h-full'
          value={recordLink.url}
          onChange={(e) => {
            recordLink.url = e.target.value;
          }}
        />
      </div>
    );
  }
  return (
    <div className='flex flex-row text-xs m-1'>
      <div className='w-24'>{recordLink.platform}</div>
      <div className='divider divider-horizontal m-0' />
      <a
        href={recordLink.url}
        className='link link-hover block w-full break-all'
      >
        {recordLink.url}
      </a>
    </div>
  );
}

function RecordEditingItem({
  record,
  editing,
  setEditing,
}: {
  record: PerformanceRecordType;
  editing: boolean;
  setEditing: (newEditing: boolean) => void;
}) {
  return (
    <div className='grid grid-flow-row bg-success mt-2 px-4 py-2 rounded-lg'>
      <div className='grid grid-cols-2'>
        <input
          type='text'
          className='input input-bordered input-sm w-full text-accent'
          value={record.title}
        />
        <input
          type='date'
          className='input input-bordered input-sm w-full text-neutral'
          value={record.date}
        />
        <button
          className='btn btn-primary btn-sm w-20 justify-self-end row-start-1 row-end-3 col-start-2'
          onClick={() => setEditing(!editing)}
        >
          {editing ? '저장' : '수정'}
        </button>
      </div>
      {record.recordLinks.map((recordLink, index) => (
        <RecordLinkItem
          key={index}
          recordLink={recordLink}
          editing={editing}
          platformOptions={linkPlatformOptions}
        />
      ))}
    </div>
  );
}

function RecordConstantItem({
  record,
  editing,
  setEditing,
}: {
  record: PerformanceRecordType;
  editing: boolean;
  setEditing: (newEditing: boolean) => void;
}) {
  const [itemEditing, setItemEditing] = useState(false);

  return (
    <div className='grid grid-flow-row bg-success mt-2 px-4 py-2 rounded-lg'>
      <div className='grid grid-cols-2'>
        <span className='text-accent col-start-1'>{record.title}</span>
        <span className='text-neutral col-start-1 text-sm'>{record.date}</span>
        <button
          className='btn btn-primary btn-sm w-20 justify-self-end row-start-1 row-end-3 col-start-2'
          onClick={() => setEditing(!editing)}
        >
          {editing ? '저장' : '수정'}
        </button>
      </div>
      {record.recordLinks.map((recordLink, index) => (
        <RecordLinkItem
          key={index}
          recordLink={recordLink}
          editing={editing}
          platformOptions={linkPlatformOptions}
        />
      ))}
    </div>
  );
}

function RecordItem({ record }: { record: PerformanceRecordType }) {
  const [itemEditing, setItemEditing] = useState<boolean>(false);

  if (itemEditing) {
    return (
      <RecordEditingItem
        record={record}
        editing={itemEditing}
        setEditing={setItemEditing}
      />
    );
  } else {
    return (
      <RecordConstantItem
        record={record}
        editing={itemEditing}
        setEditing={setItemEditing}
      />
    );
  }
}

function RecordField({
  label,
  records,
}: {
  label: string;
  records: PerformanceRecordType[];
}) {
  return (
    <div>
      <div className='flex flex-row justify-between items-center h-8 mb-5'>
        <h1 className='text-sm pl-1'>{label}</h1>
      </div>

      {records.map((record, index) => (
        <RecordItem key={index} record={record} />
      ))}
    </div>
  );
}

export default RecordField;
