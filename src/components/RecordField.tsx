import { useEffect, useState } from 'react';
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
  } else {
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
}

function RecordEditingItem({
  record,
  setRecord,
  editing,
}: {
  record: PerformanceRecordType;
  setRecord: (record: PerformanceRecordType) => void;
  editing: boolean;
}) {
  return (
    <div className='grid grid-flow-row bg-success mt-2 px-4 py-2 rounded-lg'>
      <div className='grid grid-cols-2'>
        <input
          type='text'
          className='input input-bordered input-sm w-full text-accent'
          value={record.title}
          onChange={(e) => {
            setRecord({ ...record, title: e.target.value });
          }}
        />
        <input
          type='date'
          className='input input-bordered input-sm w-full text-neutral'
          value={record.date}
          onChange={(e) => {
            setRecord({ ...record, date: e.target.value });
          }}
        />
      </div>
      <div className='flex flex-row justify-between items-center'>
        <h4 className='text-sm'>연주기록 링크 추가</h4>
        <button
          className='btn btn-sm bg-base-100 border-base-300 hover:bg-base-200'
          onClick={() => {
            setRecord({
              ...record,
              recordLinks: [
                ...record.recordLinks,
                { platform: linkPlatformOptions[0], url: '' },
              ],
            });
          }}
        >
          +추가
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
}: {
  record: PerformanceRecordType;
  editing: boolean;
}) {
  return (
    <div className='grid grid-flow-row bg-success mt-2 px-4 py-2 rounded-lg'>
      <div className='grid grid-cols-2'>
        <span className='text-accent col-start-1'>{record.title}</span>
        <span className='text-neutral col-start-1 text-sm'>{record.date}</span>
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

function RecordItem({
  record,
  setRecord,
  editing,
}: {
  record: PerformanceRecordType;
  setRecord: (record: PerformanceRecordType) => void;
  editing: boolean;
}) {
  if (editing) {
    return (
      <RecordEditingItem
        record={record}
        setRecord={setRecord}
        editing={editing}
      />
    );
  } else {
    return <RecordConstantItem record={record} editing={editing} />;
  }
}

function RecordField({
  label,
  records,
  setRecords,
  editing,
}: {
  label: string;
  records: PerformanceRecordType[];
  setRecords: (records: PerformanceRecordType[]) => void;
  editing: boolean;
}) {
  const [newRecords, setNewRecords] =
    useState<PerformanceRecordType[]>(records);

  useEffect(() => {
    console.log(records);
  }, []);

  return (
    <div>
      <div className='flex flex-row justify-between items-center h-8 mb-5'>
        <h1 className='text-sm pl-1'>{label}</h1>
      </div>
      {newRecords.map((record, index) => (
        <RecordItem
          key={index}
          record={record}
          setRecord={(record) => {
            setNewRecords(
              newRecords.map((newRecord) => {
                if (record.id === newRecord.id) {
                  return record;
                }
                return newRecord;
              }),
            );
          }}
          editing={editing}
        />
      ))}
    </div>
  );
}

export default RecordField;
