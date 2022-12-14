import React from 'react'
import { FormattedMessage } from 'react-intl'
import Breadcrumbs from '@components/breadcrumbs'
import JombotronHome from './components/JombotronHome'
import GamesComponent from './components/GamesComponent'
import GlobalChat from './components/GlobalChat'
import { Col, Row } from 'reactstrap'


export default function index() {
    return (
        <div>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Home" />} breadCrumbActive={<FormattedMessage id="Home" />} />

            <Row>
                <Col md="12">
                    <JombotronHome />
                </Col>
                {/* <Col md="4">
                    <GlobalChat />
                </Col> */}
            </Row>
            <Row className='match-height'>

                <Col md="12">
                    <GamesComponent />

                </Col>
            </Row>
        </div>
    )
}
