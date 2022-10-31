import { useEffect, useState } from 'react'
import Timeline from '@components/timeline'
import { Aperture, BookOpen, HelpCircle, PenTool, Shield, User } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip'
import { useSelector, useDispatch } from 'react-redux'
import { getUserActivities } from '../../../redux/actions/dashboard'
import moment from 'moment'

const UserTimeline = () => {
  const dispatch = useDispatch()
  const {userActivities} = useSelector(state => state.dashboard)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    dispatch(getUserActivities())
    return () => {
    }
  }, [])

  useEffect(() => {
    setActivities(userActivities)
  }, [userActivities])

  return (
    <Card className='card-user-timeline' id="myTimeline">
      <CardHeader>
        <div className='d-flex align-items-center'>
          <BookOpen className='user-timeline-title-icon' />
          <CardTitle tag='h4'>User Timeline</CardTitle>
        </div>
        <HelpCircle size={18} id="userActivityHelp" className='text-muted cursor-pointer' />
        <UncontrolledTooltip placement='auto' target='userActivityHelp'>
          User's Activity
        </UncontrolledTooltip>
      </CardHeader>
      <CardBody>
        <Timeline className='ml-50 mb-0' data={activities?.map(activity => {
          return {
            title: activity?.title,
            content: activity?.message,
            icon: activity?.title.includes("Profile") ? <PenTool size={14} /> : activity?.title.includes("Challenge") ? <User size={14} /> : <Shield size={14} />,
            meta: moment(new Date(parseInt(activity?.createdAt))).fromNow(),
            metaClassName: 'mr-1',
            color: activity?.color
          }
        }) || []} />
      </CardBody>
    </Card>
  )
}

export default UserTimeline
