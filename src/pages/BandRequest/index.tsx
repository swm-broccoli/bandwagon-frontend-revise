import React, { useEffect, useState } from 'react';
import BandProfileAPI from '../../apis/BandProfileAPI';
import BandRequestAPI from '../../apis/BandRequestAPI';
import MyPageTemplate from '../../components/MyPageTemplate';
import { BandRequestType } from '../../types/types';

function BandRequest() {
  const [type, setType] = useState<boolean>(false);
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
    console.log('request');
    BandRequestAPI.GetApplyRequest(type)
    .then((res) => {
      setRequestList([...requestList, ...res.data.requests]);
    })
    .catch((err) => {
      console.log(err);
    })

    BandRequestAPI.GetInviteRequest((type))
    .then((res) => {
      setRequestList([...requestList, ...res.data.requests]);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [type]);

  useEffect(() => {
    requestList.sort(function (a, b) {
      return b.id - a.id;
    });
    console.log(requestList);
  }, [requestList.length]) 

  return (
    <MyPageTemplate>

    </MyPageTemplate>
  )

}

export default BandRequest