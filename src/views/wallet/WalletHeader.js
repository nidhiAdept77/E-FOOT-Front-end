import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import LoaderComponent from '../components/Loader'
import { Card, Col, Row } from 'reactstrap'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import CardBody from 'reactstrap/lib/CardBody'
import { GiWallet } from "react-icons/gi"
import WalletActionsCard from './WalletActionsCard'
import { useDispatch, useSelector } from 'react-redux'
import {getUserCashPosition, removeCashPosition, getUserCashPositionSubscription, setUserCashPosition} from '@store/actions/wallet'
import _ from 'underscore'
let cashPositionSub
export default function WalletHeader() {
    const {userCashPosition} = useSelector(state => state.wallet)
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(0)
    const [playingPower, setPlayingPower] = useState(0)
    const [holdingAmount, setHoldingAmount] = useState(0)
    
    useEffect(() => {
        if (!_.isEmpty(userCashPosition)) {
            setAmount(userCashPosition.amount)
            setPlayingPower(userCashPosition.playingPower)
            setHoldingAmount(userCashPosition.cumulativeHoldAmount)
        }
    }, [userCashPosition])

    useEffect(() => {
        dispatch(getUserCashPosition(cashposition => {
            dispatch(setUserCashPosition(cashposition))
        }))

        cashPositionSub = dispatch(getUserCashPositionSubscription(cashposition => {
            dispatch(setUserCashPosition(cashposition))
        }))
        return () => {
            dispatch(removeCashPosition())
            if (cashPositionSub && cashPositionSub.subscription) {
                cashPositionSub.subscription.unsubscribe()
            }
        }
    }, [])
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
                                                <p>
                                                    <p className="balance-heading font-weight-bolderer text-center">Total Balance</p>
                                                    <p className="balance font-weight-bolderer text-center">$ {amount}</p>
                                                </p>
                                                <Row>
                                                    <Col xs={6} className="">
                                                        <p>
                                                            <p className="sub-balance font-weight-bolderer">Playing Power</p>
                                                            <p className="sub-balance font-weight-bolderer">$ {playingPower}</p>
                                                        </p>
                                                    </Col>
                                                    <Col xs={6} className="">
                                                        <p>
                                                            <p className="sub-balance font-weight-bolderer">Holding Amount</p>
                                                            <p className="sub-balance font-weight-bolderer">$ {holdingAmount}</p>
                                                        </p>
                                                    </Col>
                                                </Row>
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
