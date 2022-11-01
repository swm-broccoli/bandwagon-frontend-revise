import { PerformanceRecordType, RecordURLType } from '../../../types/types';

function PortfolioRecordURLItem({ recordURL }: { recordURL: RecordURLType }) {
  return (
    <div className='grid grid-cols-7 mb-1'>
      <div className='col-span-2'>{recordURL.siteName}</div>
      <div className='divider divider-horizontal' />
      <div className='col-span-4 break-all'>{recordURL.url}</div>
    </div>
  );
}

function PortfolioRecordItem({
  record,
  name,
}: {
  record: PerformanceRecordType;
  name: string;
}) {
  return (
    <div className='grid grid-flow-row bg-success mt-2 px-4 py-2 rounded-lg'>
      {/* 기록 자체를 문자열화해서 값으로 가짐으로써 input이 가리키는 기록이 어떤 건지 가리키게 한다 */}
      <div className='grid grid-cols-2'>
        <span className='text-accent col-start-1'>{record.musicTitle}</span>
        <span className='text-neutral col-start-1 text-sm'>
          {record.performDate}
        </span>
      </div>
      {record.urls.map((recordLink, index) => (
        <PortfolioRecordURLItem key={index} recordURL={recordLink} />
      ))}
    </div>
  );
}

function PortfolioRecordField({
  label,
  records,
  name,
}: {
  label: string;
  records: PerformanceRecordType[];
  name: string;
}) {
  return (
    <div>
      <div className='flex flex-row justify-between items-center h-8 mb-5'>
        <h1 className='text-sm pl-1'>{label}</h1>
      </div>
      {records.map((record, index) =>
        record.musicTitle !== null ? (
          <PortfolioRecordItem key={index} record={record} name={name} />
        ) : null,
      )}
      <div className='divider m-0 mt-5' />
    </div>
  );
}

export default PortfolioRecordField;
