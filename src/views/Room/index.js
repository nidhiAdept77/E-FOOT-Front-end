import React, { Fragment, useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { FormattedMessage } from 'react-intl'
import LoaderComponent from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Row, Col, Label, Input } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather' 
import '@styles/react/libs/tables/react-dataTable-component.scss'

import {getPaginatedRooms, removeRooms} from '@src/redux/actions/rooms'
import {setAddEditPopup} from '@src/redux/actions/layout'
import ReactPaginate from 'react-paginate'

// ** Add New Modal Component
import {columns} from "./components/roomColumns"
import AddEditBtn from './components/addEditButtons'
import AddEditRoom from './components/addEditRoom'

const Rooms = props => {

    const dispatch = useDispatch()
    const {loading, total, rooms} = useSelector(state => state.rooms)
    const {addEditPopup} = useSelector(state => state.layout)

    const [searchValue, setSearchValue] = useState('')
    const [limit, setLimit] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        dispatch(getPaginatedRooms(limit, currentPage, searchValue, "private"))
        return () => {
            dispatch(removeRooms())
            dispatch(setAddEditPopup(false))
        }
    }, [searchValue])

    const handleFilter = (value) => {
        setSearchValue(value)
        setTimeout(() => {
            getPaginatedRooms(limit, currentPage, value, "private")
        }, 100)
    }

    const handlePagination = page => {
        dispatch(getPaginatedRooms(limit, page.selected, searchValue, "private"))
        setCurrentPage(page.selected + 1)
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        return (
        <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            pageCount={total || 1}
            activeClassName='active'
            forcePage={currentPage !== 0 ? currentPage - 1 : 0}
            onPageChange={page => handlePagination(page)}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
        />
        )
    }

    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Rooms" />} breadCrumbActive={<FormattedMessage id="Rooms" />} />
            <Card>
                <LoaderComponent loading={loading} />
                <Row className='mx-0 p-1'>
                    <Col className='d-flex mt-1' md='6' sm='12'>
                        <Label className='mr-1' for='search-input'>
                        Search
                        </Label>
                        <Input
                        className='dataTable-filter mb-50'
                        type='text'
                        bsSize='sm'
                        id='search-input'
                        value={searchValue}
                        onChange={e => handleFilter(e.currentTarget.value)}
                        />
                    </Col>
                    <AddEditBtn isAdd={true} />
                </Row>

                <DataTable
                    noHeader
                    pagination
                    paginationServer
                    columns={columns || []}
                    paginationPerPage={limit}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={rooms}
                />
            </Card>
            <AddEditRoom />
        </Fragment>
    )
}

export default Rooms