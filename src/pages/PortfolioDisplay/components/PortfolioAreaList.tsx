import { AreaType } from '../../../types/types';

function PortfolioAreaList({
  label,
  areas,
  name,
}: {
  label: string;
  areas: AreaType[];
  name: string;
}) {
  return (
    <>
      <div className='flex flex-row items-center'>
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
      </div>
      <div className='divider m-0' />
    </>
  );
}

export default PortfolioAreaList;
