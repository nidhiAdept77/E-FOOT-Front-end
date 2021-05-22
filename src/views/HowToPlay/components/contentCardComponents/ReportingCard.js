import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Row, CardBody, CardHeader, CardTitle, Col } from 'reactstrap'
const imageUrl = require('@src/assets/images/howToPlay/result.png').default

export default function ReportingCard() {
    return (
        <>
            <Col sm="6">
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'  className='w-100'> 
                            <h2 className='text-primary font-weight-bold'>
                                <FormattedMessage id="Reporting Result" />
                            </h2>
                            <hr />
                        </CardTitle>
                    </CardHeader> 
                    <CardBody>
                        <Row>
                            <Col  lg='12'>
                                <p>
                                    Once the match between you and your opponent is complete click "Submit Score" to let verify your score. If your score meets the score of your opponent, the money is transferred directly to the winner's account.
                                </p>
                                <p>
                                    On the other hand, if both players input different results a dispute will be created and you will need to send video or photo evidence of your win by email to help@e-foot.nl
                                </p>
                                <p>
                                    Remember, it is vital that you be honest when reporting results as lying and cheating the system can put your account in danger of being banned or permanently terminated depending on the degree and consistency of the offenses.
                                </p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="6" className="d-flex justify-content-center align-items-center ">
                <img src={imageUrl} className="w-100"/>
            </Col>
        </>
    )
}
