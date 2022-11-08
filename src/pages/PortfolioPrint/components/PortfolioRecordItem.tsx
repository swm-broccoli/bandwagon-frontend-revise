import { RecordURLType, PerformanceRecordType } from '../../../types/types';

function PortfolioMakerRecordURLItem({
  recordURL,
}: {
  recordURL: RecordURLType;
}) {
  return (
    <div className='grid grid-cols-7 mb-1'>
      <div className='col-span-2'>{recordURL.siteName}</div>
      <div className='divider divider-horizontal' />
      <div className='col-span-4 break-all'>{recordURL.url}</div>
    </div>
  );
}

export function PortfolioRecordItem({
  record,
}: {
  record: PerformanceRecordType;
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
        <PortfolioMakerRecordURLItem key={index} recordURL={recordLink} />
      ))}
    </div>
  );
}

export default PortfolioRecordItem;
