function PortfolioDescription({
  label,
  description,
  name,
}: {
  label: string;
  description: string;
  name: string;
}) {
  return (
    <div className='w-full grid grid-flow-row mt-5'>
      <div className='w-full flex flex-row justify-start'>
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

export default PortfolioDescription;
