import React from 'react'
import { Row, Col, Jumbotron, Container  } from 'reactstrap'
import { FormattedMessage } from 'react-intl'

export default function JombotronHowtoPlay() {
    return (
        <Row>
            <Col className="how-top-play-card">
                <Jumbotron fluid className="how-to-play-Jumbotron">
                    <Container fluid className="jumbotron-text">
                        <h1 className="display-3"><FormattedMessage id="How To Play" /></h1>
                        <p className="lead"><FormattedMessage id="Play as a Pro not as noob." /></p>
                    </Container>
                </Jumbotron>
            </Col>
        </Row>
    )
}
