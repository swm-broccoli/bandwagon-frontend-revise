import { useState } from 'react';
import BandProfileAPI from '../../apis/BandProfileAPI';

function BandMakingForm() {
  const [bandName, setBandName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //폼은 제출시 자동 새로고침된다
    console.log(bandName, '밴드로 제출됨');
    BandProfileAPI.createBand(bandName)
      .then((res) => {
        if (res.status === 200) {
          setBandName('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <label className='text-lg'>만들 밴드 이름</label>
      <input
        value={bandName}
        onChange={(e) => {
          setBandName(e.target.value);
        }}
        className='input input-bordered mt-3'
      />
      <button type='submit' className='btn btn-primary btn-sm h-10 mt-3'>
        만들기
      </button>
    </form>
  );
}

function EmptyBandProfile({ emptyBandPicture }: { emptyBandPicture: string }) {
  const [bandMaking, setBandMaking] = useState<boolean>(false);

  return (
    <section>
      <h1 className='text-bold text-2xl font-bold'>밴드 정보</h1>
      <div className='grid grid-flow-row justify-center'>
        <img src={emptyBandPicture} alt='밴드가 없을 때 사진' />
        가입한 밴드가 존재하지 않습니다!
        <button
          onClick={() => {
            setBandMaking((prev) => !prev);
          }}
          className='btn btn-sm bg-base-100 hover:bg-base-200 h-8 '
        >
          새 밴드 만들기
        </button>
        {bandMaking ? <BandMakingForm /> : null}
      </div>
    </section>
  );
}

export default EmptyBandProfile;
