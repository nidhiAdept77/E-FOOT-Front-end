import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Row, Col, Label, Input } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LoaderComponent from '../components/Loader'


import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {columns} from './layoutColumn'
import {getLayoutSettings, removeLayoutSettings} from '@src/redux/actions/layoutSettings'

const LayoutSettings = ({loading, getLayoutSettings, removeLayoutSettings, layoutSettings, total}) => {
    const [limit, setLimit] = useState(7)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    
    useEffect(() => {
        getLayoutSettings(limit, currentPage, searchValue)
        return () => {
            removeLayoutSettings()
        }
    }, [])

    const handleFilter = (value) => {
        setSearchValue(value)
        setTimeout(() => {
            getLayoutSettings(limit, currentPage, value)
        }, 100)

    }
    
    const handlePagination = page => {
        getLayoutSettings(limit, page.selected, searchValue)
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
        <>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Layout Settings" />} breadCrumbActive={<FormattedMessage id="Layout Settings" />} />
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
                    columns={columns}
                    paginationPerPage={limit}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={layoutSettings}
                />
            </Card>
        </>
    )
}

LayoutSettings.propTypes = {
    loading: PropTypes.bool.isRequired,
    layoutSettings: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    getLayoutSettings: PropTypes.func.isRequired,
    removeLayoutSettings: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    loading: state.layoutSettings.loading,
    layoutSettings: state.layoutSettings.layoutSettings,
    total: state.layoutSettings.total
})

export default connect(mapStateToProps, {getLayoutSettings, removeLayoutSettings})(LayoutSettings)