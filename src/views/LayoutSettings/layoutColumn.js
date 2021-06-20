// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, FileText } from 'react-feather'

export const columns = [
  {
    name: ':Page Names',
    minWidth: '320px',
    selector: 'pageName',
    sortable: true,
    cell: row => row.pageName
  },
  {
    name: 'Description',
    minWidth: '138px',
    selector: 'decription',
    sortable: true,
    cell: row => <span className='text-capitalize'>{row.decription}</span>
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/user/view/${row.id}`}
            className='w-100'
            // onClick={() => store.dispatch(getUser(row.id))}
          >
            <FileText size={14} className='mr-50' />
            <span className='align-middle'>Details</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
