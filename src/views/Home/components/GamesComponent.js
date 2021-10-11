import React, { useEffect } from 'react'
import { IoLogoGameControllerB } from 'react-icons/io'
import { Card, CardHeader, CardBody, Media, Button } from 'reactstrap'
import LoaderComponent from '../../components/Loader'
import { FormattedMessage } from 'react-intl'
import Avatar from '@components/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getPaginatedChallenges, removeChallenges } from '../../../redux/actions/challenges'
import {getFormattedDate} from '@src/utils/'

export default function GamesComponent() {
    const {challenges} = useSelector(state => state.challenges)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPaginatedChallenges())
        return () => {
          dispatch(removeChallenges())
        }
      }, [])
    
      const renderTasks = () => {
        return challenges?.map(challenge => {
          return (
            <div key={challenge._id} className='employee-task d-flex justify-content-between align-items-center'>
              <Media>
                <Avatar imgClassName='rounded' className='mr-75' img={challenge.gameImage} imgHeight='120' imgWidth='120' />
                <Media className='my-auto' body>
                  <h5 className='mb-0'>{challenge.gameName}</h5>
                  <h6 className='mb-0'>By: {challenge.challengerName}</h6>
                  <small>{challenge.consoleName}</small>
                </Media>
              </Media>
              <div className='d-flex align-items-center'>
                <small className='text-muted mr-75'>{getFormattedDate(challenge.createdAt)} 00h:00m</small>
                <small className='text-muted mr-75'>
                <Button.Ripple className="mr-1" color="primary" block onClick={() => alert("Coming Soon!")}>
                  Accept
                </Button.Ripple>
                </small>
              </div>
            </div>
          )
        })
      }

    return (
        <Card className='chat-widget'>
            <LoaderComponent loading={false} />
            <CardHeader>
                <div className='d-flex align-items-center'>
                    <IoLogoGameControllerB size="25" className='mr-2'/>
                    <h5 className='mb-0'><FormattedMessage id="Game Available" /></h5>
                </div>
            </CardHeader>
            <div className='chat-app-window'>
                <Card className='card-employee-task'>
                    <CardBody>{renderTasks()}</CardBody>
                </Card>
            </div>
        </Card>
    )
}
