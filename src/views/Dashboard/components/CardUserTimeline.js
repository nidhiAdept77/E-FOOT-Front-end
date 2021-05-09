import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'
import { Aperture, BookOpen, HelpCircle, PenTool, Shield, User } from 'react-feather'
import jsonImg from '@src/assets/images/icons/json.png'
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import { Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip'

const data = [
  {
    title: 'Profile Updated',
    content: 'You profile is updated.',
    icon: <PenTool size={14} />,
    meta: '12 min ago',
    metaClassName: 'mr-1'
  },
  {
    title: 'Challange Result',
    content: 'You Won challenge.',
    icon: <Shield size={14} />,
    meta: '45 min ago',
    metaClassName: 'mr-1',
    color: 'success'
  },
  {
    title: 'Challange Reuest',
    content: 'You Challange Xiv Dp.',
    icon: <User size={14} />,
    color: 'info',
    meta: '2 days ago',
    metaClassName: 'mr-1'
  },
  {
    title: 'Login Actiivity',
    content: 'You Loggedin',
    color: 'danger',
    icon: <Aperture size={14} />,
    meta: '5 days ago',
    metaClassName: 'mr-1'
  }
]

const UserTimeline = () => {
  return (
    <Card className='card-user-timeline'>
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
        <Timeline className='ml-50 mb-0' data={data} />
      </CardBody>
    </Card>
  )
}

export default UserTimeline
