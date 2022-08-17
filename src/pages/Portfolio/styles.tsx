import { AreaType, BandMemberType, SelectionType } from '../../types/types';
import TagElement from '../../components/TagElement';
import { positionToKorean } from '../../assets/options/positionOptions';

export function PortfolioAvatar({ avatarURL }: { avatarURL: string }) {
  return (
    <div className='avatar w-1/3'>
      <div className='w-full rounded-full'>
        <img src={avatarURL} alt='프로필 사진' />
      </div>
    </div>
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
    <article>
      <div className='form-control h-10 w-full flex flex-row justify-start items-center my-2'>
        <label className='label w-1/5 py-0'>
          <span className='label-text text-accent'>{label}</span>
        </label>
        <div className='flex items-center h-10 w-3/5'>{text}</div>
      </div>
      <div className='divider m-0' />
    </article>
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
    <article className='w-full flex flex-col my-2'>
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
    </article>
  );
}

export function PortfolioAreaList({
  label,
  areas,
}: {
  label: string;
  areas: AreaType[];
}) {
  return (
    <article>
      <div className='form-control h-10 w-full flex flex-row justify-between items-center my-2'>
        <div className='flex w-4/5 flex-row justify-start'>
          <label className='label w-1/4 py-0'>
            <span className='label-text text-accent'>{label}</span>
          </label>
          <div className='flex flex-row items-center h-10 w-3/4 mr-2 text-accent'>
            {areas.map((area, index) => (
              <div className='mr-2'>{`${area.city} ${area.district}`}</div>
            ))}
          </div>
        </div>
      </div>
      <div className='divider m-0' />
    </article>
  );
}

export function PortfolioSelectList({
  label,
  selections,
}: {
  label: string;
  selections: SelectionType[];
}) {
  return (
    <article>
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
    </article>
  );
}

export function PortfolioDescription({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <article className='w-full grid grid-flow-row mt-5'>
      <label className='label min-w-[52px] p-0 pl-1 justify-between'>
        <span className='label-text text-accent w-4/5 mr-2'>{label}</span>
      </label>
      <textarea
        className='textarea w-full mx-0 mt-5 resize-none text-accent bg-success h-60 focus:outline-none'
        value={description}
        readOnly
      />
      <div className='divider mt-5' />
    </article>
  );
}

export function UserPortfolioMaker() {
  return <div>유저 포트폴리오 메이커</div>;
}
