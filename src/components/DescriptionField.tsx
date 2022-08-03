function DescriptionField({
  label,
  description,
  setDescription,
  editing,
}: {
  label: string;
  description: string;
  setDescription: (newDescription: string) => void;
  editing: boolean;
}) {
  return (
    <div className='w-full grid grid-flow-row mt-5'>
      <label className='label min-w-[52px] p-0 pl-1 justify-between'>
        <span className='label-text text-accent w-4/5 mr-2'>{label}</span>
      </label>
      <textarea
        className={`textarea w-full mx-0 mt-5 resize-none text-accent ${
          editing ? 'textarea-bordered bg-base-100' : 'bg-success'
        } h-60`}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        readOnly={!editing}
      />
      <div className='divider mt-5' />
    </div>
  );
}

export default DescriptionField;
