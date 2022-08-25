import React from 'react';
import { BandRequestType } from '../../types/types';

function InviteCard(props: {
  type: boolean
  request: BandRequestType}) {
  return (
    <>
      {props.request.user.name}
    </>
  )
}

export default InviteCard;