import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, CardBody, CardHeader, CardTitle, Col } from 'reactstrap'
import Row from 'reactstrap/lib/Row'

export default function HowToPlayCard() {
    return (
        <Col>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'  className='w-100'> 
                        <h2 className='text-primary font-weight-bold'>
                            <FormattedMessage id="How To Play" />
                        </h2>
                        <hr />
                    </CardTitle>
                </CardHeader> 
                <CardBody>
                    <Row>
                        <Col  lg='12'>
                            <p>
                                E-FOOT.NL is the platform where you can play against other players from around the world for real money. Challenge FIFA players from anywhere in the world.
                            </p>
                            <p>
                                Once your challenge is accepted you play the match on your Playstation 4, 5 or Xbox series.
                            </p>

                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    )
}
