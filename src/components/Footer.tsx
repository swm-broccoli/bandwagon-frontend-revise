import React from 'react';
import { Link } from 'react-router-dom';
import SiteLogo from './Logo';

function GlobalFooter() {
  return (
    <footer className='p-4 footer bottom-0 bg-base-200 flex flex-col items-center justify-center gap-3'>
      <div className='w-full flex flex-col md:flex-row items-center justify-center md:justify-evenly'>
        <SiteLogo />
        <p className='text-neutral'>
          copyright 2022 ⓒ band:wagon All rights reserved.
        </p>
      </div>
      <div className='flex flex-col justify-center'>
        <p>
          주소: 서울특별시 강남구 테헤란로 311(역삼동) 아남타워빌딩 7층(06151)
        </p>
        <p>문의: soakdma37@gmail.com</p>
      </div>
    </footer>
  );
}

export default GlobalFooter;
