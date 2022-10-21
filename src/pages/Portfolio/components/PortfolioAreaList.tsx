import { AreaType } from '../../../types/types';

function PortfolioAreaList({
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
        defaultChecked
      />
      <div className='form-control h-10 w-full flex flex-row justify-between items-center my-2'>
        <div className='flex w-4/5 flex-row justify-start'>
          <label className='label w-1/4 py-0'>
            <span className='label-text text-accent'>{label}</span>
          </label>
          <div className='flex flex-row items-center h-10 w-3/4 mr-2 text-accent'>
            {areas.map((area) => (
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

export default PortfolioAreaList;
