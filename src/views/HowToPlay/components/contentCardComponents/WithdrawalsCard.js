import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Row, CardBody, CardHeader, CardTitle, Col } from 'reactstrap'
const imageUrl = require('@src/assets/images/howToPlay/withdraw.png').default

export default function WithdrawalsCard() {
    return (
        <>
            <Col sm="6" className="d-flex justify-content-center align-items-center hide-image">
                <img src={imageUrl} className="w-100" />
            </Col>
            <Col sm="6" >
                <Card className="how_to_play">
                    <CardHeader>
                        <CardTitle tag='h4' className='w-100'>
                            <h2 className='text-primary font-weight-bold'>
                                <FormattedMessage id="Withdrawals" />
                            </h2>
                            <hr />
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col lg='12'>
                                <p>
                                    We are continuously looking for ways to offer you convenient and cost-efficient deposit/withdrawal solutions to reduce bank charges and maximize your earnings. We are partnering with EU Banks and regulated financial institutions to offer a secure payment system that allows you to deposit in several currencies using fair and transparent conversion rates.
                                </p>
                                <p>
                                    Our Withdrawal process is one of the fastest in the skill gaming industry (3 to 5 working days) and 1 Euro bank charges for transfers within EU countries and UK. However, we also offer an express withdraw service (within 24 hours) for a service fee of 3 Euros for those players interested in urgent withdraws.
                                </p>
                                <p>
                                    The withdraw process is very simple, you just need to update your Bank/PayPal details in your E-FOOT.NL profile and submit a request for the amount you want to withdraw by using the withdrawal button in the main menu.
                                </p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}
