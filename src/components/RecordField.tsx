import { useEffect, useState } from 'react';
import { RecordURLType, PerformanceRecordType } from '../types/types';
import ProfileAddModal from './ProfileAddModal';
import { Link } from 'react-router-dom';

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function RecordURLItem({
  recordURL,
  setRecordURL,
  deleteRecordURL,
  editing,
}: {
  recordURL: RecordURLType;
  setRecordURL: (recordURL: RecordURLType) => void;
  deleteRecordURL: () => void;
  editing: boolean;
}) {
  if (!editing) {
    return (
      <div className='flex flex-row py-1'>
        <div className='w-1/3 max-w-[120px] md:min-w-[120px]'>
          {recordURL.siteName}
        </div>
        <div className='divider divider-horizontal ml-0 mr-2' />
        <a
          href={`https://${recordURL.url}`}
          target='_blank'
          className='w-full break-all underline'
        >
          {recordURL.url}
        </a>
      </div>
    );
  } else {
    return (
      <div className='flex flex-row mb-1'>
        <input
          className='input input-bordered input-sm w-1/3 max-w-[120px]'
          value={recordURL.siteName}
          onChange={(e) => {
            setRecordURL({ ...recordURL, siteName: e.target.value });
          }}
        />
        <div className='divider divider-horizontal m-1' />
        <input
          className='input input-bordered input-sm w-full'
          value={recordURL.url}
          onChange={(e) => {
            setRecordURL({ ...recordURL, url: e.target.value });
          }}
        />
        <button className='ml-1' onClick={deleteRecordURL}>
          {'\u2715'}
        </button>
      </div>
    );
  }
}

function RecordEditingItem({
  record,
  setRecord,
  deleteRecord,
  editing,
}: {
  record: PerformanceRecordType;
  setRecord: (record: PerformanceRecordType) => void;
  deleteRecord: () => void;
  editing: boolean;
}) {
  return (
    <div className='grid grid-flow-row border border-base-200 mt-2 px-2 py-2 rounded-lg'>
      <div className='flex flex-row'>
        <div className='flex flex-col md:flex-row w-full'>
          <input
            type='text'
            className='input input-bordered input-sm w-full text-accent'
            value={record.musicTitle === null ? '' : record.musicTitle}
            onChange={(e) => {
              setRecord({ ...record, musicTitle: e.target.value });
            }}
          />
          <input
            type='date'
            className='input input-bordered input-sm w-full md:min-w-min md:max-w-min text-neutral mt-2 md:m-0 md:ml-2'
            value={record.performDate}
            onChange={(e) => {
              setRecord({ ...record, performDate: e.target.value });
            }}
          />
        </div>
        <button
          className='mt-1 md:mt-0 ml-1 self-start md:self-center'
          onClick={deleteRecord}
        >
          {'\u2715'}
        </button>
      </div>
      <div className='flex flex-row justify-between items-center my-2'>
        <h4 className='text-sm'>???? ???????????? ?????? ??????</h4>
        <button
          className='btn btn-sm bg-base-100 border-base-300 hover:bg-base-200 mr-[14.55px]'
          onClick={() => {
            setRecord({
              ...record,
              urls: [...record.urls, { siteName: '', url: '' }],
            });
          }}
        >
          +??????
        </button>
      </div>
      {record.urls.map((recordURL, recordURLIndex) => (
        <RecordURLItem
          key={recordURLIndex}
          recordURL={recordURL}
          setRecordURL={(updatedRecordURL) => {
            setRecord({
              ...record,
              urls: record.urls.map((_recordURL, _index) => {
                return recordURLIndex === _index
                  ? updatedRecordURL
                  : _recordURL;
              }),
            });
          }}
          deleteRecordURL={() => {
            setRecord({
              ...record,
              urls: record.urls.filter((_recordURL, _index) => {
                return recordURLIndex !== _index;
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
  // ?????? ????????? ???????????? ?????? ??? ?????? ????????? ?????????
  return (
    <div className='grid grid-flow-row bg-success mt-2 px-4 py-2 rounded-lg'>
      <span className='text-accent col-start-1'>{record.musicTitle}</span>
      <span className='text-neutral col-start-1 text-sm'>
        {record.performDate}
      </span>
      {record.urls.map((recordLink, index) => (
        <RecordURLItem
          key={index}
          recordURL={recordLink}
          editing={editing}
          deleteRecordURL={() => {}}
          setRecordURL={() => {}}
        />
      ))}
    </div>
  );
}

function RecordItem({
  record,
  setRecord,
  deleteRecord,
  editing,
}: {
  record: PerformanceRecordType;
  setRecord: (record: PerformanceRecordType) => void;
  deleteRecord: () => void;
  editing: boolean;
}) {
  if (editing) {
    return (
      <RecordEditingItem
        record={record}
        setRecord={setRecord}
        editing={editing}
        deleteRecord={deleteRecord}
      />
    );
  } else {
    return <RecordConstantItem record={record} editing={editing} />;
  }
}

export interface PerformanceRecordAddType {
  musicTitle: string;
  performDate: string;
  urls: RecordURLType[];
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
  const [tempID, setTempID] = useState(-1);

  return (
    <div>
      <div className='flex flex-row justify-between items-center h-8 mb-5'>
        <h1 className='text-sm pl-1'>{label}</h1>
        {editing ? (
          <button
            onClick={() => {
              setRecords([
                {
                  id: tempID,
                  musicTitle: '',
                  performDate: getTodayDate(),
                  urls: [],
                },
                ...records,
              ]);
              setTempID((tempID) => tempID - 1);
            }}
            className='btn btn-primary btn-sm h-8 w-14 mr-1 p-0'
          >
            +??????
          </button>
        ) : null}
      </div>
      {records.map((record, index) =>
        record.musicTitle !== null ? (
          <RecordItem
            key={index}
            record={record}
            setRecord={(newRecord) => {
              // ??? ???????????? id ?????? ???????????? ????????????.
              setRecords(
                records.map((record) => {
                  if (record.id === newRecord.id) {
                    return newRecord;
                  }
                  return record;
                }),
              );
            }}
            deleteRecord={() => {
              // ????????? ????????? musicTitle??? ??? ??? ?????????.
              setRecords(
                records.map((_record, _index) => {
                  if (index === _index) {
                    return {
                      ..._record,
                      musicTitle: null,
                    };
                  } else {
                    return _record;
                  }
                }),
              );
            }}
            editing={editing}
          />
        ) : null,
      )}
      <div className='divider m-0 mt-5' />
    </div>
  );
}

export default RecordField;
