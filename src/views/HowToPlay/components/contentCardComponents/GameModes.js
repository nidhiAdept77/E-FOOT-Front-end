import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Row, CardBody, CardHeader, CardTitle, Col } from 'reactstrap'
const imageUrl = require('@src/assets/images/howToPlay/game-mode.png').default

export default function GameModes() {
    return (
        <>
            <Col md="6">
                <Card className="how_to_play">
                    <CardHeader>
                        <CardTitle tag='h4' className='w-100'>
                            <h2 className='text-primary font-weight-bold'>
                                <FormattedMessage id="Game Modes" />

                            </h2>
                            <hr />
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col lg='12'>
                                <h4 className='text-primary font-weight-bold'>
                                    What is a FREE Play 1vs1?
                                </h4>
                                <p className='ml-1'>
                                    Once your challenge is accepted you play the match on your Playstation 4, 5 or Xbox series.
                                </p>
                            </Col>
                            <Col lg='12'>
                                <h4 className='text-primary font-weight-bold'>
                                    What is a FUT 1vs1?
                                </h4>
                                <p className='ml-1'>
                                    Play FIFA ultimate team mode with money at stake, win get better and earn some real money.
                                </p>
                            </Col>
                            <Col lg='12'>
                                <h4 className='text-primary font-weight-bold'>
                                    What is a Real Team 1vs1?
                                </h4>
                                <p className='ml-1'>
                                    Play FIFA online friendly mode with money at stake, win get better and earn some real money
                                </p>
                                <p>
                                    <ul>
                                        <li> in this mode you can not use your ultimate team, but select a real team from the FIFA menu.</li>
                                    </ul>
                                </p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col md="6" className="d-flex justify-content-center align-items-center hide-image">
                <img src={imageUrl} className="w-100" />
            </Col>
        </>
    )
}
