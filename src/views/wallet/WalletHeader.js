import React from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import LoaderComponent from '../components/Loader'
import { Button, Card, Col, Row } from 'reactstrap'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import CardBody from 'reactstrap/lib/CardBody'
import { IoWalletSharp } from "react-icons/io5"

export default function WalletHeader() {
    return (
        <>
        <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Wallet" />} breadCrumbActive={<FormattedHTMLMessage id="Wallet" />} />
            <Card>
                <LoaderComponent loading={false} />
                {/* <Row className='mx-0 w-100'> */}
                    <Card>
                        <CardBody>
                            <Row className="match-height">
                                <Col md={6}>
                                    <Card className="card-congratulations">
                                        <div className="toalBalance">
                                            <Row>
                                                <Col xs={8} className="balance-content">
                                                    <p className="balance-heading font-weight-bolderer">Total Balance</p>
                                                    <p className="balance font-weight-bolderer">$ 10000</p>
                                                </Col>
                                                <Col xs={4} >
                                                    <IoWalletSharp className="walllet-icon" />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <div className="wallet-actions">
                                        <Row>
                                            <Button.Ripple type="submit" className='send btn-icon' color='gradient-primary'>
                                                Deposit
                                            </Button.Ripple>
                                            <Button.Ripple type="submit" className='send btn-icon ml-1' color='gradient-secondary'>
                                                Withdrawals
                                            </Button.Ripple>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                {/* </Row> */}
            </Card>
        </>
    )
}
