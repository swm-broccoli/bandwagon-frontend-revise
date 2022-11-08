import { BandMemberType } from '../../../types/types';
import DefaultUserImg from '../../../assets/default/man_no_img.svg';
import { positionToKorean } from '../../../assets/options/positionOptions';

export function PortfolioMemberItem({ member }: { member: BandMemberType }) {
  return (
    <div className='border border-base-200 rounded-lg p-2 mr-2'>
      <div className='flex flex-row items-center mr-3'>
        <div className='avatar mr-2 w-10 h-10 rounded-full'>
          <div className='w-10 h-10 rounded-full'>
            <img src={member.avatarUrl || DefaultUserImg} alt={member.name} />
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

export default PortfolioMemberItem;
