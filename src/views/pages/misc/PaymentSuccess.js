import React, {useEffect, useState} from 'react'
import '@styles/base/pages/page-auth.scss'
import Avatar from '@components/avatar'
import { Button, Card, CardBody, CardText, Col, Row} from 'reactstrap'
import { GiSplurt } from "react-icons/gi"
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import LoaderComponent from '@src/views/components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {getTransaction, removeTransaction} from '@store/actions/wallet'
import _ from 'underscore'
import { useParams } from 'react-router'


export default function PaymentSuccess() {
    const [amount, setAmount] = useState(0)
    const {payId} = useParams()
    const {loading, transaction} = useSelector(state => state.wallet)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTransaction(payId))
        return () => {
            dispatch(removeTransaction())
        }
    }, [])

    useEffect(() => {
        if (!_.isEmpty(transaction)) {
            setAmount(transaction.amount)
        }
    }, [transaction])

    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <LoaderComponent loading={loading} />
            <div className='auth-inner py-2'>
            <Card className='payment-card card-congratulations mb-0'>
                <CardBody className='text-center'>
                    <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
                    <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
                    <Avatar icon={<GiSplurt />} className='shadow payment-icon' color='primary' size='xl' />
                    <div className='text-center'>
                        <h1 className='mb-1 text-white'>Congratulations,</h1>
                        <CardText className='m-auto w-75'>
                            You have deposited <strong className="amount">${amount}</strong> to your Ef-nl wallet.
                        </CardText>
                    </div>
                </CardBody>
            </Card>
            <Row>
                <Col md={6}>
                    <Button.Ripple 
                        color='flat-primary'
                        href="/wallet"
                        block>
                            Go to Wallet
                        </Button.Ripple>
                </Col>
                <Col md={6}>
                    <Button.Ripple 
                        color='flat-dark'
                        href="/dashboard" 
                        block>
                            Go to home
                    </Button.Ripple>
                </Col>
            </Row>
            </div>
        </div>
    )
}
