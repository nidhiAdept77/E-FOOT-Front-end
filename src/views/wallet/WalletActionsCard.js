import React, { useState, useEffect } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Col, Card, CardBody, CardText, Button, Row } from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import {addUserPaymentMethods, depositAmount, getAllUserPaymentMethods, removeAllUserPaymentMethods} from '@src/redux/actions/wallet'
import UserPaymentMetods from './components/UserPaymentMetods'
import DepositModal from './components/DepositModal'
const depositUrl = require('@src/assets/images/wallets/deposit.svg').default
const withdrawUrl = require('@src/assets/images/wallets/withdraw.svg').default


export default function WalletActionsCard() {
    const [active, setActive] = useState('1')
    const dispatch = useDispatch()
    const {userPaymentMethods} = useSelector(state => state.wallet)
    console.log('userPaymentMethods: ', userPaymentMethods)
    const toggle = tab => {
        if (active !== tab) {
        setActive(tab)
        }
    }

    useEffect(() => {
        dispatch(getAllUserPaymentMethods())
        return () => {
            dispatch(removeAllUserPaymentMethods())
        }
    }, [])
    const handleAddPaymentMethod = () => {
        dispatch(addUserPaymentMethods())
    }

    const handleDepositFund = () => {
        dispatch(depositAmount())
    }

    return (
        <Col md="12" className="wallet-actions">
           <Nav tabs>
                <NavItem>
                    <NavLink
                        active={active === '1'}
                        onClick={() => {
                        toggle('1')
                        }}
                    >
                        Payment Methods
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '2'}
                        onClick={() => {
                        toggle('2')
                        }}
                    >
                        Deposit
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '3'}
                        onClick={() => {
                        toggle('3')
                        }}
                    >
                        Withdraw
                    </NavLink>
                </NavItem>
            </Nav> 
            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='1'>
                    <UserPaymentMetods paymentMethods={userPaymentMethods}/>
                </TabPane>
                <TabPane tabId='2'>
                    <Card className='card-congratulations-medal'>
                        <CardBody className='pl-0 pr-0'>
                            <Row>
                                <Col md={6}>
                                    <h5>Deposit!</h5>
                                    <CardText className='font-small-3'>
                                        You can deposit to ef-nl wallet from you account.
                                    </CardText>
                                    {/* <Button.Ripple 
                                        block 
                                        color='gradient-primary'
                                        onClick={handleDepositFund}
                                    >
                                        Deposit
                                    </Button.Ripple> */}
                                    <DepositModal />
                                </Col>
                                <Col md={6}>
                                    <img src={depositUrl} className="w-100" />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </TabPane>
                <TabPane tabId='3'>
                    <Card className='card-congratulations-medal'>
                        <CardBody className='pl-0 pr-0'>
                            <Row>
                                <Col md={6}>
                                    <h5>Withdraw!</h5>
                                    <CardText className='font-small-3'>
                                        You can withdraw from ef-nl wallet to your account.
                                    </CardText>
                                    <Button.Ripple block color='gradient-secondary'>Withdraw</Button.Ripple>
                                </Col>
                                <Col md={6}>
                                    <img src={withdrawUrl} className="w-100" />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </TabPane>
            </TabContent>
        </Col>
    )
}
