import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Tabs from './components/Tabs'
import Breadcrumbs from '@components/breadcrumbs'
import { Row, Col, TabContent, TabPane, Card, CardBody, InputGroup, Input, Button } from 'reactstrap'
import { showToastMessage } from '../../redux/actions/toastNotification'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import { connect } from 'react-redux'
import GeneralTabContent from './components/GeneralTabContent'
import PasswordTabContent from './components/PasswordTabContent'
import InfoTabContent from './components/InfoTabContent'
import PsnTabContent from './components/PsnTabContent'
import BankDetailsTabContent from './components/BankDetailsTabContent'
import LoaderComponent from '../components/Loader'
import { FormattedMessage } from 'react-intl'
import { Copy } from 'react-feather'
function Profile({loading, user, showToastMessage}) {
    const [activeTab, setActiveTab] = useState('1'),
    [data, setData] = useState(null)

    const toggleTab = tab => {
        setActiveTab(tab)
    }
    const referralUrl = `${window.location.origin}/register?referral-id=${localStorage.getItem("userId")}`

    return (
        <Fragment>
            <LoaderComponent loading={loading} />
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="My Profile" />} breadCrumbActive={<FormattedMessage id="My Profile" />} />
            <Row>
                {user ?
                    <>
                        <Col className='mb-2 mb-md-0' md='3'>
                            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
                        </Col>
                        <Col md='9'>
                            <Card className="mb-2">
                                <CardBody>
                                    <Row>
                                        <Col className='mb-1' md='12'>
                                            <InputGroup>
                                                <Input 
                                                    type='url'
                                                    id='referralUrl'
                                                    name='referralUrl'
                                                    placeholder={referralUrl}
                                                    defaultValue={referralUrl}
                                                    disabled
                                                />
                                                <Button.Ripple outline color='primary' onClick={() => { 
                                                navigator.clipboard.writeText(referralUrl) 
                                                showToastMessage("copied!", "info")
                                                }}>
                                                    <Copy size={14} />
                                                    <span className='align-middle ms-25 ml-1'>Copy</span>
                                                </Button.Ripple>
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId='1'>
                                            <GeneralTabContent />
                                        </TabPane>
                                        <TabPane tabId='2'>
                                            <InfoTabContent />
                                        </TabPane>
                                        <TabPane tabId='3'>
                                            <PsnTabContent />
                                        </TabPane>
                                        <TabPane tabId='4'>
                                            <BankDetailsTabContent />
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

