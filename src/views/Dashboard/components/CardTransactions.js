import Avatar from '@components/avatar'
import * as Icon from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip'
import {getUserTransactions, removeUserTrasaction} from '@src/redux/actions/wallet'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {CONSTANTS} from '@src/utils/CONSTANTS'

const CardTransactions = () => {
  const {userTransactions} = useSelector(state => state.wallet)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserTransactions(5, 0, "", true))
    return () => {
      removeUserTrasaction()
    }
  }, [])

  const renderTransactions = () => {
    return userTransactions.length > 0 ? userTransactions.map((item, index) => {
      const color = item.type === CONSTANTS.TRANSACTION_TYPE.WITHDRAW ? "light-danger" : "light-primary"
      const icon = item.type === CONSTANTS.TRANSACTION_TYPE.WITHDRAW ? <Icon.ArrowUpLeft size={18} /> : <Icon.ArrowDownRight size={18} />
      return (
        <div key={`${item.title}-${index}`} className='transaction-item cursor-pointer'>
          <Media>
            <Avatar className='rounded' color={color} icon={icon} />
            <Media body>
              <h6 className='transaction-title text-capitalize'>{item.transactionType}</h6>
              <small>{item.reason}</small>
            </Media>
          </Media>
          <div className={`font-weight-bolder ${item.type === CONSTANTS.TRANSACTION_TYPE.WITHDRAW ? 'text-danger' : 'text-success'}`}>
            {item.type === CONSTANTS.TRANSACTION_TYPE.WITHDRAW ? '-' : ''} {' '}
            ${item.amount}
          </div>
        </div>
      )
    }) : null
  }

  return (
    <Card className='card-transaction'>
      <CardHeader>
        <CardTitle tag='h4'>Transactions</CardTitle>
        <Icon.HelpCircle size={18} id="onlineUsersTransaction" className='text-muted cursor-pointer' />
        <UncontrolledTooltip placement='auto' target='onlineUsersTransaction'>
          This will show transaction detials of user
        </UncontrolledTooltip>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
