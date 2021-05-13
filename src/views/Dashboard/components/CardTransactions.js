import Avatar from '@components/avatar'
import * as Icon from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip'

const CardTransactions = () => {
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

  const renderTransactions = () => {
    return transactionsArr.map((item, index) => {
      return (
        <div key={`${item.title}-${index}`} className='transaction-item'>
          <Media>
            <Avatar className='rounded' color={item.color} icon={<item.Icon size={18} />} />
            <Media body>
              <h6 className='transaction-title'>{item.title}</h6>
              <small>{item.subtitle}</small>
            </Media>
          </Media>
          <div className={`font-weight-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.amount}</div>
        </div>
      )
    })
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
