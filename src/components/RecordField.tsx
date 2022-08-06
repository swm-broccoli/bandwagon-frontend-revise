import { useEffect, useState } from 'react';
import { RecordURLType, PerformanceRecordType } from '../types/types';

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

function RecordURLItem({
  recordURL,
  setRecordURL,
  editing,
}: {
  recordURL: RecordURLType;
  setRecordURL: (recordURL: RecordURLType) => void;
  editing: boolean;
}) {
  return (
    <div>
      {recordURL.siteName} {recordURL.url}
    </div>
  );
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
          value={record.musicTitle}
          onChange={(e) => {
            setRecord({ ...record, musicTitle: e.target.value });
          }}
        />
        <input
          type='date'
          className='input input-bordered input-sm w-full text-neutral'
          value={record.performDate}
          onChange={(e) => {
            setRecord({ ...record, performDate: e.target.value });
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
              urls: [...record.urls, { siteName: '', url: '' }],
            });
          }}
        >
          +추가
        </button>
      </div>
      {record.urls.map((recordURL, index) => (
        <RecordURLItem
          key={index}
          recordURL={recordURL}
          setRecordURL={(updatedRecordURL) => {
            setRecord({
              ...record,
              urls: record.urls.map((recordURL) => {
                return updatedRecordURL.siteName === recordURL.siteName
                  ? updatedRecordURL
                  : recordURL;
              }),
            });
          }}
          editing={editing}
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
        <span className='text-accent col-start-1'>{record.musicTitle}</span>
        <span className='text-neutral col-start-1 text-sm'>
          {record.performDate}
        </span>
      </div>
      {record.urls.map((recordLink, index) => (
        <RecordURLItem
          key={index}
          recordURL={recordLink}
          editing={editing}
          setRecordURL={() => {}}
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
  useEffect(() => {
    console.log(records);
  }, []);

  return (
    <div>
      <div className='flex flex-row justify-between items-center h-8 mb-5'>
        <h1 className='text-sm pl-1'>{label}</h1>
      </div>
      {records.map((record, index) => (
        <RecordItem
          key={index}
          record={record}
          setRecord={(newRecord) => {
            // 새 레코드와 id 같은 레코드만 교체한다.
            setRecords(
              records.map((record) => {
                if (record.id === newRecord.id) {
                  return newRecord;
                }
                return record;
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
