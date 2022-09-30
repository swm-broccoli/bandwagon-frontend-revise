import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecruitProcessAPI from '../apis/RecruitProcessAPI';
import { NotificationType } from '../types/types';

function NotificationElement (props: {notification: NotificationType}) {
  if (props.notification.type == 'APPLY' || props.notification.type == 'INVITE') {
    return (
      <li className='w-full'>
        <Link to='/profile/request'>
          {props.notification.message}
        </Link>
      </li>
    )
  } else {
    return (
      <li className='w-full'>
        <Link to='/profile/band'>
          {props.notification.message}
        </Link>
      </li>
    )
  }
}

function NotificationBox () {
  const [notificationList, setNotificationList] = useState<NotificationType[]>([]);

  function handleNotificationClick (e: React.MouseEvent<HTMLLabelElement>) {
    RecruitProcessAPI.getNotification()
    .then((res) => {
      console.log(res.data.notifications);
      setNotificationList(res.data.notifications);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <li className='menu-item'>
      <div className='dropdown dropdown-end'>
        <label
          onClick={handleNotificationClick}
          tabIndex={0}
          className='text-[#676767] active:bg-neutral'>
          알림
        </label>
        <ul tabIndex={0} className='dropdown-content menu flex flex-col gap-5 p-5 shadow bg-base-100 rounded-lg w-72 top-12'>
        {notificationList.map((notification, index) => 
          <NotificationElement key={index} notification={notification} />
        )}
        </ul>
      </div>
    </li>
  )
}

export default NotificationBox;