import {
  BandMemberType,
  BandProfileType,
  RecordURLType,
  PerformanceRecordType,
} from '../../../types/types';
import BandMemberDefaultPic from '../../../assets/band-default-pic.png';
import { positionToKorean } from '../../../assets/options/positionOptions';
import { PictureType } from '../../../types/types';

export function PortfolioMemberItem({ member }: { member: BandMemberType }) {
  return (
    <div className='border border-base-200 rounded-lg p-2 mr-2'>
      <div className='flex flex-row items-center mr-3'>
        <div className='avatar mr-2 w-10 h-10 rounded-full'>
          <div className='w-10 h-10 rounded-full'>
            <img
              src={member.avatarUrl || BandMemberDefaultPic}
              alt={member.name}
            />
          </div>
        </div>
        <div>
          <div className='badge badge-secondary badge-outline'>
            {member.name}
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center'>
        {member.positions.map((position, index) => (
          <div key={index} className='badge badge-secondary'>
            {positionToKorean[position.name]}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioAlbumItem({ photo }: { photo: PictureType }) {
  return (
    <div className='flex flex-row shrink-0 mr-4 items-start'>
      <img
        className='w-32 h-32 rounded-xl mr-1'
        src={photo.name || BandMemberDefaultPic}
        alt={`밴드 사진`}
      />
    </div>
  );
}

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
