import { AreaType, BandMemberType, SelectionType } from '../../types/types';
import TagElement from '../../components/TagElement';
import { positionToKorean } from '../../assets/options/positionOptions';
import React from 'react';
import {
  PerformanceRecordType,
  RecordURLType,
  PictureType,
} from '../../types/types';

export function PortfolioAvatar({ avatarURL }: { avatarURL: string }) {
  return (
    <section className='flex flex-col items-center'>
      <div className='avatar w-1/3'>
        <div className='w-full rounded-full'>
          <img src={avatarURL} alt='프로필 사진' />
        </div>
      </div>
    </section>
  );
}

export function PortfolioText({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div>
      <div className='form-control h-10 w-full flex flex-row justify-start items-center my-2'>
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        <div className='flex items-center h-10 w-3/5'>{text}</div>
      </div>
      <div className='divider m-0' />
    </div>
  );
}

function PortfolioBandMemberListItem({ member }: { member: BandMemberType }) {
  return (
    <li className='flex flex-row items-center border rounded-lg p-2'>
      <p className='text-accent text-base mr-2.5'>
        {member.name}
        {member.isFrontman ? (
          <span className='badge badge-secondary ml-1'>Frontman</span>
        ) : null}
      </p>
      {member.positions.length
        ? member.positions.map((position) => (
            <TagElement
              key={position.id}
              tag={positionToKorean[position.name]}
            />
          ))
        : null}
    </li>
  );
}

export function PortfolioMemberList({
  label,
  bandMembers,
}: {
  label: string;
  bandMembers: BandMemberType[];
}) {
  return (
    <div className='w-full flex flex-col my-2'>
      <div className='flex flex-row justify-between'>
        <label className='label w-1/4 py-0 mb-5'>
          <span className='label-text text-accent'>{label}</span>
        </label>
      </div>
      <ul className='w-full flex flex-row flex-wrap gap-x-7 gap-y-2'>
        {bandMembers.map((member, index) => (
          <PortfolioBandMemberListItem key={index} member={member} />
        ))}
      </ul>
      <div className='divider m-0 mt-5' />
    </div>
  );
}

export function PortfolioAreaList({
  label,
  areas,
  name,
  onCheckboxClick,
}: {
  label: string;
  areas: AreaType[];
  name: string;
  onCheckboxClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className='flex flex-row items-center'>
      <input
        type='checkbox'
        name={name}
        onClick={onCheckboxClick}
        className='checkbox checkbox-primary'
      />
      <div className='form-control h-10 w-full flex flex-row justify-between items-center my-2'>
        <div className='flex w-4/5 flex-row justify-start'>
          <label className='label w-1/4 py-0'>
            <span className='label-text text-accent'>{label}</span>
          </label>
          <div className='flex flex-row items-center h-10 w-3/4 mr-2 text-accent'>
            {areas.map((area, index) => (
              <div
                key={area.id}
                className='mr-2'
              >{`${area.city} ${area.district}`}</div>
            ))}
          </div>
        </div>
      </div>
      <div className='divider m-0' />
    </div>
  );
}

export function PortfolioSelectList({
  label,
  selections,
  name,
  onCheckboxClick,
}: {
  label: string;
  selections: SelectionType[];
  name: string;
  onCheckboxClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className='flex flex-row items-center'>
      <input
        type='checkbox'
        name={name}
        onClick={onCheckboxClick}
        className='checkbox checkbox-primary'
      />
      <div className='form-control h-10 w-full flex flex-row justify-between items-center my-2'>
        <div className='w-4/5 flex flex-row justify-start'>
          <label className='label w-1/4 py-0'>
            <span className='label-text text-accent'>{label}</span>
          </label>
          <div className='flex flex-row items-center h-10 w-3/4 text-accent'>
            {selections.map((item, index) => (
              <TagElement key={index} tag={item.name} />
            ))}
          </div>
        </div>
      </div>
      <div className='divider m-0' />
    </div>
  );
}

export function PortfolioDescription({
  label,
  description,
  name,
  onCheckboxClick,
}: {
  label: string;
  description: string;
  name: string;
  onCheckboxClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className='w-full grid grid-flow-row mt-5'>
      <div className='w-full flex flex-row justify-start'>
        <input
          type='checkbox'
          name={name}
          onClick={onCheckboxClick}
          className='checkbox checkbox-primary'
        />
        <label className='label min-w-[52px] p-0 pl-1 justify-between'>
          <div>
            <span className='label-text text-accent w-4/5 mr-2'>{label}</span>
          </div>
        </label>
      </div>

      <textarea
        className='textarea w-full mx-0 mt-5 resize-none text-accent bg-success h-60 focus:outline-none'
        value={description}
        readOnly
      />
      <div className='divider mt-5' />
    </div>
  );
}

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
  onRecordCheckboxClick,
}: {
  record: PerformanceRecordType;
  name: string;
  onRecordCheckboxClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className='grid grid-flow-row bg-success mt-2 px-4 py-2 rounded-lg'>
      {/* 기록 자체를 문자열화해서 값으로 가짐으로써 input이 가리키는 기록이 어떤 건지 가리키게 한다 */}
      <input
        type='checkbox'
        className='checkbox checkbox-primary'
        name={name}
        value={JSON.stringify(record)}
        onClick={onRecordCheckboxClick}
      />

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

export function PortfolioRecordField({
  label,
  records,
  name,
  onRecordCheckboxClick,
}: {
  label: string;
  records: PerformanceRecordType[];
  name: string;
  onRecordCheckboxClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <div className='flex flex-row justify-between items-center h-8 mb-5'>
        <h1 className='text-sm pl-1'>{label}</h1>
      </div>
      {records.map((record, index) =>
        record.musicTitle !== null ? (
          <PortfolioRecordItem
            key={index}
            record={record}
            name={name}
            onRecordCheckboxClick={onRecordCheckboxClick}
          />
        ) : null,
      )}
      <div className='divider m-0 mt-5' />
    </div>
  );
}

function PortfolioAlbumItem({ photo }: { photo: PictureType }) {
  if (photo.name === null) {
    return null;
  } else {
    return (
      <div className='flex flex-row shrink-0 mr-4 items-start'>
        <img
          className='w-32 h-32 rounded-xl mr-1'
          src={photo.name}
          alt={`밴드 사진`}
        />
      </div>
    );
  }
}

export function PortfolioAlbum({
  label,
  photos,
}: {
  label: string;
  photos: PictureType[];
}) {
  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between items-center text-sm h-8 mb-5'>
        <h1>{label}</h1>
      </div>
      <div className='flex flex-row overflow-x-auto items-center'>
        {photos.map((photo) => (
          <PortfolioAlbumItem key={photo.id} photo={photo} />
        ))}
      </div>
      <div className='divider m-0 mt-5' />
    </div>
  );
}

export function UserPortfolioMaker() {
  return <div>유저 포트폴리오 메이커</div>;
}
