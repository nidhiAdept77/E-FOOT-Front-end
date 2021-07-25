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
  const transactionsArr = [
    {
      title: 'Wallet',
      color: 'light-danger',
      subtitle: 'Withdraw Money',
      amount: '- $74',
      Icon: Icon['ArrowUpRight'],
      down: true
    },
    {
      title: 'Wallet',
      color: 'light-primary',
      subtitle: 'Add Money',
      amount: '+ $480',
      Icon: Icon['ArrowDownLeft']
    },
    {
      title: 'Wallet',
      color: 'light-primary',
      subtitle: 'Add Money',
      amount: '+ $590',
      Icon: Icon['ArrowDownLeft']
    },
    {
      title: 'Wallet',
      color: 'light-danger',
      subtitle: 'Withdraw Money',
      amount: '- $12',
      Icon: Icon['ArrowUpRight'],
      down: true
    },
    {
      title: 'Wallet',
      color: 'light-primary',
      subtitle: 'Add Money',
      amount: '+ $98',
      Icon: Icon['ArrowDownLeft']
    }
  ]
  useEffect(() => {
    dispatch(getUserTransactions(5, 0, ""))
  }, [])

  const renderTransactions = () => {
    return userTransactions.length > 0 ? userTransactions.map((item, index) => {
      // console.log('item, index: ', item, index)
      const color = item.type === CONSTANTS.TRANSACTION_TYPE.WITHDRAW ? "light-danger" : "light-primary"
      const icon = item.type === CONSTANTS.TRANSACTION_TYPE.WITHDRAW ? <Icon.ArrowDownRight size={18} /> : <Icon.ArrowDownLeft size={18} />
      console.log('icon: ', icon)
      console.log('color: ', color)
      return (
        <div key={`${item.title}-${index}`} className='transaction-item cursor-pointer'>
          <Media>
            <Avatar className='rounded' color={color} icon={icon} />
            <Media body>
              <h6 className='transaction-title text-capitalize'>{item.transactionType}</h6>
              <small>{item.reason}</small>
            </Media>
          </Media>
          <div className={`font-weight-bolder ${item.type === CONSTANTS.TRANSACTION_TYPE.WITHDRAW ? 'text-danger' : 'text-success'}`}>${item.amount}</div>
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
