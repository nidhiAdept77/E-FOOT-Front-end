import React, { Fragment, useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { FormattedMessage } from 'react-intl'
import LoaderComponent from '../components/Loader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Row, Col, Label, Input } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather' 
import '@styles/react/libs/tables/react-dataTable-component.scss'

import {getUsersRoom, removeUsersRoom} from '@src/redux/actions/rooms'
import ReactPaginate from 'react-paginate'

function Rooms({loading, total, getUsersRoom, removeUsersRoom, Rooms}) {

    const [searchValue, setSearchValue] = useState('')
    const [limit, setLimit] = useState(7)
    const [currentPage, setCurrentPage] = useState(0)
    
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

    const columns = [
        {
          name: 'Name',
          selector: 'name',
          sortable: true,
          cell: row => row.name
        }
    ]


    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Rooms" />} breadCrumbActive={<FormattedMessage id="Rooms" />} />
            <Card>
                <LoaderComponent loading={loading} />
                <Row className='justify-content-end mx-0'>
                    <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
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
                    data={getUsersRoom}
                />
            </Card>
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
    total: state.rooms.total
})

export default connect(mapStateToProps, {getUsersRoom, removeUsersRoom})(Rooms)