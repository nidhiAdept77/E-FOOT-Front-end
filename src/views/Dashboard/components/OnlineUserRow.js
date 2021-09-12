import React from 'react'
import PropTypes from 'prop-types'
import { Media } from 'reactstrap'

import Avatar from '@components/avatar'
import {getFullNameFromUser} from '@src/utils'

function OnlineUserRow({ user, index }) {
    return (
        <div key={`${user.userName}-${index}`} className='employee-task d-flex justify-content-between align-items-center'>
          <Media className= "w-100">
            {user.profileImage ? 
              <Avatar size='sm' imgClassName='rounded' className='mr-75' img={user.profileImage}  imgHeight='42' imgWidth='42' status='online' />
            :
              <Avatar size='sm' color={user.profileBg} imgClassName='rounded' className='mr-75'  imgHeight='42' imgWidth='42' status='online' content={`${user.firstName} ${user.lastName}`} initials />
            }
            <Media className='my-auto d-flex justify-content-between' body status='online'>
              <h6 className='mb-0'>{getFullNameFromUser(user)}</h6>
            </Media>
          </Media>
        </div>
    )
}

OnlineUserRow.propTypes = {
    user: PropTypes.object.isRequired
}

export default OnlineUserRow

