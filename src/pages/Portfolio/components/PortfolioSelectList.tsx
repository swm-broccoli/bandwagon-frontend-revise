import { SelectionType } from '../../../types/types';
import TagElement from '../../../components/TagElement';

function PortfolioSelectList({
  label,
  selections,
  name,
}: {
  label: string;
  selections: SelectionType[];
  name: string;
}) {
  return (
    <>
      <div className='flex flex-row items-center'>
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
      </div>
      <div className='divider m-0' />
    </>
  );
}

export default PortfolioSelectList;
