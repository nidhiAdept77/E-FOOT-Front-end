import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Button, Card, CardBody, Col, Media, Row } from 'reactstrap'
import Avatar from '@components/avatar'
import _ from 'underscore'
import { RiPaypalLine } from "react-icons/ri"
import {addUserPaymentMethods} from '@src/redux/actions/wallet'

export default function UserPaymentMetods({paymentMethods}) {
    const dispatch = useDispatch()
    const [paymentMethodRef, setPaymentmethodRef] = useState(null)
    
    const createPaymentMethodCard = () => {
        if (!_.isEmpty(paymentMethods)) {
            if (!_.isEmpty(paymentMethods.paypal)) {
                let data = []
                data = paymentMethods.paypal.map(paymentMethod => (
                    <Col md={6} className="p-0">
                        <Card className='card-congratulations-medal mb-1'>
                            <CardBody className='p-0'>
                                <Media>
                                    <Avatar color='light-primary' className='rounded mr-1' icon={<RiPaypalLine size={18} />} />
                                    <Media body>
                                    <h6 className='mb-0'>{paymentMethod.paypalId}</h6>
                                    <small>{paymentMethod.paypalEmailId}</small>
                                    </Media>
                                </Media>
                            </CardBody>
                        </Card>
                    </Col>
                  ))
                return data
            } else return null
        } else {
            return null
        }
    }
    
    const handleAddPaymentMethod = () => {
        dispatch(addUserPaymentMethods())
    }
    return (
        <Card className='card-congratulations-medal'>
            <CardBody className='pl-0 pr-0 pt-0'>
                <Row>
                    <Col  md={6}>
                    </Col>
                    <Col md={6}>
                        <Button.Ripple 
                            block 
                            onClick={handleAddPaymentMethod}
                            color='gradient-primary'>
                                Add Payment Method
                        </Button.Ripple>
                    </Col>
                </Row>
                <PerfectScrollbar
                    containerRef={el => setPaymentmethodRef(el)}
                    className='user-payment-mehtods mt-2 '
                    options={{ wheelPropagation: false }}
                >
                    <Row className="ml-1 mr-1">
                        {createPaymentMethodCard()}
                    </Row>
                </PerfectScrollbar>
            </CardBody>
        </Card>
    )
}
