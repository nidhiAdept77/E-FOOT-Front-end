import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, CardBody, Row, Col } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import ReactPaginate from 'react-paginate'


import Breadcrumbs from '@components/breadcrumbs'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {columns} from './layoutColumn'


const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

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

export default function LayoutSettings() {
    const [dataToRender, setDataToRender] = useState([])
    return (
        <>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Layout Settings" />} breadCrumbActive={<FormattedMessage id="Layout Settings" />} />
            <Card>
                <CardBody>
                    <Row>
                        <Col  lg='12'>
                        <DataTable
                            noHeader
                            pagination
                            subHeader
                            responsive
                            paginationServer
                            columns={columns}
                            sortIcon={<ChevronDown />}
                            className='react-dataTable'
                            paginationComponent={CustomPagination}
                            data={dataToRender}
                        />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}
