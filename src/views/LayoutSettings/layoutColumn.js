// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, FileText, Archive, Trash, Edit } from 'react-feather'

export const columns = [
  {
    name: 'Page',
    selector: 'page',
    sortable: true,
    cell: row => row.page
  },
  {
    name: 'Position',
    selector: 'position',
    sortable: true,
    cell: row => <span className='text-capitalize'>{row.position}</span>
  },
  {
    name: 'Status'
  },
  {
    name: 'Actions',
    sortable: false,
    cell: row => (
      <div className='d-flex'>
          {/* <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <FileText size={15} />
                <span className='align-middle ml-50'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={15} />
                <span className='align-middle ml-50'>Archive</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Trash size={15} />
                <span className='align-middle ml-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          <a href={`/layout-settings/${row._id}`}><Edit size={15} /></a>
        </div>
    )
  }
]
