// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, FileText, Archive, Trash, Edit } from 'react-feather'
import { CONSTANTS } from "../../utils/CONSTANTS"
import {updateLayourSetting} from '@src/redux/actions/layoutSettings'
import { showToastMessage } from '@src/redux/actions/toastNotification'

const updateConfig = {
  testing: "isQaVisible",
  staging: "isProdVisible",
  live: "isLiveVisible"
}

const handleClick = async (environment, data) => {
  data = { ...data, id: data._id, [updateConfig[environment]]: true }
  delete data._id
  try {
    const result = await updateLayourSetting(data)
    if (result.success) {
      showToastMessage(result.message, "success")
    } else {
      showToastMessage(result.message, "error")
    }
  } catch (error) {
    showToastMessage(error.message, "error")
  }
}

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
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem className='w-100' onClick={() => handleClick(CONSTANTS.ENV_TYPE.TESTING, row)}>
                <FileText size={15} />
                <span className='align-middle ml-50'>Testing</span>
              </DropdownItem>
              <DropdownItem className='w-100' onClick={() => handleClick(CONSTANTS.ENV_TYPE.STAGING, row)}>
                <Archive size={15} />
                <span className='align-middle ml-50'>Staging</span>
              </DropdownItem>
              <DropdownItem className='w-100' onClick={() => handleClick(CONSTANTS.ENV_TYPE.LIVE, row)}>
                <Trash size={15} />
                <span className='align-middle ml-50'>Live</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <a href={`/layout-settings/${row._id}`}><Edit size={15} /></a>
        </div>
    )
  }
]
