import React, {useState} from 'react'
import '@styles/base/pages/page-auth.scss'
import Avatar from '@components/avatar'
import { Button, Card, CardBody, CardText, Col, Row} from 'reactstrap'
import { GiSplitCross } from "react-icons/gi"

export default function PaymentSuccess() {
    const [message, setMessage] = useState("")

    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
            <Card className='payment-card card-congratulations failure mb-0'>
                <CardBody className='text-center'>
                    <Avatar icon={<GiSplitCross />} className='shadow payment-icon' color='transparent' size='xl' />
                    <div className='text-center'>
                        <h1 className='mb-1 text-white'>Sorry Your transition failed</h1>
                        <CardText className='m-auto w-75'>
                            {message}
                        </CardText>
                    </div>
                </CardBody>
            </Card>
            <Row>
                <Col md={6}>
                    <Button.Ripple 
                        color='flat-danger'
                        href="/wallet"
                        block>
                            Go to Wallet
                        </Button.Ripple>
                </Col>
                <Col md={6}>
                    <Button.Ripple 
                        color='flat-primary'
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
