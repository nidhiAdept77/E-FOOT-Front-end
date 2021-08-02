import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Button, Card, CardBody, Col, Media, Row } from 'reactstrap'
import Avatar from '@components/avatar'
import _ from 'underscore'
import { RiPaypalLine } from "react-icons/ri"
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import {showToastMessage} from '@store/actions/toastNotification'
export default function PaypalDetails({stepper, type, handlePaymentMethodClick, selectedMethod}) {
    const {userPaymentMethods} = useSelector(state => state.wallet)
    const [paymentMethodRef, setPaymentmethodRef] = useState(null)
    const dispatch = useDispatch()
    
    const handleNext = () => {
        if (!selectedMethod) {
            dispatch(showToastMessage("Please select one payment method", "error"))
        } else {
            stepper.next()
        }
    }

    const createPaymentMethodCard = () => {
        if (!_.isEmpty(userPaymentMethods)) {
            if (!_.isEmpty(userPaymentMethods.paypal)) {
                return userPaymentMethods.paypal.map(paymentMethod => {
                    let cardClass = 'card-congratulations-medal mb-1 payment-details-card cursor-pointer'
                    if (paymentMethod.paypalId === selectedMethod) cardClass += ' active'
                    return (
                        <Col md={6}>
                            <Card className={cardClass} onClick={() => handlePaymentMethodClick(paymentMethod.paypalId)}>
                                <CardBody className='p-1'>
                                    <Media>
                                        <Avatar color='light-white' className='rounded mr-1' icon={<RiPaypalLine size={18} />} />
                                        <Media body>
                                            <h6 className='mb-0'>{paymentMethod.paypalId}</h6>
                                            <small>{paymentMethod.paypalEmailId}</small>
                                        </Media>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                      )
                })
                // return data
            } else return null
        } else {
            return null
        }
    }
    return (
        <div>
            <div className='content-header'>
                <h5 className='mb-0'>Payment Methods</h5>
                <small className='text-muted'>Click the payment method to select</small>
            </div>
            <PerfectScrollbar
                    containerRef={el => setPaymentmethodRef(el)}
                    className='user-payment-mehtods mt-2 '
                    options={{ wheelPropagation: false }}
            >
                <Row className="ml-1 mr-1">
                    {createPaymentMethodCard()}
                </Row>
            </PerfectScrollbar>
            <div className='d-flex justify-content-between'>
                <Button.Ripple color='primary' className='btn-prev' outline disabled>
                    <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                    <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                </Button.Ripple>
                <Button.Ripple color='primary' className='btn-next' onClick={handleNext}>
                    <span className='align-middle d-sm-inline-block d-none'>Next</span>
                    <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                </Button.Ripple>
            </div>
        </div>
    )
}
