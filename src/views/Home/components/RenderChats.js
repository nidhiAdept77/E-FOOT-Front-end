import React from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { getChatTime } from '../../../utils'
import _ from 'underscore'


export default function RenderChats({ chats }) {
  const userId = localStorage.getItem('userId')
  if (_.isEmpty(chats)) return null
  return chats.map((item, index) => {
    const { user } = item
    const { firstName, lastName } = user
    const space = " "
    return (
      <div
        key={index}
        className={classnames('chat', {
          'chat-left': userId !== user._id
        })}
      >
        <div className='chat-avatar'>
          {user.profileImage ?
            <Avatar size='sm' img={user.profileImage} imgHeight='40' imgWidth='40' />
            :
            <Avatar size='sm' color={user.profileBg} imgHeight='40' imgWidth='40' content={`${firstName} ${lastName}`} initials />
          }
        </div>

        <div className='chat-body'>
          <div key={item.msg} className='chat-content'>
            <b className='chatOwner'>{item.user.firstName + space + item.user.lastName}</b>
            <p>{item.message}</p>
            <p className="chat-time">{getChatTime(item.time, false)}</p>
          </div>
        </div>
      </div>
    )
  })
}
