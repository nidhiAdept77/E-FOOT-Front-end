import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Row, CardBody, CardHeader, CardTitle, Col } from 'reactstrap'

export default function PlatformFessCards() {
    return (
        <Col>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'  className='w-100'> 
                        <h2 className='text-primary font-weight-bold'>
                            <FormattedMessage id="Platform Fees" />
                        </h2>
                        <hr />
                    </CardTitle>
                </CardHeader> 
                <CardBody>
                    <Row>
                        <Col  lg='12'>
                            <p>
                                Our Platform fees are unique and best in the industry (10 % fees on bet amounts). €1,- will be charged for withdrawals with unlimited amount.
                            </p>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    )
}
