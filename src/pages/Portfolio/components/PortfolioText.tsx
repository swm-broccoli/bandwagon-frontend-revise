function PortfolioText({ label, text }: { label: string; text: string }) {
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

export default PortfolioText;
