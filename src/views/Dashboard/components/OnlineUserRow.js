import React from 'react'
import PropTypes from 'prop-types'
import { Media } from 'reactstrap'

import Avatar from '@components/avatar'
import {getFullNameFromUser} from '@src/utils'
import { toggleChallengeModal, setAddEditPopupData } from "@src/redux/actions/layout"
import {CONSTANTS} from '@src/utils/CONSTANTS'
import { useDispatch } from "react-redux"

function OnlineUserRow({ user, index, canChallenge }) {
  const dispatch = useDispatch()

  const handleClick = () => {
    if (canChallenge) {
      dispatch(setAddEditPopupData(user))
      dispatch(toggleChallengeModal(true))
    }
  }
  
    return (
        <div key={`${user.userName}-${index}`} className='employee-task d-flex justify-content-between align-items-center'>
          <Media className= "w-100">
            {user.profileImage ? 
              <Avatar size='sm' imgClassName='rounded' className='mr-75' img={user.profileImage}  imgHeight='42' imgWidth='42' status='online' onClick={handleClick} />
            :
              <Avatar size='sm' color={user.profileBg} imgClassName='rounded' className='mr-75'  imgHeight='42' imgWidth='42' status='online' content={`${user.firstName} ${user.lastName}`} onClick={handleClick} initials />
            }
            <Media className='my-auto d-flex justify-content-between' body status='online'>
              <h6 className='mb-0'>{getFullNameFromUser(user)}{user.rank ? ` - ${CONSTANTS.GAME_RANK.find(rank => rank.value === user.rank)?.label}` : ""}</h6>
            </Media>
          </Media>
        </div>
    )
}

OnlineUserRow.propTypes = {
    user: PropTypes.object.isRequired
}

export default OnlineUserRow

