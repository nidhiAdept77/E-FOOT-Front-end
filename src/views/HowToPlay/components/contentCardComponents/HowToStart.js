import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Row, CardBody, CardHeader, CardTitle, Col } from 'reactstrap'

export default function HowToStart() {
    return (
        <Col>
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
    )
}
