import { Fragment, useState, forwardRef, useEffect } from 'react'

// ** Table Data & Columns
import {columns } from './data'

// ** Add New Modal Component

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, FileText } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row
} from 'reactstrap'
import {getUserTransactions, removeUserTrasaction, setTransactions, getusersTransactionSubscription} from '@src/redux/actions/wallet'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useSelector, useDispatch } from 'react-redux'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
let transactionSubs
const WalletTable = () => {
    // ** States
    const [limit, setLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch()
    const {userTransactions: data, total} = useSelector(state => state.wallet)
    
    useEffect(() => {
      dispatch(getUserTransactions(limit, currentPage, searchValue))
      transactionSubs = dispatch(getusersTransactionSubscription(transaction => {
        dispatch(setTransactions(transaction))
      }))
      return () => {
        dispatch(removeUserTrasaction())
        if (transactionSubs && transactionSubs.subscription) {
          transactionSubs.subscription.unsubscribe()
      }
      }
    }, [])
  
    // ** Function to handle Modal toggle
    const handleFilter = (value) => {
      setSearchValue(value)
      setTimeout(() => {
          dispatch(getUserTransactions(limit, currentPage, value))
      }, 100)

    }
    
    // ** Function to handle Pagination
    const handlePagination = page => {
      dispatch(getUserTransactions(limit, page.selected, searchValue))
      setCurrentPage(page.selected)
    }
  
    // ** Custom Pagination
    const CustomPagination = () => (
      <ReactPaginate
        previousLabel=''
        nextLabel=''
        forcePage={currentPage}
        onPageChange={page => handlePagination(page)}
        pageCount={total}
        breakLabel='...'
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName='active'
        pageClassName='page-item'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        nextLinkClassName='page-link'
        nextClassName='page-item next'
        previousClassName='page-item prev'
        previousLinkClassName='page-link'
        pageLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
      />
    )
  
    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
      let result
  
      const columnDelimiter = ','
      const lineDelimiter = '\n'
      const keys = Object.keys(data[0])
  
      result = ''
      result += keys.join(columnDelimiter)
      result += lineDelimiter
  
      array.forEach(item => {
        let ctr = 0
        keys.forEach(key => {
          if (ctr > 0) result += columnDelimiter
  
          result += item[key]
  
          ctr++
        })
        result += lineDelimiter
      })
  
      return result
    }
  
    // ** Downloads CSV
    function downloadCSV(array) {
      const link = document.createElement('a')
      let csv = convertArrayOfObjectsToCSV(array)
      if (csv === null) return
  
      const filename = 'export.csv'
  
      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`
      }
  
      link.setAttribute('href', encodeURI(csv))
      link.setAttribute('download', filename)
      link.click()
    }
  
    return (
      <Fragment>
        <Card>
          <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
            <CardTitle tag='h4'>Transactions</CardTitle>
            <div className='d-flex mt-md-0 mt-1'>
              <UncontrolledButtonDropdown>
                <DropdownToggle color='secondary' caret outline>
                  <Share size={15} />
                  <span className='align-middle ml-50'>Export</span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                    <FileText size={15} />
                    <span className='align-middle ml-50'>CSV</span>
                  </DropdownItem>
                  {/* <DropdownItem className='w-100'>
                    <Grid size={15} />
                    <span className='align-middle ml-50'>Excel</span>
                  </DropdownItem>
                  <DropdownItem className='w-100'>
                    <File size={15} />
                    <span className='align-middle ml-50'>Text</span>
                  </DropdownItem> */}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </CardHeader>
          <Row className='justify-content-end mx-0'>
            {/* <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
              <Label className='mr-1' for='search-input'>
                Search
              </Label>
              <Input
                className='dataTable-filter mb-50'
                type='text'
                bsSize='sm'
                id='search-input'
                value={searchValue}
                onChange={handleFilter}
              />
            </Col> */}
          </Row>
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={data}
            selectableRowsComponent={BootstrapCheckbox}
          />
        </Card>
      </Fragment>
    )
  }
export default WalletTable