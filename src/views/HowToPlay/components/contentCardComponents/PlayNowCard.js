import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Row, CardBody, CardHeader, CardTitle, Col } from 'reactstrap'

export default function PlayNowCard() {
    return (
        <Col>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4' className='w-100'> 
                        <h2 className='text-primary font-weight-bold'>
                            <FormattedMessage id="Play Now" />
                        </h2>
                        <hr />
                    </CardTitle>
                </CardHeader> 
                <CardBody>
                    <Row>
                        <Col  lg='12'>
                            <dl>
                                <Row>
                                    <Col sm='3' className='text-primary stepDiv'>
                                        <dt>
                                            Step-1
                                        </dt>
                                    </Col>
                                    <Col sm='9'>
                                        <dd> 
                                            The 'Play Now' button is how you kick off all the different games and exciting new modes available on our site. Simply click 'Play Now'.
                                        </dd>
                                    </Col>
                                </Row>
                            </dl>
                        </Col>
                        <Col  lg='12'>
                            <dl>
                                <Row>
                                    <Col sm='3' className='text-primary stepDiv'>
                                        <dt>
                                            Step-2
                                        </dt>
                                    </Col>
                                    <Col sm='9'>
                                        <dd> 
                                            Choose your game mode.
                                        </dd>
                                    </Col>
                                </Row>
                            </dl>
                        </Col>
                        <Col  lg='12'>
                            <dl>
                                <Row>
                                    <Col sm='3' className='text-primary stepDiv'>
                                        <dt>
                                            Step-3
                                        </dt>
                                    </Col>
                                    <Col sm='9'>
                                        <dd>
                                            Choose the amount you would like to play for.
                                        </dd>
                                    </Col>
                                </Row>
                            </dl>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    )
}
