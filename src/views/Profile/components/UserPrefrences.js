import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, CustomInput, FormGroup, Label, Row } from 'reactstrap'
import _ from "underscore"
import {updateUserPrefrences} from '../../../redux/actions/auth'
import {showToastMessage} from '../../../redux/actions/toastNotification'
import { getFieldValue } from '../../../utils'

export default function UserPrefrences() {
    
    const [payment, setPayment] = useState(false)
    const [chat, setChat] = useState(false)
    const [deposit, setDeposit] = useState(false)
    const [withdraw, setWithdraw] = useState(false)
    const [challange, setChallange] = useState(false)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    
    useEffect(() => {
        if (!_.isEmpty(user.preferences)) {
            setChat(!!getFieldValue(user, "preferences.chat"))
            setPayment(!!getFieldValue(user, "preferences.payment"))
            setDeposit(!!getFieldValue(user, "preferences.deposit"))
            setWithdraw(!!getFieldValue(user, "preferences.withdraw"))
            setChallange(!!getFieldValue(user, "preferences.challange"))
        }
        return () => {
            setChat(false)
            setPayment(false)
            setDeposit(false)
            setWithdraw(false)
            setChallange(false)
        }
    }, [user.preferences])

    const onSubmit = async () => {
        try {
            dispatch(updateUserPrefrences({userId: localStorage.getItem("userId"), chat, deposit, withdraw, challange, payment}))
        } catch (error) {
            console.error('%c 🍫 error: ', 'font-size:20px;background-color: #465975;color:#fff;', error)
            
        }
    }
    return !_.isEmpty(user) ? (<>
        <Row>
            <Col xs={12}>
                <FormGroup>
                    <Row>
                        <Col xs={8}>
                            <Label for='chat'>Chat Notification (Room creation, Message received)</Label>
                        </Col>
                        <Col xs={4}>
                            <CustomInput type='switch' id='chat' name='icon-primary' checked={chat} onChange={() => setChat(!chat)} inline />
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
            <Col xs={12}>
                <FormGroup>
                    <Row>
                        <Col xs={8}>
                            <Label for='withdraw'>Withdraw (We will provide notifcation for the successful or failed transaction)</Label>
                        </Col>
                        <Col xs={4}>
                            <CustomInput type='switch' id='withdraw' name='icon-primary' onChange={() => setWithdraw(!withdraw)} checked={withdraw} />
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
            <Col xs={12}>
                <FormGroup>
                    <Row>
                        <Col xs={8}>
                            <Label for='deposit'>Deposit (We will provide notifcation for succcessful deposit or failed transaction)</Label>
                        </Col>
                        <Col xs={4}>
                            <CustomInput type='switch' id='deposit' name='icon-primary' onChange={() => setDeposit(!deposit)} checked={deposit} />
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
            <Col xs={12}>
                <FormGroup>
                    <Row>
                        <Col xs={8}>
                            <Label for='challange'>Challange (User will get notification for challange invite challange accepted and result)</Label>
                        </Col>
                        <Col xs={4}>
                            <CustomInput type='switch' id='challange' name='icon-primary' onChange={() => setChallange(!challange)} checked={challange} />
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
            <Col className='mt-1' sm='12'>
                <Button.Ripple onClick={onSubmit} className='mr-1' color='primary'>
                    Save changes
                </Button.Ripple>
            </Col>
        </Row>
    </>) : null
}
