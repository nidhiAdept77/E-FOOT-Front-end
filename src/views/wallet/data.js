import { Badge } from 'reactstrap'
import {getFormattedDate} from '@src/utils/'

const type = {
    deposit: { title: 'Deposit', color: 'light-primary' },
    withdraw: { title: 'withdraw', color: 'light-danger' }
}

export const data = [
    {
        type: "deposit",
        date: "10-07-2021",
        amount: 100,
        reason: "Won in a challange",
        cb:1000
    },
    {
        type: "withdraw",
        date: "09-07-2021",
        amount: 100,
        reason: "Lost in a challange",
        cb:900
    }
]

// ** Table Common Column
export const columns = [
  {
    name: 'Type',
    selector: 'type',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (
        <Badge color={type[row.type].color} pill>
          {type[row.type].title}
        </Badge>
      )
    }
  },
  {
    name: 'Reason',
    selector: 'reason',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    minWidth: '100px',
    cell: row => `$${row.amount}`
  },
  {
    name: 'Closing Balance',
    selector: 'cb',
    sortable: true,
    minWidth: '150px',
    className:"text-center",
    cell: row => (row.closingBalance ? `$${row.closingBalance}` : '-')
  },
  {
    name: 'Date',
    selector: 'createdAt',
    sortable: true,
    minWidth: '150px',
    cell: row => `${getFormattedDate(row.value)}`
  }
]