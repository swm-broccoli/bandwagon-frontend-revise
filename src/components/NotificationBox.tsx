import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecruitProcessAPI from '../apis/RecruitProcessAPI';
import { NotificationType } from '../types/types';

function NotificationElement(props: { notification: NotificationType }) {
  if (props.notification.type == 'APPLY') {
    return (
      <li className='w-full h-fit'>
        <Link to='/band/apply'>{props.notification.message}</Link>
      </li>
    );
  } else if (props.notification.type == 'INVITE') {
    return (
      <li className='w-full h-fit'>
        <Link to='/my/apply'>{props.notification.message}</Link>
      </li>
    );
  } else {
    return (
      <li>
        <Link to='/band/profile'>{props.notification.message}</Link>
      </li>
    );
  }
}

function NotificationBox() {
  const [notificationList, setNotificationList] = useState<NotificationType[]>(
    [],
  );

  function handleNotificationClick(e: React.MouseEvent<HTMLLabelElement>) {
    RecruitProcessAPI.getNotification()
      .then((res) => {
        console.log(res.data.notifications);
        setNotificationList(res.data.notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <li className='menu-item'>
      <div className='dropdown dropdown-end px-2 md:px-4'>
        <label
          onClick={handleNotificationClick}
          tabIndex={0}
          className='text-[#676767] active:bg-neutral'
        >
          알림
        </label>
        <ul
          tabIndex={0}
          className='dropdown-content menu flex flex-col flex-nowrap gap-3 p-5 shadow bg-base-100 rounded-lg w-60 md:w-72 top-12 h-fit max-h-96 overflow-y-scroll'
        >
          {notificationList.length ? (
            notificationList.map((notification, index) => (
              <NotificationElement key={index} notification={notification} />
            ))
          ) : (
            <div className='w-full my-11 text-center'>
              알림이 존재하지 않습니다!
            </div>
          )}
        </ul>
      </div>
    </li>
  );
}

export default NotificationBox;
