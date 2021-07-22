import { Badge } from 'reactstrap'

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
    minWidth: '100px'
  },
  {
    name: 'Closing Balance',
    selector: 'cb',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
    minWidth: '150px'
  }
]