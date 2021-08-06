import { Badge } from 'reactstrap'
import {getFormattedDate} from '@src/utils/'
import {CONSTANTS} from '@src/utils/CONSTANTS'
const type = {
    deposit: { title: 'Deposit', color: 'light-primary' },
    withdraw: { title: 'withdraw', color: 'light-danger' }
}

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
    name: "Stauts",
    selector: "status",
    minWidth: '150px',
    cell: row => {
      const color = CONSTANTS.TRANSACTION_STATUS.COMEPLETED === row.status ? "light-success" : "light-warning"
      return (
        <Badge color={color} pill>
          {row.status}
        </Badge>
      )
    }
  },
  {
    name: 'Date',
    selector: 'updatedAt',
    sortable: true,
    minWidth: '150px',
    cell: row => `${getFormattedDate(row.updatedAt)}`
  }
]