import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Row, CardBody, CardHeader, CardTitle, Col } from 'reactstrap'
const imageUrl = require('@src/assets/images/howToPlay/game-history.png').default

export default function GameHistory() {
    return (
        <>
            <Col md="6" className="d-flex justify-content-center align-items-center hide-image">
                <img src={imageUrl} className="w-100"/>
            </Col>
            <Col md="6">
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4' className='w-100'> 
                            <h2 className='text-primary font-weight-bold'>
                                <FormattedMessage id="Game History" />
                            </h2>
                            <hr />
                        </CardTitle>
                    </CardHeader> 
                    <CardBody>
                        <Row>
                            <Col  lg='12'>
                                <h4 className='text-primary font-weight-bold'>
                                    How to view your recent bets and upcoming matches?
                                </h4>
                                <p className='ml-1'>
                                    Click on 'My Matches' to quickly view all your pending matches, upcoming matches and Ready to Play matches.
                                </p>
                                <p className='ml-1'>
                                    From there you can select 'Go to Lobby' to enter the match lobby where you can easily view details about the match like the bet amount and opponent skill level(to be created)
                                </p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}
