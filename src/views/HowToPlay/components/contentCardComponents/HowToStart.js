import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Row, CardBody, CardHeader, CardTitle, Col } from 'reactstrap'
const imageUrl = require('@src/assets/images/howToPlay/how-to-start.png').default

export default function HowToStart() {
    return (
        <>
            <Col md="6" className="text-center mb-2 d-block hide-image">
                <img src={imageUrl} />
            </Col>
            <Col md="6">
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'  className='w-100'> 
                            <h2 className='text-primary font-weight-bold'>
                                <FormattedMessage id="How do I get started?" />
                            </h2>
                            <hr />
                        </CardTitle>
                    </CardHeader> 
                    <CardBody>
                        <Row>
                            <Col  lg='12'>
                                <p>
                                    The easiest and fastest way to get started is to use the 'Play Now' option in the main menu. This option allows you to choose your game and select the bet amount you want to play for.
                                </p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}
