import AddEditBtn from './addEditButtons'
import Avatar from '@components/avatar'
import { Media } from 'reactstrap'

export const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
    cell: (row) => row.name
  },
  {
    name: "Images",
    selector: "image_url",
    sortable: true,
    cell: (row) => <Media className='mr-25' left>
    <Media object className='rounded mr-50' src={row.image_url} alt='Console Image' height='35' width='60' />
  </Media>
  },
  {
    name: "Actions",
    sortable: false,
    cell: (row) => (
      <AddEditBtn data={row} isAdd={false} />
    )
  }
]