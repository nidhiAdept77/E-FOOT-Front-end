import React, { Fragment, useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { FormattedMessage } from 'react-intl'
import LoaderComponent from '../components/Loader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Row, Col, Label, Input, Button, CardHeader } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown, Plus } from 'react-feather' 
import '@styles/react/libs/tables/react-dataTable-component.scss'

import {getUsersRoom, removeUsersRoom} from '@src/redux/actions/rooms'
import ReactPaginate from 'react-paginate'

// ** Add New Modal Component
import AddEditRoom from './components/addEditRoom'
import {columns} from "./components/roomColumns"

function Rooms({loading, total, getUsersRoom, removeUsersRoom, rooms}) {

    const [searchValue, setSearchValue] = useState('')
    const [limit, setLimit] = useState(7)
    const [currentPage, setCurrentPage] = useState(0)
    const [modal, setModal] = useState(false)

    useEffect(() => {
        getUsersRoom(limit, currentPage, searchValue)
        return () => {
            removeUsersRoom()
        }
    }, [])

    const handleFilter = (value) => {
        setSearchValue(value)
        setTimeout(() => {
            getUsersRoom(limit, currentPage, value)
        }, 100)
    }

    const handlePagination = page => {
        getUsersRoom(limit, page.selected, searchValue)
        setCurrentPage(page.selected + 1)
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number(Math.ceil(total / limit))

        return (
        <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            pageCount={count || 1}
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

    // ** Function to handle Modal toggle
    const handleModal = () => setModal(!modal)

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
                    <Col className="w-100 text-right">
                        <Button className='ml-2' color='primary' onClick={handleModal}>
                        <Plus size={15} />
                        <span className='align-middle ml-50'>Add Room</span>
                        </Button>
                    </Col>
                </Row>

                <DataTable
                    noHeader
                    pagination
                    columns={columns || []}
                    paginationPerPage={limit}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={rooms}
                />
            </Card>
            <AddEditRoom open={modal} handleModal={handleModal} />
        </Fragment>
    )
}

Rooms.propTypes = {
    loading: PropTypes.bool.isRequired,
    getUsersRoom: PropTypes.func.isRequired,
    removeUsersRoom: PropTypes.func.isRequired,
    rooms: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
    loading: state.rooms.loading,
    total: state.rooms.total,
    rooms: state.rooms.rooms
})

export default connect(mapStateToProps, {getUsersRoom, removeUsersRoom})(Rooms)