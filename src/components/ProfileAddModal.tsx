function ProfileAddModal({
  label,
  addSelected,
  children,
}: {
  label: string;
  addSelected: () => void;
  children: React.ReactNode;
}) {
  // 라벨, 취소 버튼, 추가 버튼이 포함된 모달을 여는 '+추가' 버튼을 렌더링한다.
  // 추가 버튼을 누르면 선택된 옵션을 선택된 옵션 배열에 추가한다.
  // 라벨과 취소/추가 버튼 사이에는 옵션 드롭박스를 렌더링한다.
  return (
    <>
      <label
        htmlFor='add-modal'
        className='btn btn-primary btn-sm h-8 w-14 mr-1 p-0 modal-button'
      >
        +추가
      </label>
      <input type='checkbox' id='add-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative flex flex-col items-center'>
          <h3 className='text-lg mb-6'>{label}</h3>
          {children}
          <div className='flex justify-center mt-4 w-1/2'>
            <label
              htmlFor='add-modal'
              className='btn bg-base-[#c5c5c5] w-1/2 text-base-100 border-none mx-2'
            >
              취소
            </label>
            <label
              htmlFor='add-modal'
              onClick={addSelected}
              className='btn btn-primary w-1/2 mx-2'
            >
              추가
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileAddModal;
