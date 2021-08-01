import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import {withdrawalAmount} from '@src/redux/actions/wallet'
import {showToastMessage} from '@src/redux/actions/toastNotification'
import { useDispatch, useSelector } from 'react-redux'
import Cleave from 'cleave.js/react'
import _ from 'underscore'
import {removeComma} from '@src/utils'


export default function WithdrawModal() {
    const dispatch = useDispatch()
    const {userCashPosition} = useSelector(state => state.wallet)
    const [amount, setAmount] = useState(0)
    const [holdingAmount, setHoldingAmount] = useState(0)
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const [centeredModal, setCenteredModal] = useState(false)
    const options = { numeral: true, numeralThousandsGroupStyle: 'thousand' }
    
    useEffect(() => {
        if (!_.isEmpty(userCashPosition)) {
            setAmount(userCashPosition.amount)
            setHoldingAmount(userCashPosition.cumulativeHoldAmount)
        }
    }, [userCashPosition])

    const handleWithdraw = () => {
        setCenteredModal(!centeredModal)
        if (withdrawAmount) {
            const amountWithdraw = parseFloat(removeComma(withdrawAmount))
            if (amountWithdraw > (amount - holdingAmount)) {
                dispatch(showToastMessage("Withdrawal amount is greater than avaiable for withdraw", "error"))
            }
            dispatch(withdrawalAmount(amountWithdraw, "BPD4CTEZXJRZ2"))
            setWithdrawAmount(0)
        }
    }
    
    return (
        <div className='theme-danger'>
            <Button.Ripple 
                color="gradient-secondary" 
                onClick={() => setCenteredModal(!centeredModal)} 
                block>
                Withdrawal
            </Button.Ripple>
            <Modal
                isOpen={centeredModal}
                toggle={() => setCenteredModal(!centeredModal)}
                className='modal-dialog-centered modal-lg'
                modalClassName="modal-danger"
            >
            <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Withdrawal</ModalHeader>
            <ModalBody>
                Select amount you want to  withdraw in your Ef-nl Wallet.
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
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="gradient-danger" onClick={handleWithdraw}>
                    Withdrawal
                </Button>
            </ModalFooter>
            </Modal>
        </div>
    )
}
