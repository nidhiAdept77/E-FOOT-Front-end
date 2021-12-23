import React, { Fragment, useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { FormattedMessage } from 'react-intl'
import LoaderComponent from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Row, Col, Label, Input, TabContent, Nav, NavItem, NavLink } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather' 
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { CONSTANTS } from '../../utils/CONSTANTS'
import ReactPaginate from 'react-paginate'

// ** Add New Modal Component
import {columns} from "./components/myMatchesColumns"
import UploadScore from './components/uploadScore'
import DisputeModal from './components/dispute'

import { getPaginatedChallenges, removeChallenges, subsChallenges, updateChallenges } from '../../redux/actions/challenges'
import Alert from 'reactstrap/lib/Alert'

let challengesSubs
const MyMatches = props => {

    const dispatch = useDispatch()
    const {loading, total, challenges} = useSelector(state => state.challenges)
    const {user} = useSelector(state => state.auth)
    
    const [searchValue, setSearchValue] = useState('')
    const [limit, setLimit] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)
    const [active, setActive] = useState(CONSTANTS.STATUS.ACTIVE)

    const STATUS = [
        CONSTANTS.STATUS.ACTIVE,
        CONSTANTS.STATUS.PENDING,
        CONSTANTS.STATUS.ACCEPTED,
        CONSTANTS.STATUS.WIN,
        CONSTANTS.STATUS.LOSE,
        CONSTANTS.STATUS.DRAW,
        CONSTANTS.STATUS.DISPUTE,
        CONSTANTS.STATUS.FINISHED,
        CONSTANTS.STATUS.EXPIRED
    ]
    
    useEffect(() => {
        dispatch(getPaginatedChallenges(limit, currentPage, searchValue, CONSTANTS.STATUS.BOTH, active, user._id))
        return () => {
            dispatch(removeChallenges())
        }
    }, [searchValue])

    useEffect(() => {
      if (challengesSubs?.subscription) {
        challengesSubs.subscription.unsubscribe()
      }
      challengesSubs = dispatch(
        subsChallenges((challenge) => {
          dispatch(updateChallenges(challenge))
        })
      )
      return () => {
        if (challengesSubs?.subscription) {
          challengesSubs.subscription.unsubscribe()
        }
      }
    }, [])

    const handleFilter = (value) => {
        setSearchValue(value)
        setTimeout(() => {
            dispatch(getPaginatedChallenges(limit, currentPage, searchValue, CONSTANTS.STATUS.BOTH, active, user._id))
        }, 100)
    }

    const handlePagination = page => {
        dispatch(getPaginatedChallenges(limit, currentPage, searchValue, CONSTANTS.STATUS.BOTH, active, user._id))
        setCurrentPage(page.selected + 1)
    }

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
            dispatch(getPaginatedChallenges(limit, currentPage, searchValue, CONSTANTS.STATUS.BOTH, tab, user._id))
        }
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

    const NavItems = (navs) => {
        return navs.map(nav => (
            <NavItem>
                <NavLink
                    active={active === nav}
                    onClick={() => {
                    toggle(nav)
                    }}
                    className="text-capitalize"
                >
                    {nav}
                </NavLink>
            </NavItem>
        ))
    }

    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Matches" />} breadCrumbActive={<FormattedMessage id="My Matches" />} />
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
                </Row>
                <Row className='mx-0 p-1'>
                    <Alert color="warning">
                        <p className="alert-heading">
                            Note:
                            <br />
                            If you failed to upload the scores within 24 hours then WIN, LOSE and DRAW will be decided based on the person who has uploaded the score.
                        </p>
                    </Alert>
                </Row>
                <Row className='mx-0 p-1'>
                <Nav tabs>
                    {NavItems(STATUS)}
                </Nav>
                </Row>
                <TabContent className='py-50' activeTab={active}>
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
                        data={challenges}
                    />
                </TabContent>
            </Card>
            <UploadScore />
            <DisputeModal />
        </Fragment>
    )
}

export default MyMatches