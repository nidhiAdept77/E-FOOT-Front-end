import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Tabs from './components/Tabs'
import Breadcrumbs from '@components/breadcrumbs'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'
import { showToastMessage } from '../../redux/actions/toastNotification'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import { connect } from 'react-redux'
import GeneralTabContent from './components/GeneralTabContent'
import PasswordTabContent from './components/PasswordTabContent'
import InfoTabContent from './components/InfoTabContent'
import PsnTabContent from './components/PsnTabContent'
import BankDetailsTabContent from './components/BankDetailsTabContent'

function Profile({loading, user, showToastMessage}) {
    const [activeTab, setActiveTab] = useState('1'),
    [data, setData] = useState(null)

    const toggleTab = tab => {
        setActiveTab(tab)
    }

    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='My Profile' breadCrumbActive='My Profile' />
            <Row>
                {user ?
                    <>
                        <Col className='mb-2 mb-md-0' md='3'>
                            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
                        </Col>
                        <Col md='9'>
                            <Card>
                                <CardBody>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId='1'>
                                            <GeneralTabContent data={user} />
                                        </TabPane>
                                        <TabPane tabId='2'>
                                            <InfoTabContent data={user} />
                                        </TabPane>
                                        <TabPane tabId='3'>
                                            <PsnTabContent data={user} />
                                        </TabPane>
                                        <TabPane tabId='4'>
                                            <BankDetailsTabContent data={user} />
                                        </TabPane>
                                        <TabPane tabId='5'>
                                            <PasswordTabContent />
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </>
                : null}
            </Row>
      </Fragment>
    )
}

Profile.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    showToastMessage: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    user: state.auth.user
})
export default connect(mapStateToProps, {showToastMessage})(Profile)

