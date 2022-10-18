import { useState, useEffect } from 'react';
import CheckBox from '../../components/CheckBox';

interface CheckBoxItemType {
  text: string;
  checked: boolean;
}

function TermAgreeBox({
  label,
  setAgreed,
}: {
  label: string;
  setAgreed: (newAgreed: boolean) => void;
}) {
  //약관 동의 박스
  const [checkedList, setCheckedList] = useState<CheckBoxItemType[]>([
    {
      text: '만 14세 이상입니다.',
      checked: false,
    },
    {
      text: '서비스 이용약관에 동의합니다.',
      checked: false,
    },
    {
      text: '개인정보 수집 및 이용에 동의합니다.',
      checked: false,
    },
    {
      text: '위치정보 이용약관에 동의합니다.',
      checked: false,
    },
  ]);

  useEffect(() => {
    setAgreed(checkedList.every((checked) => checked.checked === true));
  }, [checkedList]);

  return (
    <div className='flex flex-col mt-5 w-60 md:w-80'>
      <label className='text-accent mb-2 text-sm'>{label}</label>
      <div className='border border-base-200 rounded-lg px-3 md:px-5'>
        <div className='mt-2'>
          <CheckBox
            text='약관 전체 동의'
            checked={checkedList.every((checked) => checked.checked === true)}
            onClick={() => {
              if (checkedList.every((checked) => checked.checked === true)) {
                //만약 모두 true
                setCheckedList(
                  checkedList.map((checked) => ({
                    ...checked,
                    checked: false,
                  })),
                );
              } else {
                setCheckedList(
                  checkedList.map((checked) => ({
                    ...checked,
                    checked: true,
                  })),
                );
              }
            }}
          />
        </div>
        <div className='divider m-0' />
        {checkedList.map((checked, index) => (
          <CheckBox
            key={index}
            text={checked.text}
            checked={checked.checked}
            onClick={() => {
              setCheckedList(
                checkedList.map((item, i) =>
                  i === index ? { ...item, checked: !item.checked } : item,
                ),
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TermAgreeBox;
