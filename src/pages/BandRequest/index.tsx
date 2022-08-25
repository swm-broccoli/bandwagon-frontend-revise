import React, { useEffect, useState } from 'react';
import BandProfileAPI from '../../apis/BandProfileAPI';
import BandRequestAPI from '../../apis/BandRequestAPI';
import MyPageTemplate from '../../components/MyPageTemplate';
import { BandRequestType } from '../../types/types';
import ApplyCard from './ApplyCard';
import InviteCard from './InviteCard';

function BandRequest() {
  const [type, setType] = useState<boolean>(false);
  const [loadApply, setLoadApply] = useState<boolean>(false);
  const [loadInvite, setLoadInvite] = useState<boolean>(false);
  const [requestSet, setRequestSet] = useState(new Set<BandRequestType>([]));
  const [requestList, setRequestList] = useState<BandRequestType[]>([]);

  useEffect(()  => {
    BandProfileAPI.getBandProfileInfo()
    .then((res) => {
      if (res.status === 200) setType(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    BandRequestAPI.GetApplyRequest(type)
    .then((res) => {
      res.data.requests.map((request: BandRequestType) => {
        setRequestSet(requestSet.add(request));
      });
      if (res.data.requests.length) setLoadApply(true);
    })
    .catch((err) => {
      console.log(err);
    })

    BandRequestAPI.GetInviteRequest((type))
    .then((res) => {
      res.data.requests.map((request: BandRequestType) => {
        setRequestSet(requestSet.add(request));
      });
      if (res.data.requests.length) setLoadInvite(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [type]);

  useEffect(() => {
    setRequestList(Array.from(requestSet))
    requestList.sort(function (a, b) {
      return b.id - a.id;
    });
  }, [loadApply, loadInvite]); 

  return (
    <MyPageTemplate>
      <ul className='flex flex-col gap-4'>
      {requestList.map((request, index) =>
      <li
        key={index}
        className='w-full max-w-xl h-36 p-5 border-solid border-[#e9e9e9] border bg-white rounded-xl'>
        {request.type == 'APPLY' ? 
        <ApplyCard type={type} request={request} /> :
        <InviteCard type={type} request={request} />}
      </li>
      )}
      </ul>
    </MyPageTemplate>
  )

}

export default BandRequest