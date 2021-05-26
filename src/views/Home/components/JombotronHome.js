import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Col, Container, Jumbotron, Row } from 'reactstrap'

export default function JombotronHome() {
    return (
        <Row className="mb-2">
            <Col className="jumbotron-container home-page-container">
                <Jumbotron fluid className="jumbotron-div homepage-jumbotron">
                    <div className="jumbotron-overlay position-absolute"></div>
                    <Container fluid className="jumbotron-button position-relative">
                        <Button.Ripple color='gradient-success'>Play Now</Button.Ripple>
                    </Container>
                </Jumbotron>
            </Col>
        </Row>
    )
}
