import React, { useEffect, useState } from 'react'
import { Button, Col, FormGroup, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap'
import { ArrowLeft } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import Cleave from 'cleave.js/react'
const _ = require('underscore')
import {removeComma} from '@src/utils'
import {showToastMessage} from '@store/actions/toastNotification'
import {withdrawalAmount} from '@store/actions/wallet'

export default function WithdrawAmount({stepper, type, selectedMethod, modalClose}) {
    const dispatch = useDispatch()
    const {userCashPosition} = useSelector(state => state.wallet)
    const [holdingAmount, setHoldingAmount] = useState(0)
    const [amount, setAmount] = useState(0)
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const options = { numeral: true, numeralThousandsGroupStyle: 'thousand' }
    
    useEffect(() => {
        if (!_.isEmpty(userCashPosition)) {
            setAmount(userCashPosition.amount)
            setHoldingAmount(userCashPosition.cumulativeHoldAmount)
        }
    }, [userCashPosition])

    const handleWithdraw = () => {
        if (withdrawAmount) {
            modalClose()
            const amountWithdraw = parseFloat(removeComma(withdrawAmount))
            if (amountWithdraw > (amount - holdingAmount)) {
                dispatch(showToastMessage("Withdrawal amount is greater than avaiable for withdraw", "error"))
            }
            dispatch(withdrawalAmount(amountWithdraw, selectedMethod))
            setWithdrawAmount(0)
        } else {
            dispatch(showToastMessage("Please Provide amount to withdraw", "error"))
        }
    }
    return (
        <div>
            <div className='content-header'>
                <h5 className='mb-0'>Amount</h5>
                <small className='text-muted'>Enter amount and check the payment method.</small>
            </div>
            <Row className="mt-2 mb-2">
                <Col md='6' sm='12'>
                    <p className="pt-2 text-center">
                        Your available amount for withdrawal 
                        <h3 className="font-weight-bolderer">
                            ${amount - holdingAmount}
                        </h3>
                    </p>
                </Col>
                <Col md='6' sm='12' className='flex-center'>
                    <InputGroup>
                        <FormGroup className='form-label-group mb-0'>
                            <Cleave 
                                className='form-control' 
                                placeholder='Enter Withdrawal Amount' 
                                options={options} 
                                value={withdrawAmount}
                                onChange={e => setWithdrawAmount(e.target.value)}
                                id='numeral-formatting' />
                            <Label for='floatingInput'>Enter Withdrawal Amount</Label>
                        </FormGroup>
                        <InputGroupAddon addonType='append'>
                            <Button 
                                color='danger'
                                outline 
                                onClick={e => setWithdrawAmount(amount - holdingAmount)}>
                                Max
                            </Button>
                        </InputGroupAddon>

                    </InputGroup>
                </Col>
                <Col md="12">
                    <p className="pt-2 text-center">
                        Your Selected PaymentMethod for Withdrawal 
                        <h5 className="font-weight-bolderer text-primary">
                            {selectedMethod}
                        </h5>
                    </p>
                </Col>
            </Row>
            <div className='d-flex justify-content-between'>
                <Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()} outline>
                    <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                    <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                </Button.Ripple>
                <Button.Ripple color='success' className='btn-next' onClick={handleWithdraw}>
                    <span className='align-middle d-sm-inline-block d-none'>Withdraw</span>
                </Button.Ripple>
            </div>
        </div>
    )
}
