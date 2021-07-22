import React from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import LoaderComponent from '../components/Loader'
import { Button, Card, Col, Row } from 'reactstrap'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import CardBody from 'reactstrap/lib/CardBody'
import { GiWallet } from "react-icons/gi"
import WalletActionsCard from './WalletActionsCard'

export default function WalletHeader() {
    return (
        <>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Wallet" />} breadCrumbActive={<FormattedHTMLMessage id="Wallet" />} />
            <LoaderComponent loading={false} />
                <Card>
                    <CardBody>
                        <Row className="match-height wallet-heading">
                            <Col md={6}>
                                <Card className="card-congratulations flex-center">
                                    <div className="toalBalance w-100">
                                        <Row>
                                            <Col xs={8} className="balance-content">
                                                <p className="balance-heading font-weight-bolderer">Total Balance</p>
                                                <p className="balance font-weight-bolderer">$ 10000</p>
                                            </Col>
                                            <Col xs={4} className="">
                                                <GiWallet className="walllet-icon" />
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <WalletActionsCard />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
        </>
    )
}
